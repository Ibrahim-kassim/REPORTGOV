const express = require("express");
const { registerUser, authUser, getAllUsers, getUserById, updateUser ,CreateAdmin} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleWare");
const router = express.Router();

router.post("/login",authUser);
router.post("/register",registerUser);
router.get("/allusers",getAllUsers)
router.get("/profile", protect, getUserById); 
router.put("/profile", protect, updateUser);
router.post("/createNewAddAdmin",CreateAdmin)




module.exports = router;