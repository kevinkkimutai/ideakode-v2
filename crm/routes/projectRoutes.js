const express = require('express');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/ProjectController');
const router = express.Router();


// Create Project
router.post('/projects', createProject);

// Get All Projects
router.get('/projects', getAllProjects);

// Get Project by ID
router.get('/projects/:id', getProjectById);

// Update Project
router.put('/projects/:id', updateProject);

// Delete Project
router.delete('/projects/:id', deleteProject);

module.exports = router;
