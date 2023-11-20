const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    creator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    last_updated: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
