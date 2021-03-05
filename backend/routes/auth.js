const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    const books = user.books;

    res.status(200).json(books)

  } catch(err) {

    console.error(err.message);
    res.status(500).send('Server error.');

  }
})

// @route:  GET /auth
// @desc:   Test route
//@access:  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500). send('Server error!')
  }
});

// @route:  POST api/auth
// @desc:   Authenticate user and get token
//@access:  Public
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