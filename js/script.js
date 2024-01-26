const swiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
     rotate: 50, // Set rotation angle
     stretch: 0, // Set how much to stretch the slide
     depth: 100, // Set depth of the effect (higher value = more pronounced effect)
     modifier: 1, // Set modifier of the effect
     slideShadows: true, // Enable slide shadows
  },
  pagination: {
     el: '.swiper-pagination',
     clickable: true,
  },
});

// CHAT WIDGET


document.addEventListener('DOMContentLoaded', () => {
  const messageContainer = document.querySelector('.message-container');
  const messageContent = document.getElementById('messageContent');
  const minimizeMessagesButton = document.getElementById('minimizeMessagesButton');
  const headerH3 = document.querySelector('.message-header h3'); 

  let isMinimized = false;

  // Function to toggle minimize/maximize the message container
  function toggleMessageContainer() {
    isMinimized = !isMinimized;

    if (isMinimized) {
      messageContent.style.opacity = '0';

      messageContainer.style.height = '40px';
      messageContainer.style.width = '250px';
    } else {
      messageContent.style.opacity = '1';

      messageContainer.style.height = '20%';
      messageContainer.style.width = '20%';
    }
  }

  toggleMessageContainer();

  // Function to make the message container draggable
  let isDragging = false;
  let offsetX, offsetY;

  messageContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - messageContainer.getBoundingClientRect().left;
    offsetY = e.clientY - messageContainer.getBoundingClientRect().top;

     // Disable text selection during drag
  document.body.style.userSelect = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const containerWidth = messageContainer.offsetWidth;
    const containerHeight = messageContainer.offsetHeight;

    const maxX = viewportWidth - containerWidth;
    const maxY = viewportHeight - containerHeight;

    const clampedX = Math.min(Math.max(e.clientX - offsetX, 0), maxX);
    const clampedY = Math.min(Math.max(e.clientY - offsetY, 0), maxY);

    messageContainer.style.top = clampedY + 'px';
    messageContainer.style.left = clampedX + 'px';
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Add a click event listener to the minimize button
  minimizeMessagesButton.addEventListener('click', toggleMessageContainer);
});

// FETCHING MESSAGES
// Allow requests from your frontend domain

const messagesEndpoint = 'https://dnrats.com/get-messages'; // Update with your actual URL

fetch(messagesEndpoint)
  .then(response => response.json())
  .then(messages => {
    // Get a reference to the message content div
    const messageContentDiv = document.getElementById('messageContent');

    // Loop through the fetched messages and create message elements
    messages.forEach(message => {
      // Create a message element
      const messageElement = document.createElement('div');
      messageElement.classList.add('message-item'); // You can style this class in your CSS

      // Create message content elements
      const messageText = document.createElement('p');
      messageText.textContent = message.text;

      const messageDate = document.createElement('p');
      messageDate.textContent = message.date;

      // Append message content elements to the message element
      messageElement.appendChild(messageText);
      messageElement.appendChild(messageDate);

      // Append the message element to the message content div
      messageContentDiv.appendChild(messageElement);
    });
  })
  .catch(error => {
    console.error('Error fetching messages:', error);
  });