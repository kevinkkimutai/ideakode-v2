const express = require('express');
const { createProjectTask, getAllProjectTasks, getProjectTaskById, updateProjectTask, deleteProjectTask, getMyProjectTasks, assignUsersToTask } = require('../controllers/ProjectTaskController');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');

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

module.exports = router;
