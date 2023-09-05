const button = document.getElementById("details");
const button2 = document.getElementById("back-button");


const image = document.querySelector('.fa-image');
const modalOpened = document.querySelector('.modal-container');

image.addEventListener('click', showImage);
button.addEventListener('click', flipCard);
button2.addEventListener('click', flipCard);

function flipCard() {
    card.classList.toggle("flipCard")
}

function showImage() {
  modalOpened.style.display = "flex";
  body.style.opacity = "0.8";
}
function closeImage() {
    modalOpened.style.display = "none"
}