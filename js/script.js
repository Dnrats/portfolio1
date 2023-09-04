const button = document.getElementById("details");
const button2 = document.getElementById("back-button");
button.addEventListener('click', flipCard);
button2.addEventListener('click', flipCard)
function flipCard() {
    card.classList.toggle("flipCard")
}