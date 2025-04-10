// db.js
const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
  user: 'postgre', // replace with your database username
  host: 'db.oecqjunwtyzdfshsqsqc.supabase.co',      // replace with your database host
  database: 'postgres', // replace with your database name
  password: 'Lohith@15111627', // replace with your database password
  port: 5432,             // default PostgreSQL port
});

// Function to connect to the database
const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database successfully!');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

// Export the pool and connect function
module.exports = { pool, connectDB };