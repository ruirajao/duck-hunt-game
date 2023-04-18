


function horizontal(direction) {
 let duck =  document.getElementById("duck");
    if(direction === "left") {
      duck.removeAttribute("class");
      duck.setAttribute("class","move-Left");
        duck.style.transform = "scaleX(-1)";
    } 
    if(direction === "right") {
      duck.removeAttribute("class");
      duck.setAttribute("class","move-right");
      duck.style.transform = "none";
    }

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
    }, 50);
    setTimeout(() => {
      final();
    }, 100);
  }, 150);

  setInterval();

}



function diagonal(x,y) {
 let duck =  document.getElementById("duck");
//  duck.removeAttribute("class");

 switch(x) {
  case "right": 
    switch(y){
      case "down":
        duck.setAttribute('class','move-Right-Diagonal-down');
        break;
      case "up":
        duck.setAttribute('class','move-Right-Diagonal-up')
        break;
    }
    break; 
    case "left":
      switch(y){
        case "down":
          duck.setAttribute('class', 'move-Left-Diagonal-down');
          duck.style.transform = "scaleX(-1) scaleY(-1)";
          break;
        case "up":
          duck.setAttribute('class', 'move-Left-Diagonal-up');
          duck.style.transform = "scaleX(-1)";
          break;
      }
      break;
 }

 let start = (x,y) => {duck.style.backgroundPosition = `-134px -157px`;
 duck.style.transform = "scaleX(-1)";
 duck.style.width = "25px";
 duck.style.height = "31px";
}

let mid = (x,y) => {duck.style.backgroundPosition = `-171px -158px`;
duck.style.transform = "scaleX(-1)";

duck.style.width = "32px";
duck.style.height = "29px";
}

let final = (x,y) => {duck.style.backgroundPosition = `-213px -157px`;
duck.style.transform = "scaleX(-1)";
duck.style.width = "27px";
duck.style.height = "31px";
}

setInterval(() => {
    start(x,y);
    setTimeout(() => {
      mid(x,y);
    }, 300);
    setTimeout(() => {
      final(x,y);
    }, 600);
  }, 900);
}




