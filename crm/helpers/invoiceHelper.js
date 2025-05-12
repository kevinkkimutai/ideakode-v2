
const { Op } = require('sequelize');
const { Invoice } = require('../models');
const moment = require('moment');

async function generateInvoiceNumber() {
  const prefix = 'NTQ-' + moment().format('YYYYMMDD') + '-';
  const lastInvoice = await Invoice.findOne({
    where: {
      invoice_number: {
        [Op.like]: `${prefix}%`
      }
    },
    order: [['invoice_number', 'DESC']]
  });

  let sequence = 1;
  if (lastInvoice) {
    const lastSequence = parseInt(lastInvoice.invoice_number.split('-').pop());
    if (!isNaN(lastSequence)) {
      sequence = lastSequence + 1;
    }
  }

  return prefix + sequence.toString().padStart(4, '0');
}

module.exports = {
  generateInvoiceNumber
};