function duckMoveRight() {
    setInterval(function() {
        setTimeout(horizontalRightTwo, 250);
        setTimeout(horizontalRightThree, 400);
        setTimeout(horizontalRightOne, 550);
      }, 500);
    }

function horizontalRightOne(){
    let duck = document.getElementById("duck").style.backgroundPosition = `-130px -121px`;
    duck.style.width = "34px";
    duck.style.height = "20px";
}

function horizontalRightTwo(){
    let duck = document.getElementById("duck").style.backgroundPosition = `-170px -123px`;
    duck.style.width = "34px";
    duck.style.height = "20px";
}

function horizontalRightThree(){
    let duck = document.getElementById("duck").style.backgroundPosition = `-211px -119px`;
    duck.style.width = "34px";
    duck.style.height = "20px";
}

function duckMoveRightUpDiagonal() {
    setInterval(function() {
        setTimeout(diagonalUpRightTwo, 250);
        setTimeout(diagonalUpRightThree, 400);
        setTimeout(diagonalUpRightOne, 550);
      }, 500);
    }

function diagonalUpRightOne(){
    let duck = document.getElementById("duck").style.backgroundPosition = `-134px -157px`;
    duck.style.width = "25px";
    duck.style.height = "31px";
}

function diagonalUpRightTwo(){
    let duck = document.getElementById("duck").style.backgroundPosition = `-171px -158px`;
    duck.style.width = "32px";
    duck.style.height = "29px";
}

function diagonalUpRightThree(){
    let duck = document.getElementById("duck").style.backgroundPosition = `-213px -157px`;
    duck.style.width = "27px";
    duck.style.height = "31px";
}

function duckMoveUp() {
    setInterval(function() {
        setTimeout(upTwo, 250);
        setTimeout(upThree, 400);
        setTimeout(upOne, 550);
      }, 500);
    }

function upOne(){
    let duck = document.getElementById("duck").style.backgroundPosition = `-135px -197px`;
    duck.style.width = "24px";
    duck.style.height = "31px";
}

function upTwo(){
    let duck = document.getElementById("duck").style.backgroundPosition = `-171px -197px`;
    duck.style.width = "32px";
    duck.style.height = "31px";
}

function upThree(){
    let duck = document.getElementById("duck").style.backgroundPosition = `-212px -198px`;
    duck.style.width = "30px";
    duck.style.height = "30px";
}

function hidePopup(){
    const popup = document.querySelector(".popup-container");
    popup.classList.add("hide-container");
    duckMoveRight();
}
// let tID; 
// let position = 
// const  interval = 100; //100 ms of interval for the setInterval()tID = setInterval ( () => {document.getElementById("image").style.backgroundPosition = 
// `-${position}px 0px`; 
// //we use the ES6 template literal to insert the variable "position"if (position < 1536)
// if(position < 1536)
// { position = position + 256;}
// //we increment the position by 256 each time
// else
// { position = 256; }
// }
// //reset the position to 256px, once position exceeds 1536px}
// , interval ); //end of setInterval} //end of animateScript()


