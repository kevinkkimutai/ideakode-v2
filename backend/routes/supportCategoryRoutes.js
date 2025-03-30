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
router.put('/support-category', updateCategory);
router.patch('/support-category/:id/status', updateStatus);
router.delete('/support-category', deleteCategory);

module.exports = router;
