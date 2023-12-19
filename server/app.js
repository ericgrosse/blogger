require('dotenv').config({ path: '../.env' });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Check if SESSION_SECRET is set
if (!process.env.SESSION_SECRET) {
  console.error('SESSION_SECRET is not set. Please set this environment variable.');
  process.exit(1); // Exit the application or handle the error appropriately
}

// Use express-session for managing user sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Connect to MongoDB
// Todo: Setup process.env.MONGODB_URI in the future
mongoose.connect('mongodb://127.0.0.1/blogger');
const db = mongoose.connection;

// Handle MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
