const express = require("express");

const router = express.Router();

//get
router.post("/register", (req, res) => {
  res.send("hello");
});

module.exports = router;
