const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const config = require('config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

// @route:  POST /
// @desc:   Register user
//@access:  Public
//using express validation
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

    const accessToken = jwt.sign( {username: username}, config.get('jwtSecret') )
    res.status(200).send({ accessToken: accessToken })
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route:  GET /users
// @desc:   get all users
//@access:  Public

router.get('/users', authMiddleware, async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
})

// @route:  PUT /updatelibrary
// @desc:   update user's library
//@access:  Public
//using express validation
router.put('/updatelibrary', authMiddleware, async (req, res) => {

  try {
    const { username } = req.username
    const user = await User.findOne({ username: username })
    console.log(user)

    user.books = req.body
    await user.save();
    res.status(200).send(user)

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route:  GET /books
// @desc:   get all books for user
//@access:  Public

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