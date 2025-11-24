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

// Custom validator function for password complexity
const passwordValidator = {
  // Regex requires at least one uppercase letter, one lowercase letter, one number,
  // one special character, and a minimum length of 8 characters.
  validator: function (v) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      v
    );
  },
  message: (props) =>
    `${props.value} is not a valid password! Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).`,
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Removes leading/trailing whitespace
    lowercase: true,
    trim: true, // Removes leading/trailing whitespace
    minLength: 3,
    maxLength: 20,
    // Optional: Only allow alphanumeric characters and underscores
    match: [
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ],
  },
  email: {
    type: String,
    required: [true, "Email address is required."],
    unique: true,
    trim: true,
    lowercase: true,
    // Standard regex for basic email validation
    match: [/.+\@.+\..+/, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    select: false, // Security feature: hides password by default in queries
    validate: passwordValidator, // Applies the complex regex validation
  },

  age: {
    type: Number,
    required: [true, "Age is required."],
    min: [18, "Age is required."],
    max: [120, "Age cannot exceed 120."],
    validate: {
      validator: Number.isInteger,
      message: "Age must be an integer (whole number).",
    },
  },
});

const User = mongoose.model("User", userSchema);

app.post("/register", function (req, res) {
  const { fullName, email, password, age } = req.body;

  //   Validation
  if (!fullName) res.status(401).send("Please key in your name 📛");
  if (!email) res.status(401).send("Ayoo, there ain't not email here 📧");
  if (!password) res.status(401).send("Woah, woah! Need password buddy 🍁");
  if (!age) res.status(401).send("Are 18 yet?");

  const userData = new User({
    fullName,
    email,
    password,
    age,
  });

  userData.save();

  res.status(201).send({
    success: "Registeration successful!",
    userData,
  });
});

const message =
  "Oh, what a beautiful morning, oh what a beautiful day, I've got a beautiful feeling everything's going my way! 🌄";

app.get("/", function (req, res) {
  res.send(message);
});

app.listen("8000", function () {
  console.log("Server is running 🏃‍♂️");
});
