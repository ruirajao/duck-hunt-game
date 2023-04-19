  let fieldWidth = document.getElementById("mainContainer").offsetWidth;
  let fieldHeight = document.getElementById("mainContainer").offsetHeight;


  duck.addEventListener('mousedown',printField);


  function printField(event) {
    document.getElementById("coord").innerHTML =
      "clientX: " + event.clientX + //17px average each side
      " - clientY: " + event.clientY;
  }


    
