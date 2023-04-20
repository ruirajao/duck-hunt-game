const playButton = document.getElementById('playButton');
playButton.addEventListener('click', createDuck);

document.addEventListener('mousemove', function(event) {
    let crosshair = document.getElementById('crosshair');
    crosshair.style.top = event.clientY + 'px';
    crosshair.style.left = event.clientX + 'px';
});

// Get the pistol standby and shoot elements
var pistolStandby = document.getElementById('pistol-standby');
var pistolShoot = document.getElementById('pistol-shoot');

// Add click event listener to the document object
document.addEventListener('click', function() {
  // Display the pistol shoot sprite
  pistolStandby.style.display = 'none';
  pistolShoot.style.display = 'block';
  
  // Set a timeout to hide the pistol shoot sprite after 100ms
  setTimeout(function() {
    pistolShoot.style.display = 'none';
    pistolStandby.style.display = 'block';
  }, 100);
});

  

function createDuck() {
    let ducky = new Duck();
    ducky.spawnDuck(5);
    ducky.spawnDuck(1);
    ducky.spawnDuck(10);
    ducky.spawnDuck(1);
    
    let dog1 = new Dog("dog1");
    dog1.launchWalkoutAnimation();
    console.log("doggy1");

    let dog2 = new Dog("dog2");
    // dog2.showDogWithKilledDucks(1);

    // dog2.showDogWithKilledDucks(2);

    dog2.showDogLaugh();
    
}
