const express = require("express");
const { createUser } = require("../controller/userController");
const avatarUpload = require("../middleware/user/avatarUpload");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middleware/validator/user/userValidator");

const router = express.Router();

//get
router.post(
  "/register",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  createUser
);

module.exports = router;
