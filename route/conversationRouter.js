const express = require("express");
const {
  getConversations,
  addConversation,
  editConversation,
  getConversation,
} = require("../controller/conversationController");

const router = express.Router();

router.get("/all", getConversations);
router.post("/add", addConversation);
router.patch("/update/:id", editConversation);
router.get("/", getConversation);

module.exports = router;
