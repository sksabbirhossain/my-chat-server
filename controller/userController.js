const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

//login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user._id) {
      //compare to user provide password
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        // make a user information object
        const userInfo = { ...user._doc };

        //delete password form userInfo
        delete userInfo.password;

        // create jwt token
        const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        // send response
        res.status(200).json({
          user: userInfo,
          accessToken: token,
        });
      } else {
        res.status(404).json({
          message: "Invalid user information",
        });
      }
    } else {
      res.status(404).json({
        message: "Invalid user information",
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
  loginUser,
};
