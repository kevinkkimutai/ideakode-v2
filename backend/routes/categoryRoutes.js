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
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

module.exports = router;
