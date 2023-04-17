


function horizontal(direction) {

 let duck =  document.getElementById("duck");
    // if(direction == "left") {
      // duck.removeAttribute("class");
      duck.setAttribute("class","move-Left");
        // duck.style.transform = "scaleX(-1)";
    // } 
    // if(direction == "right") {
    //   duck.removeAttribute("class");
    //   duck.setAttribute("class","move-right");
    //   duck.style.transform = "none";
    // }

 const start =  () => {duck.style.backgroundPosition = `-130px -121px`;
 duck.style.width = "34px";
 duck.style.height = "24px";
}

const mid = () => {duck.style.backgroundPosition = `-170px -123px`;
duck.style.width = "34px";
duck.style.height = "20px";
}

const final = () => {duck.style.backgroundPosition = `-211px -119px`;
duck.style.width = "32px";
duck.style.height = "28px";
}

setInterval(() => {
    start();
    setTimeout(() => {
      mid();
    }, 300);
    setTimeout(() => {
      final();
    }, 600);
  }, 900);

  setInterval();

}



function diagonal(x,y) {
    
 let duck =  document.getElementById("duck");



    if(x == "left") {
        duck.style.transform = "scaleX(-1)";
    } 
    if (y == "down") {
        duck.style.transform = "scaleY(-1);";
    }

 const start =  () => {duck.style.backgroundPosition = `-134px -157px`;
 duck.style.width = "25px";
 duck.style.height = "31px";
}

const mid = () => {duck.style.backgroundPosition = `-171px -158px`;
duck.style.width = "32px";
duck.style.height = "29px";
}

const final = () => {duck.style.backgroundPosition = `-213px -157px`;
duck.style.width = "27px";
duck.style.height = "31px";
}

setInterval(() => {
    start();
    setTimeout(() => {
      mid();
    }, 300);
    setTimeout(() => {
      final();
    }, 600);
  }, 900);

  setInterval();
}




