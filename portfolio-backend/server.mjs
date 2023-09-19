// Import necessary modules at the top of your server.mjs
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mysql from 'mysql';
import path from 'path';
import bcrypt from 'bcrypt';

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

app.use('/Css', express.static(path.join(__dirname, 'Css')));

// POST route for handling user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to verify admin user's credentials
db.query('SELECT * FROM admin_user WHERE username = ?', [username], async (err, results) => {
  if (err) {
    console.error('Database error:', err);
    return res.status(500).json({ message: 'Database error' });
  }

  if (results.length === 0) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }

  // Compare the hashed password with the provided password
  const storedPasswordHash = results[0].password; 
  const passwordsMatch = await bcrypt.compare(password, storedPasswordHash);

  if (!passwordsMatch) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }

  // User is authenticated
  res.status(200).json({ success: true, message: 'Authentication successful' });
});
});

// Send to dashboard if connection is successful
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// MySQL database connection setup using the imported configuration
const db = mysql.createConnection(dbConfig);

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  const { username, password } = req.body;

  // Query the database to verify admin user's credentials
  db.query('SELECT * FROM admin_users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const storedPasswordHash = results[0].password;
    const passwordsMatch = await bcrypt.compare(password, storedPasswordHash);

    if (!passwordsMatch) {
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

// POST route for posting a message
app.post('/post-message', isAuthenticated, (req, res) => {
  const { date, message } = req.body;

  // Insert the message into the database (adjust this query based on your schema)
  db.query('INSERT INTO messages (date, text) VALUES (?, ?)', [date, message], (err) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    // Message posted successfully
    res.status(200).json({ success: true, message: 'Message posted successfully' });
  });
});

// GET route for fetching messages
app.get('/get-messages', isAuthenticated, (req, res) => {
  // Fetch messages from the database (adjust this query based on your schema)
  db.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    // Send the list of messages to the client
    res.status(200).json({ success: true, messages: results });
  });
});

// Logout route
app.get('/logout', (req, res) => {
  // Perform logout actions (e.g., clear session) and redirect to the login page
  // You can implement your logout logic here
  res.redirect('/login');
});


// Serve static files from the main folder
app.use(express.static(path.join(__dirname)));

app.use('/Javascript', express.static(path.join(__dirname, 'Javascript')));


