
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
      next(); // User is authenticated, proceed to the next middleware
    } else {
      res.status(401).json({ message: 'Unauthorized: Please log in.' });
    }
  };
  
  module.exports = isAuthenticated;