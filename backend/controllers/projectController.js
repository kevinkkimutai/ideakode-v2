const { Project, User, Category } = require("../models");
const { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const logger = require("../utils/logger");

// Configure Cloudflare R2 client with enhanced settings
const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CF_ACCESS_KEY_ID,
    secretAccessKey: process.env.CF_SECRET_ACCESS_KEY,
  },
  maxAttempts: 3, // Retry failed requests
});

/**
 * Validates and uploads a file to R2 storage
 * @param {Object} file - Multer file object
 * @returns {Promise<string>} Public URL of the uploaded file
 */
const uploadToR2 = async (file) => {
  try {
    
    // Validate file input
    if (!file?.buffer || file.buffer.length === 0) {
      throw new Error("Empty file buffer received");
    }
    if (!file.mimetype.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    const fileName = `projects/${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    const uploadParams = {
      Bucket: process.env.CF_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength: file.size,
      Metadata: {
        uploadedBy: "netiqa-cms",
        originalName: encodeURIComponent(file.originalname)
      }
    };

    logger.info(`Uploading file to R2: ${fileName} (${file.size} bytes)`);

    // Upload file
    await r2.send(new PutObjectCommand(uploadParams));

    // Verify upload was successful
    const headParams = {
      Bucket: process.env.CF_BUCKET_NAME,
      Key: fileName
    };
    const headResponse = await r2.send(new HeadObjectCommand(headParams));

    if (headResponse.ContentLength !== file.size) {
      throw new Error("Upload verification failed: Size mismatch");
    }

    // Return public URL (using custom domain if configured)
    const baseUrl = `${process.env.CF_CUSTOM_DOMAIN}`;

    return `${baseUrl}/${fileName}`;
  } catch (error) {
    logger.error("R2 upload failed:", error);
    throw new Error(`File upload failed: ${error.message}`);
  }
};

/**
 * Deletes a file from R2 storage
 * @param {string} url - Public URL of the file to delete
 */
const deleteFromR2 = async (url) => {
  try {
    if (!url) return;

    // Extract key from URL (works with both R2.dev and custom domains)
    const urlObj = new URL(url);
    const key = urlObj.pathname.substring(1); // Remove leading slash

    logger.info(`Deleting file from R2: ${key}`);

    await r2.send(
      new DeleteObjectCommand({
        Bucket: process.env.CF_BUCKET_NAME,
        Key: key,
      })
    );

    // Verify deletion
    try {
      await r2.send(new HeadObjectCommand({
        Bucket: process.env.CF_BUCKET_NAME,
        Key: key
      }));
      throw new Error("File still exists after deletion");
    } catch (verifyError) {
      if (verifyError.name === "NotFound") {
        logger.info(`Successfully deleted: ${key}`);
      } else {
        throw verifyError;
      }
    }
  } catch (error) {
    logger.error("R2 deletion failed:", error);
    throw new Error(`File deletion failed: ${error.message}`);
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    const { title, description, categoryId, demolink, status } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    // Validate user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate category exists
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
    }

    // Validate and upload image
    let imageUrl = null;
    if (req.file) {
      try {
        imageUrl = await uploadToR2(req.file);
      } catch (uploadError) {
        return res.status(400).json({ error: uploadError.message });
      }
    }

    // Create project
    const project = await Project.create({
      title,
      description,
      userId,
      image: imageUrl,
      categoryId: categoryId || null,
      demolink: demolink || null,
      status: status || "draft",
    });

    // logger.info(`Project created: ${project.id}`);
    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });

  } catch (error) {
    // logger.error("Project creation error:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { id } = req.body;
    const { title, description, categoryId, demolink, status } = req.body;

    // Find project
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Handle image update
    let imageUrl = project.image;
    if (req.file) {
      try {
        // Delete old image if exists
        if (project.image) {
          await deleteFromR2(project.image).catch(e => 
            logger.warn("Old image deletion warning:", e.message)
          );
        }
        // Upload new image
        imageUrl = await uploadToR2(req.file);
      } catch (uploadError) {
        return res.status(400).json({ error: uploadError.message });
      }
    }

    // Update project
    const updatedProject = await project.update({
      title: title || project.title,
      description: description || project.description,
      image: imageUrl,
      categoryId: categoryId !== undefined ? categoryId : project.categoryId,
      demolink: demolink !== undefined ? demolink : project.demolink,
      status: status || project.status,
    });

    logger.info(`Project updated: ${id}`);
    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject
    });

  } catch (error) {
    logger.error("Project update error:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Delete associated image
    if (project.image) {
      await deleteFromR2(project.image).catch(e => 
        logger.warn("Image deletion warning:", e.message)
      );
    }

    await project.destroy();
    // logger.info(`Project deleted: ${id}`);
    return res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });

  } catch (error) {
    // logger.error("Project deletion error:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

// Get all projects (with pagination)
const getAllProjects = async (req, res) => {
  try {
      const projects = await Project.findAll({
          include: [
              {
                  model: User,
                  as: "user",
                  attributes: ["id", "name", "email"],
                },
                {
                  model: Category,
                  as: "category",
                  attributes: ["id", "name"],
                },
            ],
      });
      res.status(200).json(projects);
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


module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  getUserProjects,
  updateProject,
  updateProjectStatus,
  getProjectsByUser,
  deleteProject
};