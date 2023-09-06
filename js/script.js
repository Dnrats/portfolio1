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


 const openPopupButton = document.getElementById('open-popup');
 const closePopupButton = document.getElementById('close-popup');
 const overlay = document.getElementById('overlay');
 const popup = document.getElementById('popup');
 
 // Function to open the popup
 function openPopup() {
   overlay.style.display = 'block';

   // Add the "show" class to trigger the transition animation
   popup.classList.add('show');

   document.body.style.overflow = 'hidden'; // Disable scrolling
}
 
 // Function to close the popup
 function closePopup() {
   overlay.style.display = 'none';
   
   // Remove the "show" class to trigger the fade-out animation
   popup.classList.remove('show');
   
   document.body.style.overflow = 'auto'; // Enable scrolling
}
 
 // Event listeners
 openPopupButton.addEventListener('click', openPopup);
 closePopupButton.addEventListener('click', closePopup);
 overlay.addEventListener('click', closePopup)