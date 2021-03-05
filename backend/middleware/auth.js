const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  //get token from header
  // const token = req.header('x-auth-token');
  //check if no token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  try {
    jwt.verify(token, jwtSecret, (err, username) => {
      req.username = username;
    });
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid.' })
  }
};

module.exports = authMiddleware