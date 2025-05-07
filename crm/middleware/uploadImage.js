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

    const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
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
module.exports = {
  uploadToR2,
  deleteFromR2,
};
