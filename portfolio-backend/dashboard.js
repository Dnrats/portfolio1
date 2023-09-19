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
            // Message posted successfully, update the message list or take necessary actions
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
  });
  