const showTextButton = document.getElementById('showTextButton');
const textElements = document.querySelectorAll('.text-container p');

// Add a click event listener to the button
showTextButton.addEventListener('click', () => {
    // Loop through and toggle the "hidden" class for each text element
    textElements.forEach((textElement) => {
        textElement.classList.toggle('hidden');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const showTextButton = document.getElementById("showTextButton");
    const textContainer = document.querySelector(".text-container");

    // Add a click event listener to the button
    showTextButton.addEventListener("click", function () {
        // Toggle the 'active' class on the text container to show/hide it
        textContainer.classList.toggle("active");
    });
});