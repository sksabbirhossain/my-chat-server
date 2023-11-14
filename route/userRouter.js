const express = require("express");
const { createUser, loginUser } = require("../controller/userController");
const avatarUpload = require("../middleware/user/avatarUpload");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middleware/validator/user/userValidator");

const router = express.Router();

//create a user
router.post(
  "/register",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  createUser
);
//login a user
router.post("/login", loginUser);

module.exports = router;
