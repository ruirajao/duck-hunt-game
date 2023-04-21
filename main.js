

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

let bulletCounter = 4;
let maxRounds = 5;
let roundsCounter = 1;
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

function play() {
    showBullets();
    const startTimerElement = document.getElementById("start-timer");
    startTimerElement.style.display = "block";
    setTimeout(() => {
      startTimerElement.style.display = "none";
    }, 4000);
    
    startTimer(10);
    sniffDog.launchWalkoutAnimation();
    //setTimeOut(); for animation
    //displayDivRound(roundCounter);
    //unlockCrosshair();

    function freeDucks() {
        for (let i = 0; i < maxWaves; i++) {
            duckHandler.spawnDuck(velocity);
        }
    }
    freeDucks();

    function checkRoundCounter() {
        if (waveCounter === 3) {
            isRoundFinished = true;
            roundCounter++;
        } else {
            setTimeout(checkWaveFinish, 2000); // Check again after 2 second
        }
    }

    function checkWaveFinish() {
        if (Duck.kills === 3) {
            waveCounter++;
            isWaveFinished = true;
            Duck.kills = 0;
            freeDucks();
            console.log("Wave counter:" + waveCounter);
        } else {
            setTimeout(checkWaveFinish, 2000); // Check again after 2 second
        }
    }

    function callDog() {
        if (Duck.kills === 1) {
            catchAndLaughDog.showDogWithKilledDucks(1)
        } else {
            setTimeout(checkWaveFinish, 2000); // Check again after 2 second
        }


    }

    checkWaveFinish();
    checkRoundCounter()
}

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
}



function showBullets(){
    const bulletCounterElement = document.getElementById("bullet-counter");
    bulletCounterElement.innerHTML = `<p>BULLETS: <span style="font-size: 24px;">${bulletCounter}</span></p>`;
  
    document.addEventListener('click', () => {
      if (bulletCounter > 0) {
        bulletCounter--;
        bulletCounterElement.innerHTML = `<p>BULLETS: <span style="font-size: 24px;">${bulletCounter}</span></p>`;
      } 
    });
}

