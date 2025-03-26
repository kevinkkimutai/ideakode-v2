const express = require('express');
const {
  createCategory,
  getAllCategories,
  updateCategory,
  updateStatus,
  deleteCategory,
} = require('../controllers/supportCategoryController');

const router = express.Router();

router.post('/support-category', createCategory);
router.get('/support-categories', getAllCategories);
router.put('/support-category/:id', updateCategory);
router.patch('/support-category/:id/status', updateStatus);
router.delete('/support-category/:id', deleteCategory);

module.exports = router;
