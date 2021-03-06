const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');

// Authenticate user and get token @ base/auth
router.post('/', [
  check('username', 'Please include a valid username.').exists(),
  check('password', 'Password is required.').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if(!user) {
      return res.status(400).json({ errors: [{ msg: 'User does not exist.' }] })
    };

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] })
    }


    const accessToken = jwt.sign( {username: username}, jwtSecret )
    res.status(200).send({ accessToken: accessToken })

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});



module.exports = router;