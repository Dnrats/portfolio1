let buttons = document.querySelectorAll('.buttons')
buttons.forEach(button => {
   button.addEventListener('click', flipCard);
 });
function flipCard(button) {
   // Find the parent card element of the clicked button
   const card = button.closest('.card');
   
   // Toggle the 'flipCard' class for the specific card
   card.classList.toggle('flipCard');
 }


 const imageSources = [
   './assets/Happy-Health1.png',
   './assets/Contact-form.png',
   './assets/Marvel-screenshot.png',
   './assets/jeu-batons.png',
   'path_to_screenshot_5.jpg',
   'path_to_screenshot_6.jpg',
   'path_to_screenshot_7.jpg',
   'path_to_screenshot_8.jpg',
   './assets/Sabor-del-mundo.png',
 ];

 const imageIcons = document.querySelectorAll('.card .fa-regular.fa-image');

 // Get the popup container and content
 const popupContainer = document.getElementById('popup-container');
 const popupContent = document.getElementById('popup-content');
 const screenshot = document.getElementById('screenshot');
 const closePopup = document.getElementById('close-popup');
 
 // Add click event listeners to each image icon
 imageIcons.forEach((icon, index) => {
   icon.addEventListener('click', () => {
     // Get the data-target value to identify the specific popup
     const target = icon.getAttribute('data-target');
 
     // Get the index of the target
     const targetIndex = parseInt(target) - 1; // Subtract 1 to account for zero-based index
 
     // Load the screenshot for the clicked card
     const screenshotSrc = imageSources[targetIndex];
     screenshot.setAttribute('src', screenshotSrc);
 
     // Add the "active" class to trigger the animation
     popupContainer.classList.add('active');
   });
 });
 
 // Add click event listener to close the popup
 closePopup.addEventListener('click', () => {
   // Remove the "active" class to hide the popup with animation
   popupContainer.classList.remove('active');
 });


//  ICONS CONTAINER

const toggleButton = document.getElementById('toggleButton');
    const hiddenDiv = document.getElementById('hiddenDiv');

    let isHidden = true;

    toggleButton.addEventListener('click', () => {
        isHidden = !isHidden;
        hiddenDiv.style.display = isHidden ? 'none' : 'block';
        toggleButton.textContent = isHidden ? 'Show' : 'Hide';
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
      headerH3.style.display = 'none';
      messageContainer.style.height = '40px';
      messageContainer.style.width = '40px';
    } else {
      messageContent.style.opacity = '1';
       headerH3.style.display = 'block';
      messageContainer.style.height = '20%';
      messageContainer.style.width = '20%';
    }
  }

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
