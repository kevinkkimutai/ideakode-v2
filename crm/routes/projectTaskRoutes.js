const express = require('express');
const { createProjectTask, getAllProjectTasks, getProjectTaskById, updateProjectTask, deleteProjectTask } = require('../controllers/ProjectTaskController');
const router = express.Router();


// Create Project Task
router.post('/project-tasks', createProjectTask);

// Get All Project Tasks
router.get('/project-tasks', getAllProjectTasks);

// Get Project Task by ID
router.get('/project-tasks/:id', getProjectTaskById);

// Update Project Task
router.put('/project-tasks/:id', updateProjectTask);

// Delete Project Task
router.delete('/project-tasks/:id', deleteProjectTask);

module.exports = router;
