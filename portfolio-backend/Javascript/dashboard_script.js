require('dotenv').config();
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');




const messageInput = document.getElementById('message');
const dateInput = document.getElementById('messageDate');
const postButton = document.getElementById('postButton');
const messageList = document.getElementById('messageList');

document.addEventListener('DOMContentLoaded', () => {
  // Your JavaScript code here
});

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
      openEditModal(e.target);
  }

  if (e.target.classList.contains('delete-button')) {
    // Handle Delete button click
    openDeleteModal(e.target);
}
});

// Function to open the Edit modal
function openEditModal(editButton) {
  const messageText = editButton.parentElement.querySelector('.message-text');
  const messageItem = editButton.parentElement;
  const modal = document.getElementById('editModal');
  const modalMessageInput = modal.querySelector('#editMessage');
  
  modalMessageInput.value = messageText.textContent;
  
  const saveButton = modal.querySelector('#saveEditButton');
  saveButton.addEventListener('click', () => {
      const newText = modalMessageInput.value;
      if (newText !== '') {
          messageText.textContent = newText;
          // Implement logic to update the edited message in your backend here
          closeEditModal();
      }
  });
  
  const cancelButton = modal.querySelector('#cancelEditButton');
  cancelButton.addEventListener('click', () => {
      closeEditModal();
  });
  
  modal.style.display = 'block';
}

// Function to open the Delete modal
function openDeleteModal(deleteButton) {
  const messageItem = deleteButton.parentElement;
  const modal = document.getElementById('deleteModal');
  
  const confirmButton = modal.querySelector('#confirmDeleteButton');
  confirmButton.addEventListener('click', () => {
      messageItem.remove();
      // Implement logic to delete the message from your backend here
      closeDeleteModal();
  });
  
  const cancelButton = modal.querySelector('#cancelDeleteButton');
  cancelButton.addEventListener('click', () => {
      closeDeleteModal();
  });
  
  modal.style.display = 'block';
}

// Function to close the Edit modal
function closeEditModal() {
  const modal = document.getElementById('editModal');
  modal.style.display = 'none';
}

// Function to close the Delete modal
function closeDeleteModal() {
  const modal = document.getElementById('deleteModal');
  modal.style.display = 'none';
}

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

window.addEventListener('load', () => {
  displayMessagesOnLogin();
});

// Initialize Firebase using environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


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

