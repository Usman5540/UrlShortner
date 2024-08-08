const jwt = require('jsonwebtoken');
const User = require('../models/signup'); // Adjust the path to your User model

const authentication = async (req, res, next) => {
  try {
    const { token } = req.cookies;
  // console.log(token);
    if (!token) {
      return res.redirect('/login');
    }

    // Verify the token
    const verification = jwt.verify(token, 'ok'); // Use your secret key here
    // console.log(verification);

    // Find the user by ID from the token
    const user = await User.findById(verification._id);
    // console.log(user);

    if (!user) {
      return res.redirect('/login');
    }

    // Attach the user object to the request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      // Handle invalid token error
      return res.redirect('/login');
    } else if (error.name === 'TokenExpiredError') {
      // Handle expired token error
      return res.redirect('/login');
    } else {
      // Handle other errors
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};



module.exports = {authentication};
