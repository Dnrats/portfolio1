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


//  ICONS CRAWLER


document.addEventListener("DOMContentLoaded", function() {
  const crawlerContainer = document.querySelector(".crawler-container");
  const toggleButton = document.getElementById("toggleButton");

  // Initial state: crawler is hidden
  let crawlerVisible = false;

  // Function to toggle the visibility of the crawler
  function toggleCrawler() {
      if (crawlerVisible) {
          crawlerContainer.style.display = "none";
          toggleButton.textContent = "Show";
      } else {
          crawlerContainer.style.display = "block";
          toggleButton.textContent = "Hide";
      }
      crawlerVisible = !crawlerVisible;
  }

  // Add click event listener to the toggle button
  toggleButton.addEventListener("click", toggleCrawler);
});