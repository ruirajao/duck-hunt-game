const fieldContainer = document.getElementById('field-container');
const crosshairContainter = document.getElementById("crosshair");
const pistolShootContainer = document.getElementById('pistol-shoot');
const bodyContainer = document.body;

const bullet1Cover = document.querySelector(".bullet1-cover");
const bullet2Cover = document.querySelector(".bullet2-cover");
const bullet3Cover = document.querySelector(".bullet3-cover");

const bullet = new Audio("audio/gun-shot.mp3")

//let maxRounds = 5;
let roundsCounter = 1;

let maxWaves = 3;
let waveCounter = 1;
let ducksPerWave = 2;

let maxMissedDucksToGameover = 3;
let missedDucks = 0;
let bulletCounter = 3;

let isEnableShooting = false;
let isGameOver = false;
let isWaveFinished = false;
let isRoundFinished = false;
let waveTimeOut;

document.addEventListener('click', () => {
    if (isEnableShooting) {
        bulletCounter--;
        bullet.play();
    } if (bulletCounter === 2) {
        bullet1Cover.style.display = 'inline';
    } else if (bulletCounter === 1) {
        bullet1Cover.style.display, bullet2Cover.style.display = 'inline';
    } else if (bulletCounter === 0) {
        bullet1Cover.style.display, bullet2Cover.style.display, bullet3Cover.style.display = 'inline';
    }
    checkOutOfBulletsAndUpdate();
    checkDucksKilledsAndUpdate();
    refreshScore();
});

function play() {
    hideMainMenu();
    stopIntroAudio();
    startGame();
}

function startGame() {
    launchWalkoutAnimation();
    displayGameStartingTimer(3);
    displayRoundNumber(1);
    showBullets();
    setTimeout(() => startNewRound(), 4000);
}

function startNewRound() {
    (roundsCounter > 1) ? displayRoundNumber(roundsCounter) : "Let's go";
    //Automatically switch backgrounds for each round
    switch (roundsCounter) {
        case 1: bodyContainer.style.backgroundColor = 'lightskyblue;';
            break;
        case 2: bodyContainer.style.backgroundColor = 'lightgreen;';
            break;
        case 3: bodyContainer.style.backgroundColor = 'orange';
            break;
        case 4: bodyContainer.style.backgroundColor = 'rgb(192, 134, 9);';
            break;
        default: bodyContainer.style.backgroundColor = 'lightcoral';
            break;
    }
    setTimeout(() => startWaves(), 2000);
}

function startWaves() {
    isWaveFinished = false;
    bulletCounter = 3;
    showBullets();
    clearTimeout(roundsCounter);
    setCountdownToWaveEnd();
    enableShooting();
    updateWavesAndRounds();
    checkOutOfBulletsAndUpdate();
    checkDucksKilledsAndUpdate();
    displayWaveTimer(10);

    for (let i = 0; i < ducksPerWave; i++) {
        spawnDuck(roundsCounter);
    }
}

function finishWave() {
    clearTimeout(waveTimeOut);

    // Game over
    if (missedDucks >= maxMissedDucksToGameover) {
        disableShooting();
        deleteAllDucks();
        clearTimeout(waveTimeOut);
        showGameOver(totalDucksKilled * 500);
        return;
    }

    if (waveCounter === 3) {
        roundsCounter++;
        waveCounter = 1;
        startNewRound();
    } else {
        waveCounter++;
        startWaves();
    }
    updateWavesAndRounds();
    ducksKilledWave = 0;
}

function setCountdownToWaveEnd() {
    if (!isGameOver) {
        // Clears any previous timeouts
        clearTimeout(waveTimeOut);
        let timeToWaveEnd = 10000;

        waveTimeOut = setTimeout(function () {
            if (!isWaveFinished) {
                isWaveFinished = true;
                deleteAllDucks();
                finishWave();
            }
        }, timeToWaveEnd);
    }
}

function checkOutOfBulletsAndUpdate() {
    if (bulletCounter <= 0 && ducksKilledWave < 2 && !isWaveFinished) {
        disableShooting();
        isWaveFinished = true;
        clearTimeout(waveTimeOut);
        deleteAllDucks();
        setTimeout(finishWave, 1500);
    }
}

