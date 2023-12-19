const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { displayName, handle, email, password } = req.body;

    // Check if the email is unique
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Check if the handle is unique
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
      return res.status(400).json({ error: 'Handle already exists' });
    }

    const newUser = new User({ displayName, handle, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login with email or handle
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find the user by email or handle
    const user = await User.findOne({
      $or: [{ email: identifier }, { handle: identifier }],
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct (you should use a secure authentication method)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set user information in the session (you may want to customize this based on your authentication strategy)
    req.session.user = {
      _id: user._id,
      email: user.email,
    };

    res.status(200).json({ message: 'Login successful', user: { _id: user._id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  // Implement logout logic here
});

module.exports = router;
