// app.js
const express = require('express');
const { connectDB } = require('./db'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});