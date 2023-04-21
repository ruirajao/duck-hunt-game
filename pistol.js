document.addEventListener('mousemove', function (event) {
  let crosshair = document.getElementById('crosshair');
  crosshair.style.top = event.clientY + 'px';
  crosshair.style.left = event.clientX + 'px';
});

// Get the pistol standby and shoot elements
var pistolStandby = document.getElementById('pistol-standby');
var pistolShoot = document.getElementById('pistol-shoot');
pistolStandby.style.display = 'block';
pistolShoot.style.display = 'none';

// Add click event listener to the document object
document.addEventListener('click', function () {
  // Display the pistol shoot sprite
  if (pistolStandby.style.display === 'block') {
    pistolStandby.style.display = 'none';
    pistolShoot.style.display = 'block';
  } else {
    pistolShoot.style.display = 'none';
    pistolStandby.style.display = 'block';
  }

  // Set a timeout to hide the pistol shoot sprite after 100ms
  setTimeout(function () {
    pistolShoot.style.display = 'none';
    pistolStandby.style.display = 'block';
  }, 100);
});

// Add mousemove event listener to the document object
document.addEventListener('mousemove', function (event) {
  // Get the horizontal and vertical coordinates of the mouse cursor
  var mouseX = event.clientX;
  //get widths
  var windowWidth = window.innerWidth;
  var leftMiddleRight = windowWidth * 0.5;


  // Check if the mouse cursor is within the left middle region
  if (mouseX >= 0 && mouseX <= leftMiddleRight) {
    pistolShoot.style.transform = 'translateX(-50%) scaleX(1)';
    pistolStandby.style.transform = 'translateX(-50%) scaleX(1)';
  } else {
    pistolShoot.style.transform = 'translateX(-50%) scaleX(-1)';
    pistolStandby.style.transform = 'translateX(-50%) scaleX(-1)';
  }
});


document.addEventListener('keydown', function () {
  // Display the pistol shoot sprite
  if (pistolStandby.style.display === 'block') {
    pistolStandby.style.display = 'none';
    pistolShoot.style.display = 'block';
  } else {
    pistolShoot.style.display = 'none';
    pistolStandby.style.display = 'block';
  }

  // Set a timeout to hide the pistol shoot sprite after 100ms
  setTimeout(function () {
    pistolShoot.style.display = 'none';
    pistolStandby.style.display = 'block';
  }, 100);
});

window.addEventListener('keydown', function (event) {
  let crosshair = document.getElementById('crosshair');
  // Check if the "F" key is pressed
  if (event.key === 'f') {
    if (crosshair.style.transform === 'translate(-50%, -50%) scale(100%)') {
      crosshair.style.transform = 'translate(-50%, -50%) scale(200%)'
    } else {
      crosshair.style.transform === 'translate(-50%, -50%) scale(100%)'
    }
  }
});


