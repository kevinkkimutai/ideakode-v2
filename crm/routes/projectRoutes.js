const express = require('express');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/ProjectController');
const router = express.Router();


// Create Project
router.post('/project', createProject);

// Get All Projects
router.get('/projects', getAllProjects);

// Get Project by ID
router.get('/project/:id', getProjectById);

// Update Project
router.put('/project/:id', updateProject);

// Delete Project
router.delete('/project/:id', deleteProject);

module.exports = router;
