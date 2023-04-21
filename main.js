const playButton = document.getElementById('playButton');
playButton.addEventListener('click', play);


/*
function createDuck() {
    let ducky = new Duck();
    ducky.spawnDuck(2);
    ducky.spawnDuck(2);
    ducky.spawnDuck(2);
    let dog1 = new Dog("dog1");
    dog1.launchWalkoutAnimation();
    console.log("doggy1");
    let dog2 = new Dog("dog2");
    // dog2.showDogWithKilledDucks(1);
    // dog2.showDogWithKilledDucks(2);
    //dog2.showDogLaugh();
    let alreadyKilledOne = false;
    function checkKills() {
        if (Duck.kills === 1 && !alreadyKilledOne) {
            dog2.showDogWithKilledDucks(1);
            alreadyKilledOne = true;
        }
        if (Duck.kills === 3) {
            ducky.spawnDuck(1);
            ducky.spawnDuck(1);
            ducky.spawnDuck(1);
            console.log("MAIS 3");
        } else {
            setTimeout(checkKills, 2000); // Check again after 1 second
        }
        console.log("teste");
    }
    checkKills(); // Start checking for the condition
}
*/

let bulletCounter = 3;
let maxRounds = 3;
let roundsCounter = 1;
let startingDucks = 1;
let killedDucks = 0;

let maxWaves = 3;
let waveCounter = 1;

let velocity = 1;
let isGameOver = false;
let duckHandler = new Duck();
let sniffDog = new Dog("dog1");
let catchAndLaughDog = new Dog("dog2");

let isWaveFinished = false;
let isRoundFinished = false;

//startWithBlockCrosshair!

function play1() {
    const startTimerElement = document.getElementById("start-timer");
    startTimerElement.style.display = "block";
    setTimeout(() => {
        startTimerElement.style.display = "none";
        startTimer(10);
        showBullets();
        freeDucks();
    }, 4000);

    sniffDog.launchWalkoutAnimation();
    //setTimeOut(); for animation
    //displayDivRound(roundCounter);
    //unlockCrosshair();

    function freeDucks() {
        for (let i = 0; i < startingDucks; i++) {
            duckHandler.spawnDuck(velocity);
        }
        const audio = new Audio("audio/duck-flapping.mp3")
        audio.play();
    }


    function checkRoundCounter() {
        if (waveCounter === 3) {
            isRoundFinished = true;
            roundCounter++;
        } else {
            setTimeout(checkWaveFinish, 2000); // Check again after 2 second
        }
    }

    function checkWaveFinish() {
        if (Duck.kills === startingDucks) {
            waveCounter++;
            isWaveFinished = true;
            Duck.kills = 0;
            freeDucks();
            console.log("Wave counter:" + waveCounter);
        } else {
            setTimeout(checkWaveFinish, 1000); // Check again after 1 second
        }
    }

    function callDog() {
        if (Duck.kills === 1) {
            catchAndLaughDog.showDogWithKilledDucks(1)
        } else {
            setTimeout(checkWaveFinish, 1000); // Check again after 1 second
        }


    }

    checkWaveFinish();
    checkRoundCounter();

    if (isRoundFinished) {
        resetAllStats();
        startNewRound();
    }
}

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
        waveCounter = 1;
        startWaves();




        //setTimeout(() => startNewRound(roundsCounter),4000);
        //setCountDownToEndWave();
        //displayCountDownToEndWave();

        //displayRoundTitle();
        //resetAmmo();
        //enableShooting();
    }

    function startWaves() {
        console.log("-----Start New Wave method-----");
        console.log("Wave counter:" + waveCounter);
        displayWaveTimer(5 + (roundsCounter * 5));
        for (let i = 0; i < waveCounter; i++) {
            duckHandler.spawnDuck(roundsCounter);
        }
        setCountdownToWaveEnd();
    }

    function setCountdownToWaveEnd() {
        console.log("-----setCountdownToWaveEnd method-----");
        let timeToRoundEnd = (5 + (roundsCounter * 5)) * 1000;

        checkOutOfBullets();

        if (bulletCounter === 0) {
            finishWave();
        }

        waveEndCountDown = setTimeout(() => finishWave(), timeToRoundEnd);
    }

    function finishWave() {
        console.log("-----finishWave method-----");
        bulletCounter=3;
        
        waveCounter++;
        if (waveCounter===4) {
            roundsCounter++;
            startNewRound();
        } else {
            startWaves();
        }
    }

    function checkOutOfBullets() {
        if (bulletCounter <= 0) {
            // console.log("Out of bullets:" + bulletCounter);
            finishWave();
        } else {
            // console.log("bulletCheck" + bulletCounter);
            setTimeout(checkOutOfBullets, 500); // Check again after 1 second
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

let waveEndTimer;
const waveTimeContainer = document.getElementById('wave-time-left');
const timerElement = document.createElement('div');
waveTimeContainer.appendChild(timerElement);
timerElement.setAttribute('id', 'waveTimer');
function displayWaveTimer(seconds) {
    waveEndTimer = Date.now() + (seconds * 1000); // Calculate the target end time
    // Create a timer element and append it to the DOM
    timerElement.style.marginLeft = "5px";
    timerElement.style.marginTop = "2px";
    

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







/*
let endTime; // Define endTime outside of the function
function startTimer(seconds) {
    const fieldContainer = document.getElementById('field-container');
    endTime = Date.now() + (seconds * 1000); // Calculate the target end time
    // Create a timer element and append it to the DOM
    const timerElement = document.createElement('div');
    timerElement.setAttribute('id', 'timer');
    fieldContainer.appendChild(timerElement);
    // Function to update the timer element
    const updateTimer = () => {
        const currentTime = Date.now();
        const timeLeft = Math.ceil((endTime - currentTime) / 1000);
        if (timeLeft > 0) {
            timerElement.textContent = `Time Left: ${timeLeft} seconds`;
            setTimeout(updateTimer, 1000); // Update timer every second
        } else {
            timerElement.textContent = 'Time is up!';
        }
    };
    updateTimer(); // Start the timer
}*/





function showBullets() {
    const bulletCounterElement = document.getElementById("bullet-counter");
    const bullet1Cover = document.querySelector(".bullet1-cover");
    const bullet2Cover = document.querySelector(".bullet2-cover");
    const bullet3Cover = document.querySelector(".bullet3-cover");
    const bullet = new Audio("audio/gun-shot.mp3")

    document.addEventListener('click', () => {
        if (bulletCounter === 3) {
            bullet1Cover.style.display = 'inline';
        } else if (bulletCounter === 2) {
            bullet2Cover.style.display = 'inline';
        } else if (bulletCounter === 1) {
            bullet3Cover.style.display = 'inline';
        }

        bulletCounter--;
        bullet.play();
    });
}

