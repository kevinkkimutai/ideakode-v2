const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.memoryStorage(), // Store in memory for R2 upload
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
    }
    cb(null, true);
  }
}).single('image'); // Field name must match your form

// Enhanced error handling middleware
const handleUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ 
        error: err.message,
        details: err.code === 'LIMIT_FILE_SIZE' ? 'File too large' : undefined
      });
    }
    
    // Debug log the received file
    if (req.file) {
      console.log('Received file:', {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        buffer: req.file.buffer ? `Buffer[${req.file.buffer.length} bytes]` : 'NULL'
      });
    }
    
    next();
  });
};

module.exports = handleUpload;