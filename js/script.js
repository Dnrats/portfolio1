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
     popup.style.display = 'block';
     document.body.style.overflow = 'hidden'; // Disable scrolling
 }
 
 // Function to close the popup
 function closePopup() {
     overlay.style.display = 'none';
     popup.style.display = 'none';
     document.body.style.overflow = 'auto'; // Enable scrolling
 }
 
 // Event listeners
 openPopupButton.addEventListener('click', openPopup);
 closePopupButton.addEventListener('click', closePopup);
 overlay.addEventListener('click', closePopup)