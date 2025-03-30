const { SupportCategory } = require("../models");

const createCategory = async (req, res) => {
    try {
        const {name, description, status} = req.body;

        const category = await SupportCategory.create({
            name, 
            description, 
            status
        });
        res.status(201).json({
            message: "Support Category created successfully 🎉",
            category: category,
          });
        
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

// Get all support categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await SupportCategory.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id, name, description, status } = req.body;
        const category = await SupportCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: "Support Category not found 🥶" });
        }
        const updatedCategory = await category.update({
            name: name || category.name, 
            description: description || category.description, 
            status: status || category.status
        });
        res.status(200).json({
            message: "Support Category updated successfully 🎉",
            category: updatedCategory,
          });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const category = await SupportCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: "Support Category not found 🥶" });
        }
        const updatedCategory = await category.update({
            status: status || category.status
        });
        res.status(200).json({
            message: "Support Category status updated successfully 🎉",
            Category: updatedCategory,
          });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a support category
const deleteCategory = async (req, res) => {
    try {
      const {id} = req.body
      const category = await SupportCategory.findByPk(id);
      if (!category) return res.status(404).json({ message: 'Category not found' });
  
      await category.destroy();
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
    
module.exports = {createCategory, getAllCategories, updateCategory, updateStatus, deleteCategory}