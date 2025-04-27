const { 
    Invoice, 
    InvoiceItem, 
    Customer, 
    User, 
    Transaction, 
    Quote, 
    Product, 
    InvoicePayment, 
    QuoteItem 
  } = require('../models');
  const { generateInvoiceNumber } = require('../helpers/invoiceHelper');
  
  const createInvoice = async (req, res) => {
    try {
      const invoiceData = {
        ...req.body,
        invoice_number: await generateInvoiceNumber(),
        issued_by: req.user.id,
        status: 'draft'
      };
  
      if (req.body.quote_id) {
        const quote = await Quote.findByPk(req.body.quote_id, {
          include: [{ model: QuoteItem }]
        });
  
        if (!quote) return res.status(404).send({ error: 'Quote not found 🥶' });
  
        invoiceData.customer_id = quote.customer_id;
      }
  
      const invoice = await Invoice.create(invoiceData);
  
      if (req.body.quote_id && req.body.copy_items) {
        const quoteItems = await QuoteItem.findAll({ where: { quote_id: req.body.quote_id } });
        const invoiceItems = quoteItems.map(item => ({
          invoice_id: invoice.id,
          product_id: item.product_id,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          discount: item.discount,
          tax_rate: item.tax_rate || 0,
          total_price: item.total_price
        }));
        await InvoiceItem.bulkCreate(invoiceItems);
        await invoice.update({
          subtotal: quote.subtotal,
          tax: quote.tax,
          discount: quote.discount,
          total: quote.total
        });
      }
  
      const fullInvoice = await Invoice.findByPk(invoice.id, {
        include: [
          { model: Customer },
          { model: User, as: 'Issuer' },
          { model: InvoiceItem },
          { model: Quote }
        ]
      });
  
      res.status(201).send(fullInvoice);
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: 'Error creating invoice' });
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
          { model: Customer },
          { model: User, as: 'Issuer' }
        ],
        order: [['issue_date', 'DESC']]
      });
  
      res.send({
        data: invoices.rows,
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
          { model: Customer },
          { model: User, as: 'Issuer' },
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
          { model: User, attributes: ['id', 'first_name', 'last_name'] }
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
          { model: Customer },
          { model: Address, where: { address_type: 'billing' }, required: false },
          { model: InvoiceItem, include: [{ model: Product }] },
          { model: User, as: 'Issuer' }
        ]
      });

      if (!invoice) {
        return res.status(404).send({ error: 'Invoice not found' });
      }

      const pdfBuffer = await PdfService.generateInvoicePdf(invoice);

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
          { model: Customer, include: [{ model: Contact, where: { is_primary: true }, required: false }] },
          { model: Address, where: { address_type: 'billing' }, required: false },
          { model: InvoiceItem, include: [{ model: Product }] },
          { model: User, as: 'Issuer' }
        ]
      });

      if (!invoice) {
        return res.status(404).send({ error: 'Invoice not found' });
      }

      // Generate PDF
      const pdfBuffer = await PdfService.generateInvoicePdf(invoice);
      
      // TODO: Implement email sending with attachment
      // await emailService.sendInvoiceEmail({
      //   to: invoice.Customer.Contact.email,
      //   subject: `Invoice #${invoice.invoice_number}`,
      //   text: `Please find attached invoice #${invoice.invoice_number}`,
      //   attachments: [{
      //     filename: `invoice_${invoice.invoice_number}.pdf`,
      //     content: pdfBuffer
      //   }]
      // });

      await invoice.update({ 
        status: 'sent',
        sent_at: new Date() 
      });

      res.send({ 
        message: 'Invoice sent with PDF attachment',
        pdf: pdfBuffer.toString('base64') // For testing, remove in production
      });
    } catch (error) {
      res.status(500).send({
        error: 'Error sending invoice with PDF'
      });
    }
  }
  
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
  