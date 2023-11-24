const express = require("express");
const { sendMessage } = require("../controller/messageController");

const router = express.Router();

router.post("/add/:id", sendMessage)

module.exports = router;
