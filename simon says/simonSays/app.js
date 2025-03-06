let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "purple"];

let highestScore = 0;
let score = document.querySelector(".score");

let started = false;
let level = 0;

let keyToStart = document.querySelector(".keyToStart");

//chatbot message container
let chatBox = document.createElement("div");
chatBox.classList.add("chat-box");
document.body.appendChild(chatBox);

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    keyToStart.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameflash(randBtn);

    chatbotFeedback(`Level ${level}! Keep going!`);
}

function checkAns(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        keyToStart.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to restart`;
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 130);
        
        chatbotFeedback(getRandomFailureMessage());
        resetGame();
    }
}

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
    console.log(userSeq);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    if (highestScore < level) {
        highestScore = level;
        score.innerText = `Highest Score: ${highestScore}`;
    }
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

// Chatbot Feedback System
function chatbotFeedback(message) {
    chatBox.innerText = message;
    chatBox.classList.add("show");
    setTimeout(() => {
        chatBox.classList.remove("show");
    }, 2000);
}

// Generate random funny failure messages
function getRandomFailureMessage() {
    let messages = [
        "Oops! Did your brain take a coffee break? ☕",
        "Nice try! Maybe try following the lights next time? 💡",
        "You had one job... 😆",
        "Simon says... GAME OVER! 😜",
        "Better luck next time, champ! 🏆"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}
