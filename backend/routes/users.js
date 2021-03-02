const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const config = require('config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

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

    res.status(200).send('User added!')

    // const payload = {
    //   user: {
    //     id: user.id
    //   }
    // }

    // jwt.sign(
    //   payload, 
    //   config.get('jwtSecret'),
    //   { expiresIn: 360000 },
    //   (err, token) => {
    //     if(err) throw err;
    //     res.json({ token });
    //   });
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route:  GET /users
// @desc:   get all users
//@access:  Public

router.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
})

// @route:  PUT /addbook/:id
// @desc:   Add book to user's library
//@access:  Public
//using express validation
router.put('/addbook/:id', [
  check('title', 'Title is required.').not().isEmpty(),
  check('author', 'Author is required.').not().isEmpty(),
  check('yearPublished', 'Please enter a year with four digits.').isLength(4),
  check('pages', 'Please enter the number of pages in your edition.').not().isEmpty(),

], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, yearPublished, pages, currentlyReading, finished, wantToRead, dateStarted, dateFinished, rating  } = req.body;

  try {
    const user = await User.findById(req.params.id)

    const book = {
      title, 
      author, 
      yearPublished, 
      pages,
      ...currentlyReading && { currentlyReading: true},
      ...finished && { finished },
      ...wantToRead && { wantToRead },
      ...dateStarted && { dateStarted },
      ...dateFinished && { dateFinished },
      ...rating && { rating }
    };

    user.books.unshift(book);

    await user.save();

    res.status(200).json('Book added!')

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route:  GET /books/:id
// @desc:   get all books for user
//@access:  Public

router.get('/books/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    const books = user.books;

    res.status(200).json(books)

  } catch(err) {

    console.error(err.message);
    res.status(500).send('Server error.');

  }
})
module.exports = router;