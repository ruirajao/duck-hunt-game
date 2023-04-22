const playButton = document.getElementById('playButton');
playButton.addEventListener('click', play);

const crosshairContainter = document.getElementById("crosshair");
const pistolShootContainer = document.getElementById('pistol-shoot');
let isEnableShooting = false;
let waveTimeOut;

const duckContainer = document.getElementById('duck-container');

let bulletCounter = 3;
let maxRounds = 3;
let roundsCounter = 1;
let ducksPerWave = 2;
let killedDucks = 0;

let maxWaves = 3;
let waveCounter = 1;

let velocity = roundsCounter;
let isGameOver = false;
let duckHandler = new Duck();
let sniffDog = new Dog("dog1");
let catchAndLaughDog = new Dog("dog2");

let isWaveFinished = false;
let isRoundFinished = false;


function play() {

    startGame();

    function startGame() {
        console.log("-----startGame method-----");
        sniffDog.launchWalkoutAnimation();
        displayGameStartingTimer(3);
        displayRoundNumber(1);
        showBullets();
        setTimeout(() => startNewRound(), 6000);
    }

    function startNewRound() {
        console.log("-----Start New Round method-----");
        (roundsCounter > 1) ? displayRoundNumber(roundsCounter) : "Let's go";
        setTimeout(() => startWaves(), 3000);
    }

    function startWaves() {
        console.log("-----Start New Wave method-----");
        console.log("Wave counter:" + waveCounter);
        enableShooting();
        updateWavesAndRounds();
        displayWaveTimer(5 + (roundsCounter * 5));

        for (let i = 0; i < ducksPerWave; i++) {
            duckHandler.spawnDuck(velocity);
        }
        setCountdownToWaveEnd();
    }

    function setCountdownToWaveEnd() {
        console.log("-----setCountdownToWaveEnd method-----");
        // Clears any previous timeouts
        clearTimeout(waveTimeOut);

        let timeToWaveEnd = 10000;
        checkOutOfBulletsAndUpdate();

        if (bulletCounter === 0) {
            finishWave();
        }

        waveTimeOut = setTimeout(() => finishWave(), timeToWaveEnd); // Store the new timeout ID
    }

    function finishWave() {
        console.log("-----finishWave method-----");
        bulletCounter = 3;

        if (waveCounter === 3) {
            roundsCounter++;
            waveCounter = 1;
            startNewRound();
        } else {
            waveCounter++;
            startWaves();
        }
    }

    function checkOutOfBulletsAndUpdate() {
        if (bulletCounter <= 0) {
            disableShooting();
            setTimeout(finishWave, 3000);
        } else {
            console.log("bulletCounter: " + bulletCounter);
            setTimeout(checkOutOfBulletsAndUpdate, 100); // Check again after 1 second
        }
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

function updateWavesAndRounds() {
    let waves = document.querySelector(".waves");
    let rounds = document.querySelector(".round-number");
    waves.innerHTML = `WAVE : ${waveCounter} `;
    rounds.innerHTML = `Round : ${roundsCounter} `;
}