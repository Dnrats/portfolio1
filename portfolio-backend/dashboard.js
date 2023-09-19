document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    const messageDate = document.getElementById('messageDate');
    const messageTextarea = document.getElementById('message');
    const postButton = document.getElementById('postButton');
    const messageList = document.getElementById('messageList');
  
    // Logout Button Click Event
    logoutButton.addEventListener('click', () => {
      // Perform a logout action (e.g., clearing session) and redirect to the login page
      window.location.href = '/logout';
    });
  
    // Post Button Click Event
    postButton.addEventListener('click', () => {
      const date = messageDate.value;
      const message = messageTextarea.value;
  
      // Send a POST request to the server to post the message
      fetch('/post-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Message posted successfully, update the message list
            updateMessageList();
          } else {
            // Display an error message to the user
            alert('Failed to post the message. Please try again.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  
    // Function to update the message list (fetch and display messages)
    function updateMessageList() {
      // Send a GET request to the server to fetch the list of messages
      fetch('/get-messages')
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Clear the message list
            messageList.innerHTML = '';
  
            // Iterate through the messages and add them to the list
            data.messages.forEach((message) => {
              const messageItem = document.createElement('div');
              messageItem.textContent = `${message.date}: ${message.text}`;
  
              const editButton = document.createElement('button');
              editButton.textContent = 'Edit';
  
              // Edit Button Click Event
              editButton.addEventListener('click', () => {
                // Retrieve the message ID from the data attribute
                const messageId = messageItem.getAttribute('data-message-id');
  
                // Open an edit form/modal with the message ID for editing
                openEditForm(messageId);
              });
  
              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'Delete';
  
              // Delete Button Click Event
              deleteButton.addEventListener('click', () => {
                // Retrieve the message ID from the data attribute
                const messageId = messageItem.getAttribute('data-message-id');
  
                // Ask for confirmation and delete the message if confirmed
                const confirmDelete = window.confirm('Are you sure you want to delete this message?');
                if (confirmDelete) {
                  deleteMessage(messageId);
                }
              });
  
              // Set the data-message-id attribute with the message ID
              messageItem.setAttribute('data-message-id', message.id);
  
              messageItem.appendChild(editButton);
              messageItem.appendChild(deleteButton);
  
              messageList.appendChild(messageItem);
            });
          } else {
            // Display an error message or take necessary actions
            console.error('Failed to fetch messages:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  
    // Initial load: fetch and display messages
    updateMessageList();
  
    // Function to open an edit form/modal with the given message ID
    function openEditForm(messageId) {
      // Implement your logic to open an edit form/modal here
      // You can use the messageId to fetch message details from the server
      // and populate the form fields for editing
      console.log(`Editing message with ID: ${messageId}`);
    }
  
    // Function to delete a message with the given message ID
    function deleteMessage(messageId) {
      // Implement your logic to confirm and delete the message here
      // You can use the messageId to send a DELETE request to the server
      // to delete the message
      console.log(`Deleting message with ID: ${messageId}`);
    }
  });
  