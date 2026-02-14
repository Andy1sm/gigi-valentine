const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
const loveLetter = document.getElementById("loveLetter");
const letterText = document.getElementById("letterText");
const scoreDisplay = document.getElementById("score");
const valentineQuestion = document.getElementById("valentineQuestion");
const buttons = document.getElementById("valentineButtons");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

let playerPosition = 175;
let score = 0;
let gameWon = false;

/* PLAYER MOVEMENT */
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && playerPosition > 0) {
        playerPosition -= 20;
    }

    if (event.key === "ArrowRight" && playerPosition < 350) {
        playerPosition += 20;
    }

    player.style.left = playerPosition + "px";
});

/* CREATE HEARTS */
function createHeart() {
    if (gameWon) return;

    const heart = document.createElement("div");
    heart.classList.add("heart");

    heart.style.left = Math.random() * 370 + "px";
    heart.style.top = "0px";

    gameArea.appendChild(heart);

    let heartFall = setInterval(() => {
        let currentTop = parseInt(heart.style.top);
        heart.style.top = currentTop + 5 + "px";

        if (
            currentTop > 440 &&
            parseInt(heart.style.left) > playerPosition - 30 &&
            parseInt(heart.style.left) < playerPosition + 50
        ) {
            score++;
            scoreDisplay.textContent = score;
            heart.remove();
            clearInterval(heartFall);

            if (score >= 10 && !gameWon) {
                winGame();
            }
        }

        if (currentTop > 500) {
            heart.remove();
            clearInterval(heartFall);
        }
    }, 20);
}

let heartSpawner = setInterval(createHeart, 1000);

/* WIN FUNCTION */
function winGame() {
    gameWon = true;
    clearInterval(heartSpawner);
    document.getElementById("game").style.display = "none";
    loveLetter.style.display = "flex";
setTimeout(() => {
    loveLetter.style.opacity = "1";
}, 10);


    let message =
        "We haven't met in person yet...\n\n" +
        "But somehow, you've become one of my favorite people.\n\n" +
        "From Minecraft worlds...\n" +
        "To Roblox expeditions...\n" +
        "To the calls that mean more than you know.\n\n" +
        "These 3 months have been something special 💕\n\n" +
        "I love you so so so so much";

    let index = 0;
    letterText.textContent = "";

    function typeWriter() {
        if (index < message.length) {
            letterText.textContent += message.charAt(index);
            index++;
            setTimeout(typeWriter, 40);
        } else {
            valentineQuestion.style.display = "block";
            buttons.style.display = "block";
        }
    }

    typeWriter();
}

/* NO BUTTON ESCAPE */
noBtn.addEventListener("mouseover", function() {
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});

/* YES BUTTON FINAL SCREEN */
yesBtn.addEventListener("click", function() {
    loveLetter.innerHTML = `
        <h1>YOU JUST MADE ME THE HAPPIEST GUY ALIVE 💖</h1>
        <p>I can't wait to keep building our world together.</p>
    `;
});
