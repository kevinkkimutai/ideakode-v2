// services/paymentService.js
const MpesaService = require('./mpesaService');

class PaymentService {

  _mpesaProcessor = {
    async createIntent(invoice, metadata) {
      // For M-Pesa, we don't create a traditional payment intent
      // Instead we return the parameters needed to initiate payment
      return {
        paymentMethod: 'mpesa',
        invoiceId: invoice.id,
        amount: invoice.total,
        currency: 'KES',
        requiresPhoneNumber: true
      };
    },

    async process(invoice, paymentData) {
      try {
        // Initiate STK Push
        const result = await MpesaService.initiateSTKPush(
          paymentData.phoneNumber,
          paymentData.amount,
          invoice.id,
          `Payment for invoice ${invoice.invoice_number}`
        );

        if (!result.success) {
          throw new Error(result.error);
        }

        return {
          success: true,
          requiresUserAction: true,
          customerMessage: result.customerMessage,
          checkoutRequestID: result.checkoutRequestID,
          status: 'pending', // Will be confirmed via callback
          rawResponse: result.rawResponse
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          rawResponse: error.rawResponse
        };
      }
    }
  };
}