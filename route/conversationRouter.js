const express = require("express");
const {
  getConversations,
  addConversation,
} = require("../controller/conversationController");

const router = express.Router();

router.get("/all", getConversations);
router.post("/add", addConversation);

module.exports = router;
