// services/pdfService.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PdfService {
  async generateInvoicePdf(invoiceData) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const buffers = [];
        
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);

        // Add header
        this._addHeader(doc, invoiceData);
        
        // Add customer info
        this._addCustomerInfo(doc, invoiceData);
        
        // Add invoice details
        this._addInvoiceDetails(doc, invoiceData);
        
        // Add items table
        this._addItemsTable(doc, invoiceData);
        
        // Add totals
        this._addTotals(doc, invoiceData);
        
        // Add footer
        this._addFooter(doc, invoiceData);

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  _addHeader(doc, invoice) {
    doc
      .image(path.join(__dirname, '../assets/logo.png'), 50, 45, { width: 50 })
      .fillColor('#444444')
      .fontSize(20)
      .text('INVOICE', 200, 50, { align: 'right' })
      .fontSize(10)
      .text(`Invoice #: ${invoice.invoice_number}`, 200, 70, { align: 'right' })
      .text(`Issued: ${new Date(invoice.issue_date).toLocaleDateString()}`, 200, 85, { align: 'right' })
      .text(`Due: ${new Date(invoice.due_date).toLocaleDateString()}`, 200, 100, { align: 'right' })
      .moveDown();
  }

  _addCustomerInfo(doc, invoice) {
    const customer = invoice.Customer;
    const billingAddress = invoice.Address || {};

    doc
      .fillColor('#444444')
      .fontSize(20)
      .text(customer.company_name, 50, 130)
      .fontSize(10)
      .text(billingAddress.street, 50, 160)
      .text(`${billingAddress.city}, ${billingAddress.state} ${billingAddress.postal_code}`, 50, 175)
      .text(billingAddress.country, 50, 190)
      .moveDown();
  }

  _addInvoiceDetails(doc, invoice) {
    doc
      .fontSize(10)
      .text(`Payment Terms: ${invoice.payment_terms || 'Net 30'}`, 50, 220)
      .text(`Status: ${invoice.status.toUpperCase()}`, 50, 235)
      .moveDown();
  }

  _addItemsTable(doc, invoice) {
    const table = {
      headers: ['Description', 'Qty', 'Unit Price', 'Discount', 'Tax', 'Total'],
      rows: invoice.InvoiceItems.map(item => [
        item.description || item.Product.name,
        item.quantity,
        `$${item.unit_price.toFixed(2)}`,
        item.discount ? `$${item.discount.toFixed(2)}` : '-',
        item.tax_rate ? `${item.tax_rate}%` : '-',
        `$${item.total_price.toFixed(2)}`
      ])
    };

    doc.moveDown().table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold'),
      prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
      padding: 5,
      columnSpacing: 5,
      divider: {
        header: { disabled: false, width: 1, color: '#ccc' },
        horizontal: { disabled: false, width: 1, color: '#eee' }
      },
      columnsSize: [200, 50, 80, 80, 50, 80]
    });
  }

  _addTotals(doc, invoice) {
    doc
      .moveDown()
      .fontSize(10)
      .text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, 400, doc.y, { align: 'right' })
      .text(`Discount: $${invoice.discount.toFixed(2)}`, 400, doc.y + 15, { align: 'right' })
      .text(`Tax: $${invoice.tax.toFixed(2)}`, 400, doc.y + 30, { align: 'right' })
      .font('Helvetica-Bold')
      .text(`Total: $${invoice.total.toFixed(2)}`, 400, doc.y + 50, { align: 'right' })
      .font('Helvetica');
  }

  _addFooter(doc, invoice) {
    doc
      .fontSize(8)
      .text(invoice.notes || 'Thank you for your business!', 50, 700, {
        align: 'center',
        width: 500
      });
  }
}

module.exports = new PdfService();