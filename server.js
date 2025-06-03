const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/products');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(logger);
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Error handler
app.use(errorHandler);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => {
    console.log(`Server is now  running on port ${process.env.PORT}`);
  });
})
.catch(err => {
  console.error('Connection error:', err);
});
