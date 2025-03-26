const path = require("path");
const { Project, User, Category } = require("../models");

// Create a new project
const createProject = async (req, res) => {
try {
    const userId = req.user.id;
    const {title, description, categoryId,  demolink, status} = req.body;

    if  (userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found 🥶" });
        }
    }
    if  (categoryId) {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: "Category not found 🥶" });
        }
    }
        // Check if a file was uploaded
        let imageUrl = null;
        if (req.file) {
          imageUrl = path.join(`${process.env.BACKEND_URL}/uploads`, req.file.filename);
        }

    const project = await Project.create({
        title,
        description,
        userId,
        image: imageUrl || null, 
        categoryId, 
        demolink, 
        status,
    });
    res.status(201).json({
        message: "Project created successfully 🎉",
        Project: project,
      });
    
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

// Get all projects
const getAllProjects = async (req, res) => {
try {
    const projects = await Project.findAll({
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "name", "email"],
              },
          ],
    });
    res.status(200).json(projects);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

// Get a single project
const getProjectById = async (req, res) => {
try {
    const { id } = req.params;
    const project = await Project.findByPk(id, {
        include: [
            {
                model: User,
                as: "creatorUser",
                attributes: ["id", "title", "email"],
              },
              { 
                model: Category, 
                as: 'category',
                attributes: ["id", "name", "description"],
            },
          ],
    });
    if (!project) {
        return res.status(404).json({ error: "Project not found 🥶" });
    }
    res.status(200).json(project);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

// Update a project
const updateProject = async (req, res) => {
try {
    const { id } = req.params;
    const { title, description, userId, categoryId, demolink, status } = req.body;
    const project = await Project.findByPk(id);
    if (!project) {
        return res.status(404).json({ error: "Project not found 🥶" });
    }
     // Check if a file was uploaded
     let imageUrl = null;
     if (req.file) {
       imageUrl = path.join(`${process.env.BACKEND_URL}/uploads`, req.file.filename);
     }
    const updatedProject = await project.update({
        title: title || project.title,
        description: description || project.description,
        userId: userId || project.userId,
        image: imageUrl || project.image,
        categoryId: categoryId || project.category,
        demolink: demolink || project.demolink,
        status: status || project.status,
    });
    res.status(200).json({
        message: "Project updated successfully 🎉.",
        project: updatedProject,
      });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}
// Update a project status
const updateProjectStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ error: "Project not found 🥶" });
        }
        const updatedProject = await project.update({
            status: status || project.status,
        });
        res.status(200).json({
            message: "Project Status updated successfully 🎉.",
            project: updatedProject,
          });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

// Delete a project
const deleteProject = async (req, res) => {
try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) {
        return res.status(404).json({ error: "Project not found🥶" });
    }
    await project.destroy();
    res.status(200).json({ message: "Project deleted successfully 🥺" });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

// Get projects created a user
const getProjectsByUser = async (req, res) => {
try {
    const { userId } = req.params;
    const projects = await Project.findAll({ where: { userId } });
    if (!projects) {
        return res.status(404).json({ error: "Projects not found for this user 🥶" });
    }
    res.status(200).json(projects);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

    // Get projects assigned to a user
    const getUserProjects = async (req, res) => {
        try {
            const userId  = req.user.id;
            const projects = await Project.findAll({
                where: { assignedTo: userId } ,
                include: [
                    {
                        model: User,
                        as: "creatorUser",
                        attributes: ["id", "title", "email"],
                      },
                  ],
            });
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        }

module.exports = {createProject, getAllProjects, getProjectById, getUserProjects, updateProject, updateProjectStatus, getProjectsByUser, deleteProject}