const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Initialize App
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('TaskFlow API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));