const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["female", "male"], required: true },
    dateOfBirth: {
      month: { type: String, required: true },
      day: { type: Number, required: true },
      year: { type: Number, required: true },
    },
    img: { type: String },
    phoneNumber: { type: Number },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
userModel.methods.matchedPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified()) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;
