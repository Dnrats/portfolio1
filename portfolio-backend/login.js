document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('admin-login-form');
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Send a POST request to the server for authentication
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Redirect to the admin dashboard or perform necessary actions
            window.location.href = '/dashboard';
          } else {
            // Display an error message to the user
            alert('Authentication failed. Please check your username and password.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  });
  