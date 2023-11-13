const User = require("../model/userSchema");
const bcrypt = require("bcrypt");

//register User
const createUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    let newUser;
    // make password hash
    const hashedPassword = await bcrypt.hash(password, 11);

    if (req.files && req.files.length > 0) {
      newUser = new User({
        ...req.body,
        password: hashedPassword,
        avatar: req.files[0].filename,
      });
    } else {
      newUser = new User({
        ...req.body,
        password: hashedPassword,
        avatar: null,
      });
    }

    const userData = await newUser.save();
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
