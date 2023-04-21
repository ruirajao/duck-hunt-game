

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



