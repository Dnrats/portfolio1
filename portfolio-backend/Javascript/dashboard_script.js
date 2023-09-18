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
  messageItem.innerHTML = `<strong>${date}:</strong> ${message}`;
  messageList.appendChild(messageItem);
}

function displayMessage(message, date) {
    const messageItem = document.createElement('div');
    messageItem.innerHTML = `<strong>${date}:</strong> ${message}`;
    
    // Add margin to create separation between message items
    messageItem.style.marginBottom = '10px'; // Adjust the value as needed
    
    messageList.appendChild(messageItem);
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
  
  // Call the function when the dashboard page loads
  window.addEventListener('load', () => {
    displayMessagesOnLogin();
  });

  