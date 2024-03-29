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

// Serve React app during development
if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, '../public')));
}

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

// Add middleware for handling unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint Not Found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
