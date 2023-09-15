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


const toggleButton = document.getElementById('toggleCrawler');
const crawlerContainer = document.getElementById('crawlerContainer');

toggleButton.addEventListener('click', () => {
    if (crawlerContainer.style.display === 'none') {
        // Show the crawler
        toggleButton.textContent = 'Hide Crawler';
        crawlerContainer.style.display = 'block';
        
        // Function to add icons progressively
        function addIcon() {
            const icon = document.createElement('div');
            icon.className = 'icon';
            icon.innerHTML = '⭐'; // You can use any icon here
            crawlerContainer.appendChild(icon);
            
            // Remove the first icon when it goes out of the container
            if (crawlerContainer.children.length > 5) {
                crawlerContainer.removeChild(crawlerContainer.children[0]);
            }
        }

        // Add icons progressively every 2 seconds
        const iconInterval = setInterval(addIcon, 2000);

        // Stop adding icons after a certain time (e.g., 30 seconds)
        setTimeout(() => {
            clearInterval(iconInterval);
        }, 30000);
    } else {
        // Hide the crawler
        toggleButton.textContent = 'Show Crawler';
        crawlerContainer.style.display = 'none';
    }
});