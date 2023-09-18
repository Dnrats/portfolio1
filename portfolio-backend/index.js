require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const adminUID = process.env.ADMIN_UID;
const serviceAccount = require('./your-firebase-admin-key.json');
const path = require('path'); // Import the path module


// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());;

// Middleware to check if the user is the admin
const authenticateAdmin = (req, res, next) => {
    const idToken = req.headers.authorization;
  
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const isAdmin = decodedToken.uid === adminUID; // Replace with your admin UID
        if (isAdmin) {
          req.user = decodedToken;
          next();
        } else {
          res.status(401).json({ message: 'Unauthorized. Only the admin can access this route.' });
        }
      })
      .catch((error) => {
        res.status(401).json({ message: 'Authentication failed' });
      });
  };

// Example route accessible only to the admin
app.get('/dashboard', authenticateAdmin, (req, res) => {
    // This route is accessible only to the admin
    res.json({ message: 'You are not allowed here' });
  });
   

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Serve your main index.html page at the root route
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../index.html');
  res.sendFile(indexPath);
});

// Serve the login page at a specific URL like /login
app.get('/login', (req, res) => {
  const loginPagePath = path.join(__dirname, 'login.html');
  res.sendFile(loginPagePath);
});

// ... Other routes for your application ...

// Example route to post a message with a date
app.post('/api/messages', authenticateUser, (req, res) => {
  const { message, date } = req.body;

  // Store the message and date in your data structure or database

  // Respond with a success status
  res.status(201).json({ message: 'Message posted successfully' });
});