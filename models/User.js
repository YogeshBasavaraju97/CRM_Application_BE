const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true

  },
  password: {
    type: String,
    required: true
  }
  ,
  role: {
    type: String,
    enum: ['telecaller', 'admin'],
    required: true
  }
});

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60
  });
  return token;
};

userSchema.methods.verifyPassword = async function (userPassword) {
  const user = this;

  const isVerified = await bcrypt.compare(userPassword, user.password);

  return isVerified;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

