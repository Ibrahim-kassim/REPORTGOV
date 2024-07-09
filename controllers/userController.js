const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { generateToken } = require("../config/generateToken");



const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password,gender,dateOfBirth } = req.body;
  
    if (!username || !email || !password) {
      res.status(400).json({ message: "Please enter all the fields" });
      return;
    }
  
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "Email is already in use" });
      return;
    }
  
    const user = await User.create({ username, email, password,gender,dateOfBirth });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        gender:user.gender,
        dateOfBirth:user.dateOfBirth,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).json({ message: "User registration failed" });
    }
  });

 
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  });

  const getAllUsers = asyncHandler(async(req,res)=>{
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  })
    
  const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});
const updateUser = asyncHandler(async (req, res) => {
  const { username, email, gender, dateOfBirth, isAdmin } = req.body;

  const user = await User.findById(req.user._id);
  if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      user.gender = gender || user.gender;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

      const updatedUser = await user.save();
      res.json({
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          gender: updatedUser.gender,
          dateOfBirth: updatedUser.dateOfBirth,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser._id), // Optional: generate a new token if needed
      });
  } else {
      res.status(404).json({ message: "User not found" });
  }
});

const CreateAdmin = asyncHandler(async(req,res)=>{
  const { username, email, password,gender,dateOfBirth,isAdmin } = req.body;
  
  if (!username || !email || !password) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400).json({ message: "Email is already in use" });
    return;
  }

  const user = await User.create({ username, email, password,gender,dateOfBirth ,isAdmin });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      gender:user.gender,
      dateOfBirth:user.dateOfBirth,
      isAdmin:user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(500).json({ message: "Admin registration failed" });
  }
})

  module.exports = {
    registerUser,
    authUser,
    getAllUsers,
    getUserById,
    updateUser,
    CreateAdmin
  };
  