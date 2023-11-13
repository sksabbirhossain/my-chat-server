const multer = require("multer");
const path = require("path");

const uploader = (upload_path, file_size, allow_file_types, error_message) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../uploads/${upload_path}/`);
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);
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

  const upload = multer({
    storage: storage,
    limits: file_size,
    fileFilter: (req, file, cb) => {
      if (allow_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(Error(error_message));
      }
    },
  });

  return upload;
};

module.exports = uploader;
