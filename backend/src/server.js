const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize App
const app = express();

// Connect to Database
connectDB();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://task-flow-three-gray.vercel.app",  
    "https://task-flow-krm22zbjb-likhith-chappatis-projects.vercel.app" 
  ],
  credentials: true
}));
app.use(express.json()); 

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('TaskFlow API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));