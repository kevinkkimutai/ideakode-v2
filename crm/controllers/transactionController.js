const { Transaction, Invoice, Customer, User, InvoicePayment } = require('../models');
const { Op } = require('sequelize');

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, start_date, end_date, payment_method } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (start_date && end_date) {
      where.transaction_date = {
        [Op.between]: [new Date(start_date), new Date(end_date)]
      };
    }
    if (payment_method) where.payment_method = payment_method;

    const transactions = await Transaction.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      include: [
        { model: Invoice, include: [{ model: Customer }] },
        { model: User, attributes: ['id', 'first_name', 'last_name'] }
      ],
      order: [['transaction_date', 'DESC']]
    });

    res.send({
      data: transactions.rows,
      total: transactions.count,
      totalPages: Math.ceil(transactions.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).send({ error: 'Error fetching transactions' });
  }
};

const getById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [
        { model: Invoice, include: [{ model: Customer }] },
        { model: User, attributes: ['id', 'first_name', 'last_name'] }
      ]
    });

    if (!transaction) {
      return res.status(404).send({ error: 'Transaction not found' });
    }

    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching transaction' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).send({ error: 'Transaction not found' });
    }

    await transaction.update({ status });

    if (status === 'refunded') {
      const invoice = await Invoice.findByPk(transaction.invoice_id);
      if (invoice) {
        const payments = await InvoicePayment.sum('amount', {
          where: { invoice_id: invoice.id }
        });

        if (payments < invoice.total) {
          await invoice.update({ status: 'partially_refunded' });
        }
      }
    }

    res.send({ message: 'Transaction status updated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error updating transaction status' });
  }
};

module.exports = {
  getAll,
  getById,
  updateStatus
};
