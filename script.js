let usedNumbers = [];
let playerNames = [];
let TurnIndex = 0;
const duration = 20000;
let startTime;
let timer;

function gameOver(msg) {
    updatePlayerTurn();
    alert(msg + "\n'" + playerNames[TurnIndex] + "' wins!");
    clearTimeout(timer);
}

function timerCallback() {
    gameOver("Your time ran out!")
}

function getTimeRemaining() {
    const currentTime = Date.now();
    return Math.max(0, startTime + duration - currentTime);
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function stackDivs() {
    var divs = document.querySelectorAll('.card');

    divs.forEach(function (div, index) {
        div.style.zIndex = index;
    });
}

function newCard(value) {
    var deck = document.getElementById("deck");
    var rotationAngle = getRandomInRange(-35, 35);
    var card = document.createElement("div");
    card.className = "card";
    card.style.transform = "rotate(" + rotationAngle + "deg)";

    card.appendChild(document.createTextNode(value));
    deck.appendChild(card);
    stackDivs();
}

function submit() {
    var value = parseInt(document.getElementById("number").value);

    if (usedNumbers.includes(value)) {
        gameOver("Game Over!\nThis number has already been entered.");
    }
    else if (value % 2 == 0) {
        usedNumbers.push(value);
        newCard(value);
    }
    else {
        gameOver("Game Over!\nThe number is supposed to be an even number.")
    }
    updatePlayerTurn();
    document.getElementById("number").value = "";
}

function newplayer() {
    var playerNameComponent = document.getElementById("playername");
    var playersComponent = document.getElementById("joinedplayernames");
    var playername = playerNameComponent.value;

    if (playername != "") {

        if (playerNames.includes(playername)) {
            alert("That player's name is already in use.");
            return;
        } else {
            playerNames.push(playername);

            var newPlayerName = document.createElement("li");
            newPlayerName.appendChild(document.createTextNode(playername));
            playersComponent.appendChild(newPlayerName);
        }
    }
    playerNameComponent.value = "";
}

function updatePlayerTurn() {
    document.getElementById("player-turn").innerHTML = "Turn: -" + playerNames[TurnIndex] + "-";
    TurnIndex = (TurnIndex + 1) % playerNames.length;
}

function gotoGameWindow() {
    localStorage.setItem("playerNames", JSON.stringify(playerNames));
    window.location.href = "game.html";
};

function startGame() {
    playerNames = JSON.parse(localStorage.getItem("playerNames"));
    updatePlayerTurn();

    document.getElementById("number").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            submit();
        }
    });

    startTime = Date.now();
    timer = setTimeout(timerCallback, duration);

    const interval = setInterval(() => {
        console.log("Time remaining: " + getTimeRemaining() + " milliseconds");
    }, 1000);

};

document.getElementById("playername").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        newplayer();
    }
});