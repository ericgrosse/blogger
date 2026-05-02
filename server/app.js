const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const requiredEnvironmentVariables = ['SESSION_SECRET', 'JWT_SECRET'];
const missingEnvironmentVariables = requiredEnvironmentVariables.filter((name) => !process.env[name]);

if (missingEnvironmentVariables.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvironmentVariables.join(', ')}`);
  process.exit(1);
}

// Use express-session for managing user sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
}));

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1/blogger';
mongoose.connect(mongoUri);
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
