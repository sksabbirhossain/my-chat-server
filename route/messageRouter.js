const express = require("express");
const { sendMessage, getMessages } = require("../controller/messageController");

const router = express.Router();

router.get("/all/:id", getMessages);
router.post("/add/:id", sendMessage);

module.exports = router;
