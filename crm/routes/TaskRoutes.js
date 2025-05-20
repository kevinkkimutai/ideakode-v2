const express = require('express');
const { createProductTask, getAllProductTasks, getProductTaskById, updateProductTask, deleteProductTask, getMyProductTasks, assignUsersToProductTask } = require('../controllers/ProductTaskController');
const {auth, authorizeRole} = require('../middleware/auth');
const { createProjectTask, getAllProjectTasks, getProjectTaskById, updateProjectTask, deleteProjectTask, getMyProjectTasks, assignUsersToTask } = require('../controllers/ProjectTaskController');
const router = express.Router();


// Create Project Task
router.post('/project-task', auth, createProjectTask);

// Get All Project Tasks
router.get('/project-tasks', getAllProjectTasks);
router.put('/assign-task/:taskId', auth, assignUsersToTask);

// Get Project Task by ID
router.get('/project-task/:id', getProjectTaskById);
router.get('/my-tasks', auth, getMyProjectTasks);


// Update Project Task
router.put('/project-task/:id', auth, updateProjectTask);

// Delete Project Task
router.delete('/project-task/:id', auth, deleteProjectTask);


// Create Product Task
router.post('/product-task', auth, createProductTask);

// Get All Product Tasks
router.get('/product-tasks', getAllProductTasks);
router.put('/assign-task/:taskId', auth, assignUsersToProductTask);

// Get Product Task by ID
router.get('/product-task/:id', getProductTaskById);
router.get('/my-tasks', auth, getMyProductTasks);


// Update Product Task
router.put('/product-task/:id', auth, updateProductTask);

// Delete Product Task
router.delete('/product-task/:id', auth, deleteProductTask);



module.exports = router;
