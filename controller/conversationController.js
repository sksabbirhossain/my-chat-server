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
    });
    res.status(200).json(conversations);
  } catch (err) {
      console.log(err)
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

module.exports = {
  getConversations,
  addConversation,
};
