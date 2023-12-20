const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const BlogPost = require('../models/BlogPost');
const authMiddleware = require('../middleware/authMiddleware');

const usernameRegex = /^[a-zA-Z0-9_]{1,15}$/; // Regular expression for Twitter-like handles
const minPasswordLength = 8;
const maxPasswordLength = 64;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/; // Password complexity regex without special characters
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation regex

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { displayName, handle, email, password } = req.body;

    // Check if displayName is empty
    if (!displayName.trim()) {
      return res.status(400).json({ error: 'Display name cannot be empty' });
    }

    // Check if the email is in a valid format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address format' });
    }

    // Check if the email is unique
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Check if the handle follows the rules
    if (!usernameRegex.test(handle)) {
      return res.status(400).json({ error: 'Invalid handle format. Handles can only contain letters, numbers, and underscores, and must be 1 to 15 characters long.' });
    }

    // Check if the handle is unique
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
      return res.status(400).json({ error: 'Handle already exists' });
    }

    // Check if the password meets criteria
    if (password.length < minPasswordLength || password.length > maxPasswordLength || !passwordRegex.test(password)) {
      return res.status(400).json({
        error: `Invalid password. Password must be between ${minPasswordLength} and ${maxPasswordLength} characters long and include at least one uppercase letter, one lowercase letter, and one number.`,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ displayName, handle, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token, user: { _id: newUser._id, email: newUser.email } });
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

    // Compare the entered password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user: { _id: user._id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  try {
    // Destroy the user session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).json({ error: 'Internal server error during logout' });
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new blog post
router.post('/blog-post', authMiddleware, async (req, res) => {
  try {
    const { title, content, viewCount, datePublished, dateLastEdited } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Missing required field: title' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Missing required field: content' });
    }

    // Create a new blog post
    const newBlogPost = new BlogPost({
      userId: req.user._id,
      title,
      content,
      viewCount,
      datePublished,
      dateLastEdited
    });

    // Save the blog post to the database
    await newBlogPost.save();

    // Populate the user details in the response
    await BlogPost.populate(newBlogPost, { path: 'userId', select: 'handle displayName' });

    // Rename userId to user in the response
    const { userId, ...rest } = newBlogPost.toObject();
    const updatedBlogPost = { user: userId, ...rest };

    res.status(201).json({ message: 'Blog post created successfully', blogPost: updatedBlogPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
