const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express(); // 🔥 this must come BEFORE any use of `app`

require('dotenv').config();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes (add your route files here if you have them)
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("DB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
