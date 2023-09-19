// In your HTML or JavaScript file
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDUIWMxD4-eCIIHmy3dd69em_Y9zY3d07w",
    authDomain: "news-feed-dnrats.firebaseapp.com",
    projectId: "news-feed-dnrats",
    storageBucket: "news-feed-dnrats.appspot.com",
    messagingSenderId: "952351869432",
    appId: "1:952351869432:web:555aa2ca453b333a93ee0d",
    measurementId: "G-XVJN4511D3"
  };

// Initialize Firebase (replace with your initialization code)
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User successfully signed in
            const user = userCredential.user;
            console.log('User logged in:', user);
            // Redirect to the dashboard or another page as needed
        })
        .catch((error) => {
            // Handle errors, such as invalid credentials
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Authentication error:', errorCode, errorMessage);
        });
});
