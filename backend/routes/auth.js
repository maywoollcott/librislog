const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
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

    // const payload = {
    //   user: {
    //     id: user.id
    //   }
    // };

    const token = jwt.sign({id: user.id}, 'jwtSecret', {
      expiresIn: 86400
    });

    res.status(200).send({
      id: user.id,
      accessToken: token,
      
    })
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



module.exports = router;