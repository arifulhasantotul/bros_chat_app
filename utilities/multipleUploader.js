// external imports
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const { dirname } = require("path");

const multipleUploader = (
  subfolder_name,
  allowed_file_types,
  max_file_size,
  max_number_of_upload_files,
  error_msg
) => {
  // setting file store folder
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${subfolder_name}/`;

  // taking full control of storing file in disk by using diskStorage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);

      // generating unique filename
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  // prepare final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (req.files.length > max_number_of_upload_files) {
        cb(
          createError(
            `Maximum ${max_number_of_upload_files} files are allowed to upload!`
          )
        );
      } else {
        if (allowed_file_types.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(createError(error_msg));
        }
      }
    },
  });

  return upload;
};

// export module
module.exports = multipleUploader;
