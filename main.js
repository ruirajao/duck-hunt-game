const playButton = document.getElementById('playButton');
playButton.addEventListener('click', startGame);

const fieldContainer = document.getElementById('field-container');
const crosshairContainter = document.getElementById("crosshair");
const pistolShootContainer = document.getElementById('pistol-shoot');

const bullet = new Audio("audio/gun-shot.mp3");

let isEnableShooting = false;
let bulletCounter = 3;
let maxRounds = 5;
let roundsCounter = 1;
let ducksPerWave = 2;
let maxWaves = 3;
let waveCounter = 1;
let maxMissedDucksToGameover = 3;
let missedDucks = 0;
let isGameOver = false;

let isWaveFinished = false;
let isRoundFinished = false;
let waveTimeOut;

function startGame() {
    launchWalkoutAnimation();
    displayGameStartingTimer(3);
    displayRoundNumber(1);
    showBullets();
    setTimeout(() => startNewRound(), 4000);
}

function startNewRound() {
    console.log("-Start New Round method: " + roundsCounter);
    (roundsCounter > 1) ? displayRoundNumber(roundsCounter) : "Let's go";

    setTimeout(() => startWaves(), 2000);
}

function startWaves() {
    console.log("-Start New Wave method-" + waveCounter);
    console.log("Wave counter:" + waveCounter);
    isWaveFinished = false;
    bulletCounter = 3;
    showBulletsAgain();
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
    console.log("-finishWave method-");
    clearTimeout(waveTimeOut);
    deleteAllDucks();
    console.log("missedDucks: " + missedDucks + "||" + " maxMissedDucksToGameover: " + maxMissedDucksToGameover)

    //GAME OVER:
    if (missedDucks >= maxMissedDucksToGameover) {
        console.log("disableShooting a baixo")
        disableShooting();
        console.log("deleteAllDucks a baixo")
        deleteAllDucks();
        console.log("clearTimeout a baixo")
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
}

function setCountdownToWaveEnd() {
    if (!isGameOver) {
        // Clears any previous timeouts
        clearTimeout(waveTimeOut);
        let timeToWaveEnd = 10000;

        waveTimeOut = setTimeout(function () {
            console.log("-> Finish wave chamado do Timer 10 seg");
            if (!isWaveFinished) {
                isWaveFinished = true;
                finishWave();
            }

        }, timeToWaveEnd); // Store the new timeout ID
    }
}

//Bullets refresher - End wave if out of bullets
function checkOutOfBulletsAndUpdate() {
    if (bulletCounter <= 0 && ducksKilledWave < 2 && !isWaveFinished) {
        disableShooting();
        console.log("-> Finish wave chamado da checkOutOfBulletsAndUpdate");

        isWaveFinished = true;
        clearTimeout(waveTimeOut);
        setTimeout(finishWave, 1500);
        //finishWave();

    }
}

//Ducks killed refresher - End wave if two ducks are killed
function checkDucksKilledsAndUpdate() {
    if (ducksKilledWave === 2 && !isWaveFinished) {
        disableShooting();

        console.log("-> Finish wave chamado da checkDucksKilledsAndUpdate (ducksKilledWave === 2)");

        isWaveFinished = true;
        ducksKilledWave = 0;
        clearTimeout(waveTimeOut);
        setTimeout(finishWave, 1500);
        //finishWave();
    }
}



//GAME STARTING TIMER
let gameStartingEndTimer;
function displayGameStartingTimer(seconds) {
    const gameTimerContainer = document.getElementById('game-starting-timer');
    gameStartingEndTimer = Date.now() + (seconds * 1000); // Calculate the target end time

    // Create a timer element and append it to the DOM
    const timerElement = document.createElement('div');
    timerElement.setAttribute('id', 'timer');
    timerElement.style.fontFamily = "PixelFont";
    timerElement.style.fontSize = "400%";
    gameTimerContainer.appendChild(timerElement);

    // Function to update the timer element
    const updateTimer = () => {
        const currentTime = Date.now();
        const timeLeft = Math.ceil((gameStartingEndTimer - currentTime) / 1000);

        if (timeLeft > 0) {
            timerElement.textContent = `${timeLeft}`;
            setTimeout(updateTimer, 1000); // Update timer every second
        } else {
            timerElement.textContent = 'QUACK TIME!';
            setTimeout(() => timerElement.remove(), 1000);
        }
    };
    updateTimer(); // Start the timer
}

//WAVE TIMER
let waveEndTimer;
const waveTimeContainer = document.getElementById('wave-time-left');
const timerElement = document.createElement('div');
waveTimeContainer.appendChild(timerElement);
timerElement.setAttribute('id', 'waveTimer');
function displayWaveTimer(seconds) {
    waveEndTimer = Date.now() + (seconds * 1000); // Calculate the target end time

    // Function to update the timer element
    const updateTimer = () => {
        const currentTime = Date.now();
        const timeLeft = Math.ceil((waveEndTimer - currentTime) / 1000);

        if (timeLeft > 0) {
            timerElement.textContent = `TIMER: ${timeLeft}`;
            setTimeout(updateTimer, 1000); // Update timer every second
        } else {
            timerElement.textContent = "TIME'S UP!";
            setTimeout(() => timerElement.remove(), 1000);
        }
    };
    updateTimer(); // Start the timer
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


// TODO: This should be a updateDisplayBullets
function showBullets() {
    const bulletCounterElement = document.getElementById("bullet-counter");
    const bullet1Cover = document.querySelector(".bullet1-cover");
    const bullet2Cover = document.querySelector(".bullet2-cover");
    const bullet3Cover = document.querySelector(".bullet3-cover");
    const bullet = new Audio("audio/gun-shot.mp3")

    document.addEventListener('click', () => {
        if (isEnableShooting) {
            if (bulletCounter === 3) {
                bullet1Cover.style.display = 'inline';
            } else if (bulletCounter === 2) {
                bullet2Cover.style.display = 'inline';
            } else if (bulletCounter === 1) {
                bullet3Cover.style.display = 'inline';
            }

            bulletCounter--;
            bullet.play();
        }
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

document.addEventListener('click', () => {
    if (isEnableShooting) {
        checkOutOfBulletsAndUpdate();
        checkDucksKilledsAndUpdate();
        refreshScore();
    }
});

function updateWavesAndRounds() {
    let waves = document.querySelector(".waves");
    let rounds = document.querySelector(".round-number");
    waves.innerHTML = `WAVE : ${waveCounter} / ${maxWaves} `;
    rounds.innerHTML = `ROUND : ${roundsCounter} / ${maxRounds}`;
}

function refreshScore() {
    let score = document.querySelector(".score");
    score.innerHTML = `SCORE :     ${totalDucksKilled * 500}`;
}

function showBulletsAgain() {
    const bulletCounter = document.getElementById("bullet-counter");
    const childDivs = bulletCounter.querySelectorAll("div");
    childDivs.forEach((div) => (div.style.display = "none"));
}