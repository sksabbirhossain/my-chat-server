const express = require("express");
const {
  getConversations,
  addConversation,
  editConversation,
} = require("../controller/conversationController");

const router = express.Router();

router.get("/all", getConversations);
router.post("/add", addConversation);
router.patch("/update/:id", editConversation);

module.exports = router;
