//send message
const sendMessage = async (req, res) => {
  try {
    res.send("hello");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  sendMessage,
};
