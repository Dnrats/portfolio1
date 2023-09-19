// Import necessary modules at the top of your server.mjs
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mysql from 'mysql';
import path from 'path';
// import bcrypt from 'bcrypt';
import bodyParser from 'body-parser'; 
import { dbConfig } from './config.js'; 
import session from 'express-session'; // Import express-session

// Obtain the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Create an Express app and set up the port
const app = express();
const port = 3000;

// Configure body-parser to handle JSON data
app.use(bodyParser.json());

app.use(
  session({
    secret: 'vkwefbdn&*f67mjfhNfkFN%', // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: true,
  })
);

// Define a route for the homepage
app.get('/', (req, res) => {
  // Use path.join to create a file path to your HTML file
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.use('/Css', express.static(path.join(__dirname, 'Css')));

// POST route for handling user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Stage 1');

  // Query the database to verify admin user's credentials
db.query('SELECT * FROM admin_user WHERE username = ?', [username], async (err, results) => {
  if (err) {
    console.error('Database error:', err);
    return res.status(500).json({ message: 'Database error' });
  }

  if (results.length === 0) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
console.log('Stage 2');

  // Compare the hashed password with the provided password
  // const storedPassword = results[0].password; 
  // const passwordsMatch = await bcrypt.compare(password, storedPasswordHash);

  // if (!passwordsMatch) {
  //   console.log('Password does not match');
  //   return res.status(401).json({ success: false, message: 'Authentication failed' });
  // }
  
  if (password === results[0].password) {
    console.log('Authentication successful');
    req.session.username = username;
    return res.status(200).json({ success: true, message: 'Authentication successful' });
  } else {
    console.log('Password does not match');
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
});
});
console.log('Stage 4');


// MySQL database connection setup using the imported configuration
const db = mysql.createConnection(dbConfig);

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  const { username, password } = req.body;

  // Compare the provided username and password with the user's credentials stored in the session
  const storedUsername = req.session.username; // Access the username from the session
  const storedPassword = req.session.password; // Access the plain text password from the session

  if (username === storedUsername && password === storedPassword) {
    // Assuming you have successfully authenticated the user
      req.session.username = username; 
// Store the username in the session

    // User is authenticated, proceed to the next middleware
    next();
  } else {
    // User is not authenticated, send an unauthorized response
    res.status(401).json({ message: 'Unauthorized' });
  }
}

// Send to dashboard if connection is successful
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});


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

