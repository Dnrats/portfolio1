let buttons = document.querySelectorAll('.buttons')
buttons.forEach(button => {
   button.addEventListener('click', flipCard);
 });
function flipCard() {
   card.classList.toggle('flipCard')
}
function flipCard(button) {
   // Find the parent card element of the clicked button
   const card = button.closest('.card');
   
   // Toggle the 'flipCard' class for the specific card
   card.classList.toggle('flipCard');
 }


 // Get all the image icons
 const imageIcons = document.querySelectorAll('.fa-regular.fa-image');

 // Get the popup container and content
 const popupContainer = document.getElementById('popup-container');
 const popupContent = document.getElementById('popup-content');
 const screenshot = document.getElementById('screenshot');
 const closePopup = document.getElementById('close-popup');

 // Add click event listeners to each image icon
 imageIcons.forEach((icon, index) => {
   icon.addEventListener('click', () => {
     // Load the screenshot for the clicked card (you'll need to adjust the image source here)
     const screenshotSrc = 'path_to_screenshot_' + index + '.jpg';
     screenshot.setAttribute('src', screenshotSrc);

     // Show the popup
     popupContainer.style.display = 'flex';
   });
 });

 // Add click event listener to close the popup
 closePopup.addEventListener('click', () => {
   // Hide the popup
   popupContainer.style.display = 'none';
 });