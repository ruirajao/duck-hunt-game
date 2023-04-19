  let fieldWidth = document.getElementById("mainContainer").offsetWidth;
  let fieldHeight = document.getElementById("mainContainer").offsetHeight;

  window.addEventListener('resize',updateFieldSize);

  function printField(event) {
    document.getElementById("coord").innerHTML =
      "FieldWidthX: " + fieldWidth + 
      " - FieldHeightY: " + fieldHeight;
  }

  function updateFieldSize() {
     fieldWidth = document.getElementById("mainContainer").offsetWidth;
     fieldHeight = document.getElementById("mainContainer").offsetHeight;
     printField();
  }

    
