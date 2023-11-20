const express = require("express");
const { createUser, loginUser } = require("../controller/userController");
const avatarUpload = require("../middleware/user/avatarUpload");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middleware/validator/user/userValidator");
const { loginUserValidator, loginUserValidationHandler } = require("../middleware/validator/user/userLoginValidator");

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
router.post("/login",loginUserValidator,loginUserValidationHandler, loginUser);

module.exports = router;
