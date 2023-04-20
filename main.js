const playButton = document.getElementById('playButton');
playButton.addEventListener('click', createDuck);

function createDuck() {
    let ducky = new Duck();
    ducky.spawnDuck();
}
