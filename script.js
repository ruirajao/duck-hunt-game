function duckMove() {
    horizontalRightOne();

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


