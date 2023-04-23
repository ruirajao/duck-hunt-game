var pistolStandby = document.getElementById('pistol-standby');
var pistolShoot = document.getElementById('pistol-shoot');
let crosshair = document.getElementById('crosshair');
pistolStandby.style.display = 'block';
pistolShoot.style.display = 'none';


document.addEventListener('click', function () {
  if (isEnableShooting) {
    if (pistolStandby.style.display === 'block') {
      pistolStandby.style.display = 'none';
      pistolShoot.style.display = 'block';
    } else {
      pistolShoot.style.display = 'none';
      pistolStandby.style.display = 'block';
    }

    // timeout to hide the pistol shoot sprite after 100ms
    setTimeout(function () {
      pistolShoot.style.display = 'none';
      pistolStandby.style.display = 'block';
    }, 100);
  }
});

document.addEventListener('mousemove', function (event) {
  var mouseX = event.clientX;
  var windowWidth = window.innerWidth;
  var leftMiddleRight = windowWidth * 0.5;

  if (mouseX >= 0 && mouseX <= leftMiddleRight) {
    pistolShoot.style.transform = 'translateX(-50%) scaleX(1)';
    pistolStandby.style.transform = 'translateX(-50%) scaleX(1)';
  } else {
    pistolShoot.style.transform = 'translateX(-50%) scaleX(-1)';
    pistolStandby.style.transform = 'translateX(-50%) scaleX(-1)';
  }
});

document.addEventListener('mousemove', function (event) {
  crosshair.style.top = event.clientY + 'px';
  crosshair.style.left = event.clientX + 'px';
});

