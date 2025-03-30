const express = require('express');
const router = express.Router();
const{
createCategory,
getCategories,
getCategoryById,
updateCategory,
deleteCategory
} = require('../controllers/categoryController');

router.post('/category', createCategory);
router.get('/categories', getCategories);
router.get('/category/:id', getCategoryById);
router.put('/category', updateCategory);
router.delete('/category', deleteCategory);

module.exports = router;
