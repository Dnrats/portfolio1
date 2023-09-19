import firebaseAdmin from './Javascript/firebaseConfig.cjs';


// Now you can use Firebase Admin functions
const auth = firebaseAdmin.auth();
const firestore = firebaseAdmin.firestore();
// The rest of your code here


// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firebase (use initializeApp function)
const firebaseApp = firebase.initializeApp(firebaseConfig);



const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/Css', express.static(path.join(__dirname, 'Css'), { 'extensions': ['css'] }));

// Serve 'dashboard.html' and 'login.html' directly
app.get('/dashboard', (req, res) => {
  const dashboardPath = path.join(__dirname, 'dashboard.html');
  res.sendFile(dashboardPath);
});


app.get('/login', (req, res) => {
  const loginPath = path.join(__dirname, '/login.html');
  res.sendFile(loginPath);
});



app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Use Firebase Authentication to verify the user's login
    const user = await firebase.auth().signInWithEmailAndPassword(username, password);

    // If authentication succeeds, generate a token and send it to the client
    const token = await generateToken(user);

    // Respond with the token or an authentication success message
    res.status(200).json({ message: 'Authentication succeeded', token });
  } catch (error) {
    // If authentication fails, respond with an error message
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
});



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

// Remove the following line, as we're serving the index.html from the 'portfolio1' folder
// app.get('/', (req, res) => {
//   const indexPath = path.join(__dirname, '../index.html');
//   res.sendFile(indexPath);
// });

// ... Other routes for your application ...

// Example route to post a message with a date
app.post('/api/messages', authenticateAdmin, (req, res) => {
  const { message, date } = req.body;

  // Store the message and date in your data structure or database

  // Respond with a success status
  res.status(201).json({ message: 'Message posted successfully' });
});
