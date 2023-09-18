const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const adminUID = process.env.ADMIN_UID;

// Initialize Firebase Admin SDK
const serviceAccount = require('./your-firebase-admin-key.json'); // Update with your key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your Firebase project URL
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
app.get('/api/admin-only', authenticateAdmin, (req, res) => {
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
  // Serve your main index.html file here
});

// Serve the login page at a specific URL like /login
app.get('/login', (req, res) => {
  const loginPagePath = path.join(__dirname, 'login.html');
});

// ... Other routes for your application ...

// Example route to post a message with a date
app.post('/api/messages', authenticateUser, (req, res) => {
  const { message, date } = req.body;

  // Store the message and date in your data structure or database

  // Respond with a success status
  res.status(201).json({ message: 'Message posted successfully' });
});