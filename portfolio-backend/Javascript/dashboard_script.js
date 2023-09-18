const messageInput = document.getElementById('message');
const dateInput = document.getElementById('messageDate');
const postButton = document.getElementById('postButton');
const messageList = document.getElementById('messageList');

postButton.addEventListener('click', () => {
  const message = messageInput.value;
  const date = dateInput.value; // Get the selected date

  // Send the message and date to your backend for storage (explained in the next section)
  // After successful storage, you can add the message to the messageList.

  // Example: Add the message immediately to the list
  displayMessage(message, date);

  // Clear the input fields
  messageInput.value = '';
  dateInput.value = '';
});


function displayMessage(message, date) {
  const messageItem = document.createElement('div');
  messageItem.innerHTML = `
      <div class="message-text"><strong>${date}:</strong> ${message}</div>
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>
  `;   // Add margin to create separation between message items
  messageItem.style.marginBottom = '10px'; // Adjust the value as needed

  messageList.appendChild(messageItem);
}

// Attach event listeners for Edit and Delete buttons
messageList.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-button')) {
      // Handle Edit button click
      // Implement logic to edit the message here
      console.log('Edit button clicked');
  }

  if (e.target.classList.contains('delete-button')) {
      // Handle Delete button click
      // Implement logic to delete the message here
      console.log('Delete button clicked');
  }
});

// Function to fetch and display messages from your backend
function displayMessagesOnLogin() {
  // Make an API request to fetch messages from your backend
  fetch('/api/messages')
      .then((response) => response.json())
      .then((data) => {
          // Loop through the messages and display them
          data.forEach((message) => {
              displayMessage(message.message, message.date);
          });
      })
      .catch((error) => {
          console.error('Error fetching messages:', error);
      });
}
  // Initialize Firebase (make sure you've already initialized Firebase in your project)
// Example configuration (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyDUIWMxD4-eCIIHmy3dd69em_Y9zY3d07w",
    authDomain: "news-feed-dnrats.firebaseapp.com",
    projectId: "news-feed-dnrats",
    storageBucket: "news-feed-dnrats.appspot.com",
    messagingSenderId: "952351869432",
    appId: "1:952351869432:web:555aa2ca453b333a93ee0d",
    measurementId: "G-XVJN4511D3"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the Firebase Authentication object
  const auth = firebase.auth();
  
// Add an event listener to the logout button
const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        // User is now logged out
        // You can redirect them to a login page or perform any other necessary actions
        console.log('User logged out');
    }).catch((error) => {
        // An error occurred during the logout process
        console.error('Logout error:', error);
    });
});

