const noButton = document.getElementById("no-button");
const yesButton = document.getElementById("yesButton");
const counterDisplay = document.getElementById("failed-no-counter");
const counterValue = document.getElementById("count");
// Create audio element
const audio = new Audio("song.mp3");
audio.loop = true; // Loop the song

// Create mute/unmute button
const muteButton = document.createElement("button");
muteButton.id = "mute-button";
muteButton.textContent = "🔇"; // Default to mute icon
muteButton.style.display = "none"; // Hidden initially
muteButton.onclick = toggleMute;

document.body.appendChild(muteButton);

let songStarted = false; // Track if the song has started

let noMoveCount = 0;
let counterVisible = false; // Track if counter has been displayed

let currentScale = 1; // Track the current scale of the button
const minScale = 0.5; // Minimum size (50% of original)
const scaleFactor = 0.9; // How much it shrinks each time

// Ensure buttons start side by side
yesButton.style.position = "relative";
noButton.style.position = "relative";

// Function to move the "No" button smoothly and shrink it slightly
function moveNoButton() {
    const maxWidth = window.innerWidth - noButton.offsetWidth;
    const maxHeight = window.innerHeight - noButton.offsetHeight;

    let randomX = Math.random() * maxWidth;
    let randomY = Math.random() * maxHeight;

    // Ensure the button stays within bounds
    randomX = Math.max(10, Math.min(randomX, maxWidth - 10));
    randomY = Math.max(10, Math.min(randomY, maxHeight - 10));

    // Apply new position with a faster transition
    noButton.style.transition = "transform 0.2s ease-in-out"; // Faster transition
    noButton.style.transform = `translate(${randomX - noButton.offsetLeft}px, ${randomY - noButton.offsetTop}px) scale(${currentScale})`;

    // Shrink the button if it's not at the minimum scale yet
    if (currentScale > minScale) {
        currentScale *= scaleFactor;
        noButton.style.transform += ` scale(${currentScale})`;
    }

    noMoveCount++;
    counterValue.textContent = noMoveCount;
    
    if (!counterVisible) {
        counterDisplay.style.display = "block";
        counterVisible = true;
    }
    counterDisplay.classList.remove("pulse-animation"); // Remove class to restart animation
    void counterDisplay.offsetWidth; // Trigger reflow
    counterDisplay.classList.add("pulse-animation");
    if (noMoveCount === 1 && !songStarted) {
        audio.play().catch((error) => console.log("Autoplay blocked, user interaction needed"));
        muteButton.style.display = "block"; // Show mute button
        songStarted = true;
    }
}
// Toggle mute function
function toggleMute() {
    if (audio.muted) {
        audio.muted = false;
        muteButton.textContent = "🔊"; // Show unmute icon
    } else {
        audio.muted = true;
        muteButton.textContent = "🔇"; // Show mute icon
    }
}
// Debounce function to limit how often movement happens
let moveTimeout;
function debounceMove(event) {
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
        checkMouseProximity(event);
    }, 30); // Faster reaction time
}

// Detect mouse proximity to the "No" button
function checkMouseProximity(event) {
    const rect = noButton.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Calculate the distance between the mouse and the button
    const distance = Math.hypot(mouseX - (rect.left + rect.width / 2), mouseY - (rect.top + rect.height / 2));

    // If the mouse is too close, move the button and shrink it slightly
    if (distance < 100) {
        moveNoButton();
    }
}

// Attach the debounced event listener
document.addEventListener("mousemove", debounceMove);


// Function to handle button click behavior
function showMessage(response) {
    counterDisplay.style.display = "none"; // Hide counter
    if (response === "No") {
        document.getElementsByClassName("image")[0].src = "images/sadge.jpg";
        document.getElementById("question").textContent = "But.. But pls.. pretty pls ;-; (Also how'd you even manage to click the button)";
        document.getElementById("name").style.display = "none";
    }

    if (response === "Yes") {
        document.getElementById("name").remove();
        document.getElementById("no-button").remove();

        const yesMessage = document.getElementById("question");
        yesMessage.textContent = "YAYAYAYAYAY SEE YOU ON VALENTINES (We watch movie heheheh)";
        yesMessage.style.display = "block";
        yesMessage.style.fontStyle = "normal";
        document.getElementsByClassName("image")[0].src = "images/dance.gif";
        document.getElementById("yesButton").remove();

        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.id = "restart-button";
        restartButton.className = "buttons"; // Match existing buttons
        restartButton.onclick = () => location.reload();

        // Append restart button
        document.querySelector(".buttons").appendChild(restartButton);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        const elements = document.querySelectorAll(".hh, .pp");
        elements.forEach(el => {
            el.style.opacity = "1";
        });
    }, 300); // Small delay makes the appearance feel more organic
});
