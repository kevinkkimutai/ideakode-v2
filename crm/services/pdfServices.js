// services/pdfService.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Create a PDF service object to contain all methods
const pdfService = {
  generateInvoicePdf: async function(invoiceData) {
    try {
      // Format data for the template
      const templateData = this._prepareTemplateData(invoiceData);
      
      // Compile HTML template
      const html = await this._compileTemplate(templateData);
      
      // Generate PDF from HTML
      const pdfBuffer = await this._generatePdf(html);
      
      return pdfBuffer;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  },

  _prepareTemplateData: function(invoice) {
    // Format customer information
    const customerContact = invoice.Customer?.Contacts?.find(contact => contact.is_primary) || invoice.Customer?.Contacts?.[0];
    const customerName = customerContact ? `${customerContact.first_name} ${customerContact.last_name}` : (invoice.Customer?.company_name);
    
    // Find primary or first billing address from the Addresses array
    const customerAddressObj = invoice.Customer?.Addresses?.find(addr => addr.is_primary) || invoice.Customer?.Addresses?.[0];
    
    // Extract address fields from the found address object
    const customerAddress = customerAddressObj?.street || '123 Anywhere St.';
    const customerCity = customerAddressObj?.city || 'Any City';
    const customerState = customerAddressObj?.state || 'ST';
    const customerZip = customerAddressObj?.postal_code || '12345';
    const customerCountry = customerAddressObj?.country || '';
    
    // Format invoice items
    const items = invoice.InvoiceItems?.map((item, index) => ({
      id: index + 1,
      description: item.Product?.name || 'Service',
      rate: this._formatCurrency(parseFloat(item.unit_price) || 0),
      amount: this._formatCurrency((parseFloat(item.unit_price) || 0) * (parseFloat(item.quantity) || 1))
    })) || [{ id: 1, description: 'Preliminary Design Services', rate: this._formatCurrency(5000), amount: this._formatCurrency(5000) }];
    
    // Calculate totals
    const subtotal = parseFloat(invoice.subtotal) || this._calculateSubtotal(invoice.InvoiceItems || []);
    const tax = parseFloat(invoice.tax) || this._calculateTax(subtotal, parseFloat(invoice.tax_rate) || 0.06);
    const total = parseFloat(invoice.total) || (subtotal + tax);
    
    // Check if logo exists
    const logoPath = path.join(__dirname, '../assets/logo.png');
    const logoExists = fs.existsSync(logoPath);
    
    // Return formatted data
    return {
      invoice_number: invoice.invoice_number || 'INV-01234',
      issue_date: this._formatDate(invoice.issue_date || new Date()),
      due_date: this._formatDate(invoice.due_date || new Date()),
      customer_name: customerName,
      customer_address: customerAddress,
      customer_city: customerCity,
      customer_state: customerState,
      customer_zip: customerZip,
      customer_country: customerCountry,
      items: items,
      subtotal: this._formatCurrency(subtotal),
      tax: this._formatCurrency(tax),
      discount: this._formatCurrency(parseFloat(invoice.discount) || 0),
      total: this._formatCurrency(total),
      notes: invoice.notes || '',
      terms: invoice.terms || '',
      logoExists: logoExists,
      logoPath: logoExists ? logoPath : null,
      issuer_name: invoice.Issuer ? `${invoice.Issuer.first_name} ${invoice.Issuer.last_name}` : ''
    };
  },

  _formatCurrency: function(amount) {
    return amount.toLocaleString();
  },

  _formatDate: function(date) {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  },

  _calculateSubtotal: function(items) {
    return items.reduce((sum, item) => sum + ((item.unit_price || 0) * (item.quantity || 1)), 0);
  },

  _calculateTax: function(subtotal, taxRate) {
    return subtotal * taxRate;
  },

  _compileTemplate: async function(data) {
    // Read template file
    const templatePath = path.join(__dirname, '../templates/invoice.html');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    
    // Compile template with Handlebars
    const template = Handlebars.compile(templateSource);
    
    // Render template with data
    return template(data);
  },

  _generatePdf: async function(html) {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      
      // Set content to the HTML
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'A5',
        printBackground: true,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0'
        }
      });
      
      return pdfBuffer;
    } finally {
      await browser.close();
    }
  }
};

module.exports = {
  generateInvoicePdf: pdfService.generateInvoicePdf.bind(pdfService)
};