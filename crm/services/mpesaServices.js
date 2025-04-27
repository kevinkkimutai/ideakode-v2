// services/mpesaService.js
const axios = require('axios');
const crypto = require('crypto');
const { Transaction, Invoice } = require('../models');

class MpesaService {
  constructor() {
    this.authToken = null;
    this.tokenExpiry = null;
    this.config = {
      consumerKey: process.env.MPESA_CONSUMER_KEY,
      consumerSecret: process.env.MPESA_CONSUMER_SECRET,
      environment: process.env.MPESA_ENVIRONMENT || 'sandbox', // sandbox or production
      shortCode: process.env.MPESA_SHORTCODE,
      initiatorName: process.env.MPESA_INITIATOR_NAME,
      lipaNaMpesaShortCode: process.env.MPESA_LNM_SHORTCODE,
      lipaNaMpesaPasskey: process.env.MPESA_LNM_PASSKEY,
      securityCredential: this._generateSecurityCredential(),
      callBackURL: `${process.env.APP_URL}/api/payments/mpesa/callback`
    };
  }

  // Generate security credential (for B2C and C2B)
  _generateSecurityCredential() {
    const initiatorPassword = process.env.MPESA_INITIATOR_PASSWORD;
    const certPath = process.env.MPESA_CERT_PATH;
    
    if (this.config.environment === 'production' && certPath) {
      const publicKey = fs.readFileSync(certPath, 'utf8');
      return crypto.publicEncrypt(publicKey, Buffer.from(initiatorPassword)).toString('base64');
    }
    
    // For sandbox, use plain password (not secure for production)
    return Buffer.from(initiatorPassword).toString('base64');
  }

  // Authenticate with M-Pesa API
  async _authenticate() {
    if (this.authToken && new Date() < this.tokenExpiry) {
      return this.authToken;
    }

    const auth = Buffer.from(`${this.config.consumerKey}:${this.config.consumerSecret}`).toString('base64');
    const url = this.config.environment === 'production' 
      ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
      : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Basic ${auth}`
        }
      });

      this.authToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + (response.data.expires_in * 1000));
      return this.authToken;
    } catch (error) {
      console.error('M-Pesa authentication error:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with M-Pesa');
    }
  }

  // Generate timestamp in required format
  _generateTimestamp() {
    const now = new Date();
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0')
    ].join('');
  }

  // Generate password for Lipa Na M-Pesa Online (STK Push)
  _generateLipaNaMpesaPassword() {
    const timestamp = this._generateTimestamp();
    const passkey = this.config.lipaNaMpesaPasskey;
    const shortCode = this.config.lipaNaMpesaShortCode;
    
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');
    return { password, timestamp };
  }

  // Initiate STK Push (Lipa Na M-Pesa Online)
  async initiateSTKPush(phoneNumber, amount, invoiceId, description = 'Invoice Payment') {
    try {
      const token = await this._authenticate();
      const { password, timestamp } = this._generateLipaNaMpesaPassword();
      
      // Format phone number (2547...)
      const formattedPhone = phoneNumber.startsWith('0') 
        ? `254${phoneNumber.substring(1)}` 
        : phoneNumber.startsWith('+') 
          ? phoneNumber.substring(1) 
          : phoneNumber;

      const payload = {
        BusinessShortCode: this.config.lipaNaMpesaShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: this.config.lipaNaMpesaShortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: this.config.callBackURL,
        AccountReference: `INV${invoiceId}`,
        TransactionDesc: description
      };

      const url = this.config.environment === 'production'
        ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        checkoutRequestID: response.data.CheckoutRequestID,
        merchantRequestID: response.data.MerchantRequestID,
        customerMessage: response.data.CustomerMessage,
        rawResponse: response.data
      };
    } catch (error) {
      console.error('M-Pesa STK Push error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.errorMessage || 'Failed to initiate M-Pesa payment',
        rawResponse: error.response?.data
      };
    }
  }

  // Handle M-Pesa callback (for payment confirmation)
  async handleCallback(data) {
    try {
      const resultCode = data.Body.stkCallback.ResultCode;
      const resultDesc = data.Body.stkCallback.ResultDesc;
      const callbackMetadata = data.Body.stkCallback.CallbackMetadata;
      const checkoutRequestID = data.Body.stkCallback.CheckoutRequestID;

      if (resultCode !== '0') {
        throw new Error(`M-Pesa payment failed: ${resultDesc}`);
      }

      // Extract payment details from callback
      const items = callbackMetadata.Item.reduce((acc, item) => {
        acc[item.Name] = item.Value;
        return acc;
      }, {});

      // Extract invoice ID from account reference
      const invoiceId = parseInt(items.AccountReference.replace('INV', ''));

      // Record transaction
      const transaction = await Transaction.create({
        invoice_id: invoiceId,
        amount: items.Amount,
        payment_method: 'mpesa',
        transaction_date: new Date(),
        reference: items.MpesaReceiptNumber,
        status: 'completed',
        gateway_response: data,
        recorded_by: 0 // System user
      });

      // Update invoice status if fully paid
      const invoice = await Invoice.findByPk(invoiceId);
      if (invoice) {
        const payments = await Transaction.sum('amount', { 
          where: { invoice_id: invoiceId } 
        });
        
        if (payments >= invoice.total) {
          await invoice.update({ status: 'paid' });
        }
      }

      return { success: true, transaction };
    } catch (error) {
      console.error('M-Pesa callback processing error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new MpesaService();