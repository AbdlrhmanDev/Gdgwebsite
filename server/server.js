require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/error');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://gdg-guc3n1h1h-orisho7s-projects.vercel.app',
    'https://gdg-8v8jijt9x-orisho7s-projects.vercel.app',
    'https://gdg-g5b0i7q78-orisho7s-projects.vercel.app',
    'https://www.gdg-uom.me',
    'https://gdg-uom.me',
    /\.vercel\.app$/,
    /\.gdg-uom\.me$/
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/events', require('./routes/events'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/badges', require('./routes/badges'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/settings', require('./routes/settings'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`❌ Error: ${err.message}`);
  process.exit(1);
});
