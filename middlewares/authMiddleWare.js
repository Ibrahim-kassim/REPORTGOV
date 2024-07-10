const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log('Token:', token);

      // Decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Changed from JWT_SECRETE to JWT_SECRET

      console.log("Decoded Token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      console.log('Decoded Token:', decoded);
      console.log('User Found:', req.user); 

      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }

      console.log("User Found:", req.user);

      next();
    } catch (error) {
      console.error(`Token Error: ${error.message}`);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
