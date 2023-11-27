const Conversation = require("../model/conversationSchema");

//get all conversation
const getConversations = async (req, res) => {
  try {
    const { userid } = req.query;
    if (!userid) {
      res.status(500).json({
        message: "user id is required!",
      });
    }
    const conversations = await Conversation.find({
      $or: [{ "creator.id": userid }, { "participant.id": userid }],
    }).sort({ last_updated: -1 });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//get a conversation
const getConversation = async (req, res) => {
  try {
    const { userid, participantid } = req.query;
    if (!userid && participantid) {
      res.status(500).json({
        message: "user id is required!",
      });
    }
    const conversation = await Conversation.find({
      $or: [
        { "creator.id": userid, "participant.id": participantid },
        { "creator.id": participantid, "participant.id": userid },
      ],
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//add a conversation
const addConversation = async (req, res) => {
  const { creator, participant } = req.body;
  try {
    const newConversation = new Conversation({
      creator: {
        id: creator.id,
        name: creator.name,
        avatar: creator.avatar || null,
      },
      participant: {
        id: participant.id,
        name: participant.name,
        avatar: participant.avatar || null,
      },
    });
    const result = await newConversation.save();
    res.status(200).json({
      message: "Conversation was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//edit a conversation
const editConversation = async (req, res) => {
  const conversationId = req.params.id;
  const updateData = req.body;

  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { _id: conversationId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedConversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json(updatedConversation);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getConversations,
  getConversation,
  addConversation,
  editConversation,
};
