const { InvoiceItem, Invoice, Product } = require('../models'); // Import the necessary models

// Create a new invoice item
const createInvoiceItem = async (req, res) => {
  try {
    const { invoiceId, productId, description, quantity, unit_price, discount, tax_rate, total_price } = req.body;

    // Check if the associated Invoice and Product exist
    const invoice = await Invoice.findByPk(invoiceId);
    const product = await Product.findByPk(productId);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const invoiceItem = await InvoiceItem.create({
      invoiceId,
      productId,
      description,
      quantity,
      unit_price,
      discount,
      tax_rate,
      total_price,
    });

    return res.status(201).json({ message: 'Invoice item created successfully', invoiceItem });
  } catch (error) {
    console.error('Error creating invoice item:', error);
    return res.status(500).json({ message: 'Error creating invoice item', error: error.message });
  }
};

// Get all invoice items
const getInvoiceItems = async (req, res) => {
  try {
    const invoiceItems = await InvoiceItem.findAll();
    return res.status(200).json(invoiceItems);
  } catch (error) {
    console.error('Error fetching invoice items:', error);
    return res.status(500).json({ message: 'Error fetching invoice items', error: error.message });
  }
};

// Get an invoice item by ID
const getInvoiceItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoiceItem = await InvoiceItem.findByPk(id);

    if (!invoiceItem) {
      return res.status(404).json({ message: 'Invoice item not found' });
    }

    return res.status(200).json(invoiceItem);
  } catch (error) {
    console.error('Error fetching invoice item:', error);
    return res.status(500).json({ message: 'Error fetching invoice item', error: error.message });
  }
};

// Update an invoice item
const updateInvoiceItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { invoiceId, productId, description, quantity, unit_price, discount, tax_rate, total_price } = req.body;

    const invoiceItem = await InvoiceItem.findByPk(id);

    if (!invoiceItem) {
      return res.status(404).json({ message: 'Invoice item not found' });
    }

    // Check if the associated Invoice and Product exist
    const invoice = await Invoice.findByPk(invoiceId);
    const product = await Product.findByPk(productId);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update invoice item
    invoiceItem.invoiceId = invoiceId;
    invoiceItem.productId = productId;
    invoiceItem.description = description;
    invoiceItem.quantity = quantity;
    invoiceItem.unit_price = unit_price;
    invoiceItem.discount = discount;
    invoiceItem.tax_rate = tax_rate;
    invoiceItem.total_price = total_price;

    await invoiceItem.save();

    return res.status(200).json({ message: 'Invoice item updated successfully', invoiceItem });
  } catch (error) {
    console.error('Error updating invoice item:', error);
    return res.status(500).json({ message: 'Error updating invoice item', error: error.message });
  }
};

// Delete an invoice item
const deleteInvoiceItem = async (req, res) => {
  try {
    const { id } = req.params;
    const invoiceItem = await InvoiceItem.findByPk(id);

    if (!invoiceItem) {
      return res.status(404).json({ message: 'Invoice item not found' });
    }

    await invoiceItem.destroy();
    return res.status(200).json({ message: 'Invoice item deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice item:', error);
    return res.status(500).json({ message: 'Error deleting invoice item', error: error.message });
  }
};

module.exports = {
  createInvoiceItem,
  getInvoiceItems,
  getInvoiceItemById,
  updateInvoiceItem,
  deleteInvoiceItem,
};
