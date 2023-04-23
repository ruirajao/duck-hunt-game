const gameOverDiv = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');

function showGameOver(score) {
    isGameOver = true;
    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = score;
    gameOverDiv.style.display = 'flex';
    
}

restartButton.addEventListener('click', function () {
    gameOverDiv.style.display = 'none';
    allVariablesRestart();
    startGame();
    escapedDucksDisplay();
});

function allVariablesRestart() {
    isEnableShooting = false;
    bulletCounter = 3;
    maxRounds = 5;
    roundsCounter = 1;
    ducksPerWave = 2;
    maxWaves = 3;
    waveCounter = 1;
    maxMissedDucksToGameover = 3;
    missedDucks = 0;
    velocity = roundsCounter;
    isGameOver = false;
    isWaveFinished = false;
    isRoundFinished = false;
    totalDucksKilled = 0;
    ducksKilledWave = 0;
    updateWavesAndRounds();
}