// Import necessary modules at the top of your server.mjs
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mysql from 'mysql2';
import path from 'path';

// Import the configuration
import { dbConfig } from './config.js'; // Adjust the path as needed

// Obtain the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an Express app and set up the port
const app = express();
const port = 3000;

// Define a route for the homepage
app.get('/', (req, res) => {
  // Use path.join to create a file path to your HTML file
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// MySQL database connection setup using the imported configuration
const db = mysql.createConnection(dbConfig);

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  const { username, password } = req.body;

  // Query the database to verify admin user's credentials
  db.query('SELECT * FROM admin_users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // User is authenticated
    next();
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
