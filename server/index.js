import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './Routes/authroute.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ems')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'API working fine' });
});

// Auth routes
app.use('/api/auth', authRoute);

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, message });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
