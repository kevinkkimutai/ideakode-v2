const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  updateProjectStatus,
  getProjectsByUser,
  deleteProject,
  getUserProjects,
} = require("../controllers/projectController");
const authenticate = require("../middlewares/auth");
const upload = require("../middlewares/uploadImage");

const router = express.Router();

// Route to create a new project
router.post("/project", authenticate, upload.single("image"), createProject);
// Route to get all projects
router.get("/projects", getAllProjects);
// Route to get a single project by ID
router.get("/project/:id", getProjectById);
router.get("/assigned/projects", authenticate, getUserProjects);
// Route to update a project by ID
router.put("/project/:id", upload.single("image"), updateProject);
// Route to update the status of a project by ID
router.put("/project/:id/status", updateProjectStatus);
// Route to get projects created by a specific user
router.get("/projects/user/:userId", getProjectsByUser);
// Route to delete a project by ID
router.delete("/project/:id", deleteProject);

module.exports = router;
