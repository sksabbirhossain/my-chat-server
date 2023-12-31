const Message = require("../model/messageSchema");

//get message
const getMessages = async (req, res) => {
  try {
    const conversation_id = req.params.id;
    if (!conversation_id) {
      res.status(500).json({
        message: "user id is required!",
      });
    }
    const messages = await Message.find({
      conversation_id: conversation_id,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//send message
const sendMessage = async (req, res) => {
  const { message, sender, receiver, date_time } = req.body;
  const conversation_id = req.params.id;
  try {
    if (!conversation_id) {
      res.status(500).json({
        message: "conversation id is required!",
      });
    }

    const newMessage = new Message({
      message,
      sender: {
        id: sender.id,
        name: sender.name,
        avatar: sender.avatar || null,
      },
      receiver: {
        id: receiver.id,
        name: receiver.name,
        avatar: receiver.avatar || null,
      },
      date_time,
      conversation_id,
    });
    const result = await newMessage.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
