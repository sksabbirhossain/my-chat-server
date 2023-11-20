const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRouter = require("./route/userRouter");
const conversationRouter = require("./route/conversationRouter");

const app = express();

//common middlemare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

//port
const PORT = process.env.PORT || 5000;

//database connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("database connections successfully"))
  .catch((e) => console.log(e));

// routes
app.use("/api/user", userRouter);
app.use("/api/conversation", conversationRouter);

//listen
app.listen(PORT, () => console.log(`listening port ${PORT}`));
