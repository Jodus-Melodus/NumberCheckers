let usedNumbers = [];
let playerNames = [];
let turnIndex = 0;
const duration = 20000;
let startTime;
let timer;
let interval;

function gameOver(msg) {
    updatePlayerTurn();
    alert(`Game Over!\n${msg}\n'${playerNames[turnIndex]}' wins!`);
    clearTimeout(timer);
    clearInterval(interval);
}

function timerCallback() {
    gameOver("Your time ran out!");
}

function getTimeRemaining() {
    const currentTime = Date.now();
    return Math.max(0, startTime + duration - currentTime);
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function stackDivs() {
    const divs = document.querySelectorAll('.card');
    divs.forEach((div, index) => {
        div.style.zIndex = index;
    });
}

function newCard(value) {
    const deck = document.getElementById("deck");
    const rotationAngle = getRandomInRange(-35, 35);
    const card = document.createElement("div");
    card.className = "card";
    card.style.transform = `rotate(${rotationAngle}deg)`;

    card.appendChild(document.createTextNode(value));
    deck.appendChild(card);
    stackDivs();
}

function submit() {
    const value = parseInt(document.getElementById("number").value);

    if (usedNumbers.includes(value)) {
        gameOver("Game Over!\nThis number has already been entered.");
        return;
    }
    if (value % 2 !== 0) {
        gameOver("Game Over!\nThe number is supposed to be an even number.");
        return;
    }

    usedNumbers.push(value);
    newCard(value);
    restartTimer();
    updatePlayerTurn();
    document.getElementById("number").value = "";
}

function newplayer() {
    const playerNameComponent = document.getElementById("playername");
    const playersComponent = document.getElementById("joinedplayernames");
    const playername = playerNameComponent.value;

    if (playername && !playerNames.includes(playername)) {
        playerNames.push(playername);
        const newPlayerName = document.createElement("li");
        newPlayerName.appendChild(document.createTextNode(playername));
        playersComponent.appendChild(newPlayerName);
    } else if (playerNames.includes(playername)) {
        alert(`'${playername}' is already in use.`);
    }
    playerNameComponent.value = "";
}

function updatePlayerTurn() {
    document.getElementById("player-turn").innerHTML = `Turn: -${playerNames[turnIndex]}-`;
    turnIndex = (turnIndex + 1) % playerNames.length;
}

function gotoGameWindow() {
    localStorage.setItem("playerNames", JSON.stringify(playerNames));
    window.location.href = "game.html";
}

function restartTimer() {
    clearInterval(timer);
    startTime = Date.now();
}

function startGame() {
    playerNames = JSON.parse(localStorage.getItem("playerNames"));
    updatePlayerTurn();

    document.getElementById("number").addEventListener("keydown", event => {
        if (event.key === "Enter") {
            submit();
        }
    });

    startTime = Date.now();
    restartTimer();

    interval = window.setInterval(() => {
        document.getElementById("time-remaining").innerHTML = Math.trunc(getTimeRemaining() / 1000);
    }, 1000);
}

document.getElementById("playername").addEventListener("keydown", event => {
    if (event.key === "Enter") {
        newplayer();
    }
});
