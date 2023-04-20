const playButton = document.getElementById('playButton');
playButton.addEventListener('click', createDuck);

function createDuck() {
    let ducky = new Duck();
    ducky.spawnDuck();
    let dog1 = new Dog("dog1");
    dog1.launchWalkoutAnimation();
    console.log("doggy1");

    let dog2 = new Dog("dog2");
    // dog2.showDogWithKilledDucks(1);

    // dog2.showDogWithKilledDucks(2);

    dog2.showDogLaugh();
    
}
