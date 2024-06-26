const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const connect = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Database is connected successfully");
    }).catch((err) => console.log(err));
};

// Define smchema
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    // required: true,
  },
  username: {
    type: String,
    unique: true,
    // required: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
  },
  photos: [String],
  company: String,
  specialized: String,
  website: String,
});

const User = mongoose.model("users", userSchema);

module.exports = { connect, User };
