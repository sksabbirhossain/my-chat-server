const User = require("../model/userSchema");
const bcrypt = require("bcrypt");

//register User
const createUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const { filename } = req.file || {};

    // make password hash
    const hashedPassword = await bcrypt.hash(password, 11);
    const user = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      avatar: filename || null,
    });
    const userData = await user.save();
    if (userData._id) {
      res.status(200).json({
        message: "User Create SuccessFull",
        user: userData,
      });
    } else {
      res.status(500).json({
        message: "There was an error!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createUser,
};
