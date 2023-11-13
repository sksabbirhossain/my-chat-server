const { check, validationResult } = require("express-validator");
const User = require("../../../model/userSchema");
const { unlink } = require("fs");
const path = require("path");

const addUserValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name must be required")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Email must be required")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.find({ email: value });
        if (user) {
          throw Error("Email already is use!");
        }
      } catch (err) {
        throw Error(err.message);
      }
    }),
  check("mobile")
    .isLength({ min: 11 })
    .withMessage("Mobile must be required and lessthen 11 chars")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.find({ mobile: value });
        if (user) {
          throw Error("Mobile already is use!");
        }
      } catch (err) {
        throw Error(err.message);
      }
    }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Mobile must be required and lessthen 8 chars")
    .trim(),
];

const addUserValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove upload file
    if (req.file) {
      const { filename } = req.file;
      unlink(
        path.join(__dirname, `../../../uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
  }
  res.status(500).join({
    error: mappedErrors,
  });
};

module.exports = {
  addUserValidator,
  addUserValidatorHandler,
};
