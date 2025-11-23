const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://TalhaDevDaily:Bmwm3gtrrx7rx8@cluster1st.obvkoyj.mongodb.net/userCredentials?appName=Cluster1st"
  )
  .then(function () {
    console.log("DB Connected!");
  });

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

app.post("/register", function (req, res) {
  const { fullName, email, password, age } = req.body;

  //   Validation
  if (!fullName) res.send(" ");
});

const message =
  "Oh, what a beautiful morning, oh what a beautiful day, I've got a beautiful feeling everything's going my way! 🌄";

app.get("/", function (req, res) {
  res.send(message);
});

app.listen("8000", function () {
  console.log("Server is running 🏃‍♂️");
});
