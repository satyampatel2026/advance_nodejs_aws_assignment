const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const allowedExtensions = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
];

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },

  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const isMimeTypeAllowed = allowedMimeTypes.includes(
      file.mimetype
    );

    const isExtensionAllowed = allowedExtensions.includes(ext);

    if (!isMimeTypeAllowed || !isExtensionAllowed) {
      return cb(
        new Error(
          "Only PDF, JPG, JPEG and PNG files are allowed."
        )
      );
    }

    cb(null, true);
  },
});

module.exports = upload;
