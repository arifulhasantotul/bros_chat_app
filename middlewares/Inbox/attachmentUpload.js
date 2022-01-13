// internal imports
const multipleUploader = require("../../utilities/multipleUploader");

function attachmentUpload(req, res, next) {
  const upload = multipleUploader(
    "attachments",
    [image / jpeg, image / jpg, image / png],
    1000000,
    2,
    "Only .jpeg, .jpg or .png format allowed!"
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

// export module
module.exports = attachmentUpload;
