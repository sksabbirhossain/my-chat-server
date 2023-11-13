const uploader = require("../../utils/fileUpload");

function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    5000000,
    ["image/jpeg", "image/jpg", "image/png"],
    "Only .jpg, jpeg or .png format allowed!"
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

module.exports = avatarUpload;