function checkDucksKilledsAndUpdate() {
    if (ducksKilledWave === 2 && !isWaveFinished) {
        disableShooting();
        isWaveFinished = true;
        ducksKilledWave = 0;
        clearTimeout(waveTimeOut);
        setTimeout(finishWave, 1500);
    }
}

//GAME STARTING TIMER
let gameStartingEndTimer;
function displayGameStartingTimer(seconds) {
    // Calculate the target end time
    gameStartingEndTimer = Date.now() + (seconds * 1000);

    const gameTimerContainer = document.getElementById('game-starting-timer');
    const timerElement = document.createElement('div');
    timerElement.setAttribute('id', 'timer');
    timerElement.style.fontFamily = "PixelFont";
    timerElement.style.fontSize = "400%";
    gameTimerContainer.appendChild(timerElement);

    // Updates the timer element every 1000ms
    const updateTimer = () => {
        const currentTime = Date.now();
        const timeLeft = Math.ceil((gameStartingEndTimer - currentTime) / 1000);

        if (timeLeft > 0) {
            timerElement.textContent = `${timeLeft}`;
            setTimeout(updateTimer, 1000);
        } else {
            timerElement.textContent = 'QUACK TIME!';
            setTimeout(() => timerElement.remove(), 1000);
        }
    };
    // Initiliaze timer
    updateTimer();
}

//WAVE TIMER DISPLAYER
let waveEndTimer;
const waveTimeContainer = document.getElementById('wave-time-left');
const timerElement = document.createElement('div');
waveTimeContainer.appendChild(timerElement);
timerElement.setAttribute('id', 'waveTimer');
function displayWaveTimer(seconds) {
    waveEndTimer = Date.now() + (seconds * 1000);
    const updateTimer = () => {
        const currentTime = Date.now();
        const timeLeft = Math.ceil((waveEndTimer - currentTime) / 1000);
        if (timeLeft > 0) {
            timerElement.textContent = `TIMER: ${timeLeft}`;
            setTimeout(updateTimer, 1000);
        } else {
            timerElement.textContent = "TIME'S UP!";
            setTimeout(() => timerElement.remove(), 1000);
        }
    };
    updateTimer();
}

function displayRoundNumber(roundCounter) {
    roundNumberContainer = document.getElementById('round-number-display');
    roundElement = document.createElement('div');
    roundElement.setAttribute("id", "round-element");
    roundElement.textContent = `ROUND ${roundCounter}`;
    roundNumberContainer.appendChild(roundElement);
    roundElement.addEventListener('animationend', () => {
        setTimeout(() => {
            roundElement.remove();
        }, 3000);
    });
}

function enableShooting() {
    isEnableShooting = true;
    document.getElementById("crosshair").style.backgroundImage = 'url(/sprites/crosshair.png)';
}

function disableShooting() {
    isEnableShooting = false;
    document.getElementById("crosshair").style.backgroundImage = 'url(/sprites/forbidden.png)';
}

function updateWavesAndRounds() {
    let waves = document.querySelector(".waves");
    let rounds = document.querySelector(".round-number");
    waves.innerHTML = `WAVE : ${waveCounter} / ${maxWaves} `;
    //rounds.innerHTML = `Round : ${roundsCounter} / ${maxRounds}`; //Uncomment to set a max number of rounds
    rounds.innerHTML = `Round : ${roundsCounter} /∞`;
}

function refreshScore() {
    let score = document.querySelector(".score");
    score.innerHTML = `SCORE :     ${totalDucksKilled * 500}`;
}

function showBullets() {
    const bulletCounter = document.getElementById("bullet-counter");
    const childDivs = bulletCounter.querySelectorAll("div");
    childDivs.forEach((div) => (div.style.display = "none"));
}

function hideMainMenu() {
    const mainMenu = document.querySelector(".main-menu-container");
    mainMenu.classList.add("hide-container");
}

function stopIntroAudio() {
    const introAudio = document.getElementById('intro-audio');
    introAudio.pause();
    introAudio.currentTime = 0;
}