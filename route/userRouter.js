const express = require("express");
const { createUser } = require("../controller/userController");
const avatarUpload = require("../middleware/user/avatarUpload");

const router = express.Router();

//get
router.post("/register", avatarUpload, createUser);

module.exports = router;
