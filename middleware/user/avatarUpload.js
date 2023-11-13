const uploader = require("../../utils/fileUpload");

const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars",
    5000,
    ["image/jpg", "image/jpeg", "image/png"],
    "Only jpg, jpeg or png format allowed"
  );
  upload.single("avatar")(req, res, (err) => {
    if (!err) {
      next();
    }
  });
};

module.exports = avatarUpload;
