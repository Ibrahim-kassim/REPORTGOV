const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next(); // Allow access to the next middleware or route handler
    } else {
      res.status(403);
      throw new Error("Not authorized as an admin testetst");
    }
  };
  
  module.exports = isAdmin;
  