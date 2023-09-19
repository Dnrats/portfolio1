const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + './portfolio1/index.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Replace with your authentication logic (e.g., check against a database)
    if (username === 'admin' && password === 'password') {
        req.session.adminLoggedIn = true;
        res.redirect('/admin-dashboard');
    } else {
        res.send('Invalid username or password');
    }
});

app.get('/admin-dashboard', (req, res) => {
    if (req.session.adminLoggedIn) {
        res.send('Welcome to the admin dashboard!');
    } else {
        res.redirect('/');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
