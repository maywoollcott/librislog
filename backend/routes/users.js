const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

// register user and get token @ base/
router.post('/', [
  check('username', 'Username is required.').not().isEmpty(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, readingGoal } = req.body;

  try {
    let user = await User.findOne({ username });

    if(user) {
      return res.status(400).json({ errors: [{ msg: 'Username is already taken. Please try again.' }]})
    }

    user = new User ({
      username,
      email,
      password,
      readingGoal
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const accessToken = jwt.sign( {username: username}, jwtSecret )
    res.status(200).send({ accessToken: accessToken })
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// get all users (FOR TESTING)
router.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
})

// update user's library @ base/updatelibrary
router.put('/updatelibrary', authMiddleware, async (req, res) => {

  try {
    const { username } = req.username
    const user = await User.findOne({ username: username })

    user.books = req.body
    await user.save();
    res.status(200).send(user)

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// fetch user's library @ base/books
router.get('/books', authMiddleware, async (req, res) => {
  try {
    const { username } = req.username
    const user = await User.findOne({ username: username })

    const books = user.books;

    res.status(200).json(books)

  } catch(err) {

    console.error(err.message);
    res.status(500).send('Server error.');

  }
})
module.exports = router;