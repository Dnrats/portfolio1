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
            // Clear the message input
            messageTextarea.value = '';
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
  
              // Set the data-message-id attribute with the message ID
              messageItem.setAttribute('data-message-id', message.id);
  
              // Append Edit and Delete buttons to messageItem
              const editButton = document.createElement('button');
              editButton.textContent = 'Edit';
  
              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'Delete';
  
              // Edit Button Click Event
              editButton.addEventListener('click', () => {
                // Retrieve the message ID from the data attribute
                const messageId = messageItem.getAttribute('data-message-id');
  
                // Open an edit form/modal with the message ID for editing
                openEditForm(messageId);
              });
  
             // Delete Button Click Event
deleteButton.addEventListener('click', () => {
    // Retrieve the message ID from the data attribute
    const messageId = messageItem.getAttribute('data-message-id');
  
    // Ask for confirmation and delete the message if confirmed
    const confirmDelete = window.confirm('Are you sure you want to delete this message?');
    if (confirmDelete) {
      // Send a DELETE request to the server to delete the message
      fetch(`/remove-message/${messageId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Remove the message from the DOM
            messageList.removeChild(messageItem);
          } else {
            // Handle the error, display a message, etc.
            console.error('Failed to delete the message:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  });
  
  
              // Append buttons to messageItem
              messageItem.appendChild(editButton);
              messageItem.appendChild(deleteButton);
  
              // Append messageItem to messageList
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
  
    // Function to open the edit modal with a specific message ID
    function openEditForm(messageId) {
      // Retrieve the message text from the message item
      const messageItem = document.querySelector(`[data-message-id="${messageId}"]`);
      const messageText = messageItem.textContent.split(': ')[1]; // Extract the message text
  
      // Set the message text in the edit modal
      const editModal = document.getElementById('editModal');
      const editMessageText = document.getElementById('editMessageText');
  
      // Save Edit Button Click Event
      document.getElementById('saveEditButton').addEventListener('click', () => {
        // Retrieve the edited message text
        const editedMessageText = editMessageText.value;
  
        // Retrieve the message ID from the button's data attribute
        const messageId = document.getElementById('saveEditButton').getAttribute('data-message-id');
  
        // Send a POST request to the server to save the edited message
        console.log('editedMessageText:', editedMessageText);
        fetch(`/edit-message/${messageId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newText: editedMessageText }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Close the edit modal
              editModal.style.display = 'none';
  
              // Update the message list
              updateMessageList();
            } else {
              // Handle the error, display a message, etc.
              console.error('Failed to save the edited message:', data.message);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
  
      editMessageText.value = messageText;
  
      // Show the edit modal
      editModal.style.display = 'block';
  
      // Save the message ID for reference when saving edits
      document.getElementById('saveEditButton').setAttribute('data-message-id', messageId);
    }
  
    // Close Button Click Event
    document.getElementById('closeEditModal').addEventListener('click', () => {
      // Hide the modal when Close button is clicked
      const editModal = document.getElementById('editModal');
      editModal.style.display = 'none';
    });
  
    // Function to delete a message with the given message ID
    function deleteMessage(messageId) {
      // Implement your logic to confirm and delete the message here
      // You can use the messageId to send a DELETE request to the server
      console.log(`Deleting message with ID: ${messageId}`);
    }
  });
  