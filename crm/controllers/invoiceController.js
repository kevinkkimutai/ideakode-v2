const { 
    Invoice, 
    InvoiceItem, 
    Customer, 
    User, 
    Transaction, 
    Quote, 
    Product, 
    InvoicePayment, 
    QuoteItem ,
    Contact,
    Address
  } = require('../models');
  const { generateInvoiceNumber } = require('../helpers/invoiceHelper');
const { sendInvoiceEmail } = require('../middleware/sendInvoiceEmail');
const pdfServices = require('../services/pdfServices');

const createInvoice = async (req, res) => {
  try {
    // First check if we have a customerId either directly or from a quote
    let customerId = req.body.customerId;
    let issue_date = new Date();
    let quote = null;
    
    // If we have a quoteId, fetch the quote and use its customerId
    if (req.body.quoteId) {
      quote = await Quote.findByPk(req.body.quoteId, {
        include: [{ model: QuoteItem }]
      });
      
      if (!quote) return res.status(404).send({ error: 'Quote not found 🥶' });
      
      // Use quote's customerId if we don't have one provided directly
      if (!customerId) {
        customerId = quote.customerId;
      }
    }
    
    // Ensure we have a customerId at this point
    if (!customerId) {
      return res.status(400).send({ error: 'Customer ID is required 🥶' });
    }
    
    // Validate that the customer exists
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).send({ error: 'Customer not found 🥶' });
    }
    
    // Now create the invoice with validated data
    const invoiceData = {
      ...req.body,
      customerId: customerId,
      issue_date: issue_date,
      quoteId: quote ? quote.id : req.body.quoteId,
      invoice_number: await generateInvoiceNumber(),
      issued_by: req.user.id,
      status: 'draft'
    };

    const invoice = await Invoice.create(invoiceData);
  
    // Handle copying items from quote if needed
    if (req.body.quoteId && req.body.copy_items && quote) {
      const quoteItems = await QuoteItem.findAll({
        where: { quoteId: req.body.quoteId }
      });
  
      const invoiceItems = quoteItems.map(item => ({
        invoiceId: invoice.id,
        productId: item.productId,
        quantity: item.quantity,
        unit_price: item.unit_price,
        discount: item.discount,
        tax_rate: item.tax_rate || 0,
        total_price: item.total_price
      }));
  
      await InvoiceItem.bulkCreate(invoiceItems);
  
      // Update the invoice with quote totals
      await Invoice.update(
        {
          subtotal: quote.subtotal,
          tax: quote.tax,
          discount: quote.discount,
          total: quote.total
        },
        {
          where: { id: invoice.id }
        }
      );
    }
  
    const fullInvoice = await Invoice.findByPk(invoice.id, {
      include: [
        { model: Customer, include: [{ model: Contact }] },
        { model: User, attributes: ['id', 'first_name', 'last_name', 'email'], as: 'Issuer' },
        { model: InvoiceItem, include: [{ model: Product }] },
        { model: Quote }
      ]
    });
  
    res.status(201).json({
      success: true,
      invoice: fullInvoice
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(400).json({ error: 'Error creating invoice', message: error.message });
  }
};
  
  const getAll = async (req, res) => {
    try {
      const { page = 1, limit = 10, status, customer_id } = req.query;
      const offset = (page - 1) * limit;
      const where = {};
      if (status) where.status = status;
      if (customer_id) where.customer_id = customer_id;
  
      const invoices = await Invoice.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset,
        include: [
          { model: Customer, include: [{ model: Contact }] },
          { model: User, attributes: ['id', 'first_name', 'last_name', 'email'], as: 'Issuer' },
          { model: InvoiceItem, include: [{ model: Product }] },
          { model: Quote },
          { model: Transaction }
        ],
        order: [['issue_date', 'DESC']]
      });
  
      res.send({
        invoices: invoices.rows,
        total: invoices.count,
        totalPages: Math.ceil(invoices.count / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      res.status(500).send({ error: 'Error fetching invoices' });
    }
  };
  
  const getById = async (req, res) => {
    try {
      const invoice = await Invoice.findByPk(req.params.id, {
        include: [
          { model: Customer, include: [{ model: Contact }] },
          { model: User, attributes: ['id', 'first_name', 'last_name', 'email'], as: 'Issuer' },
          { model: InvoiceItem, include: [{ model: Product }] },
          { model: Quote },
          { model: Transaction }
        ]
      });
  
      if (!invoice) return res.status(404).send({ error: 'Invoice not found' });
  
      res.send(invoice);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching invoice' });
    }
  };
  
  const updateStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const invoice = await Invoice.findByPk(req.params.id);
  
      if (!invoice) return res.status(404).send({ error: 'Invoice not found' });
  
      await invoice.update({ status });
      res.send({ message: 'Invoice status updated successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Error updating invoice status' });
    }
  };
  
  const sendInvoice = async (req, res) => {
    try {
      const invoice = await Invoice.findByPk(req.params.id, {
        include: [{ model: Customer }]
      });
  
      if (!invoice) return res.status(404).send({ error: 'Invoice not found' });
  
      await invoice.update({ status: 'sent', sent_at: new Date() });
  
      res.send({ message: 'Invoice sent successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Error sending invoice' });
    }
  };
  
  const addPayment = async (req, res) => {
    try {
      const { amount, payment_method, transaction_date, reference, notes } = req.body;
      const invoice = await Invoice.findByPk(req.params.id);
      if (!invoice) return res.status(404).send({ error: 'Invoice not found' });
  
      const transaction = await Transaction.create({
        amount,
        payment_method,
        transaction_date: transaction_date || new Date(),
        reference,
        notes,
        status: 'completed',
        recorded_by: req.user.id,
        invoice_id: invoice.id
      });
  
      await InvoicePayment.create({
        invoice_id: invoice.id,
        transaction_id: transaction.id,
        amount,
        payment_date: transaction_date || new Date(),
        payment_method,
        notes,
        recorded_by: req.user.id
      });
  
      const payments = await InvoicePayment.sum('amount', { where: { invoice_id: invoice.id } });
      if (payments >= invoice.total) await invoice.update({ status: 'paid' });
  
      res.status(201).send(transaction);
    } catch (error) {
      res.status(500).send({ error: 'Error recording payment' });
    }
  };
  
  const getInvoicePayments = async (req, res) => {
    try {
      const payments = await InvoicePayment.findAll({
        where: { invoice_id: req.params.id },
        include: [
          { model: Transaction },
          { model: User, attributes: ['id', 'first_name', 'last_name', 'email'], }
        ]
      });
  
      res.send(payments);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching invoice payments' });
    }
  };

 const generatePdf = async (req, res) => {
    try {
      const invoice = await Invoice.findByPk(req.params.id, {
        include: [
          { model: Customer, include: [
            {
              model: Contact,
              where: { is_primary: true },
              required: false
            },
            {
              model: Address,
              where: { address_type: 'billing' },
              required: false
            }
          ] },
          { model: InvoiceItem, include: [{ model: Product }] },
          { model: User, attributes: ['id', 'first_name', 'last_name', 'email'], as: 'Issuer' }
        ]
      });

      if (!invoice) {
        return res.status(404).send({ error: 'Invoice not found' });
      }

      const pdfBuffer = await pdfServices.generateInvoicePdf(invoice);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=invoice_${invoice.invoice_number}.pdf`
      });

      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).send({
        error: 'Error generating PDF invoice'
      });
    }
  }

  const sendInvoiceWithPdf = async (req, res) => {
    try {
      const invoice = await Invoice.findByPk(req.params.id, {
        include: [
          { model: Customer, include: [
            { model: Contact }, 
            {model: Address, where: { is_primary: true }},] },
          { model: User, attributes: ['id', 'first_name', 'last_name', 'email'], as: 'Issuer' },
          { model: InvoiceItem, include: [{ model: Product }] },
          { model: Quote },
          { model: Transaction }
        ],
      });

      console.log("invoice", invoice);
      
      
      if (!invoice) {
        return res.status(404).send({ error: 'Invoice not found' });
      }
      
      const primaryContact = invoice.Customer?.Contacts?.find(c => c.is_primary);
      const to_addresses = primaryContact?.email;
      
      if (!to_addresses) {
        return res.status(400).send({ error: 'No primary contact email found for this customer.' });
      }
      
      const subject = `Invoice ${invoice.invoice_number} from Netiqa`;
      const body = `Please find attached invoice ${invoice.invoice_number}. Thank you for your business.`;
      
      // Generate PDF using HTML template
      const pdfBuffer = await pdfServices.generateInvoicePdf(invoice);
      
      await sendInvoiceEmail({
        to: to_addresses,
        subject,
        body,
        pdfBuffer,
        invoiceNumber: invoice.invoice_number
      });
      
      await invoice.update({
        status: 'sent',
        sent_at: new Date()
      });
      
      res.send({
        message: 'Invoice sent with PDF attachment',
        pdf: pdfBuffer.toString('base64'),
        invoice: invoice
      });
    } catch (error) {
      console.error('Error sending invoice:', error);
      res.status(500).send({
        error: 'Error sending invoice with PDF'
      });
    }
  };
  
 
  
  module.exports = {
    createInvoice,
    getAll,
    getById,
    updateStatus,
    sendInvoice,
    addPayment,
    getInvoicePayments,
    generatePdf,
    sendInvoiceWithPdf
  };
  