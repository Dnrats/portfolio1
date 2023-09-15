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
const icons = ["html5-icon.svg", "css3-icon.svg"]; // Add your icon file paths here

toggleButton.addEventListener('click', () => {
    if (crawlerContainer.style.display === 'none') {
        // Show the crawler
        toggleButton.textContent = 'Hide Crawler';
        crawlerContainer.style.display = 'block';

        // Function to add and animate icons progressively
        function addAndAnimateIcons() {
            let iconIndex = 0;
            const totalIcons = icons.length;
            const iconAnimationDuration = 4; // Adjust animation duration as needed (in seconds)

            function addNextIcon() {
                if (iconIndex < totalIcons) {
                    const iconPath = icons[iconIndex];
                    const icon = document.createElement('div');
                    icon.className = 'icon';
                    const img = document.createElement('img');
                    img.src = iconPath;
                    img.alt = 'Icon';
                    icon.appendChild(img);
                    crawlerContainer.appendChild(icon);
                    
                    // Animate the icon (fade in and move left)
                    icon.style.animation = `moveIcon ${iconAnimationDuration}s linear, fadeIn ${iconAnimationDuration / 2}s ease-in`;
                    
                    iconIndex++;
                    setTimeout(addNextIcon, (iconAnimationDuration / 2) * 1000);
                }
            }

            addNextIcon();
        }

        addAndAnimateIcons();
    } else {
        // Hide the crawler
        toggleButton.textContent = 'Show Crawler';
        crawlerContainer.style.display = 'none';
        while (crawlerContainer.firstChild) {
            crawlerContainer.removeChild(crawlerContainer.firstChild);
        }
    }
});