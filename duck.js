const field = require('./field.js'); 

class Duck {

  constructor(field,duckMoves) {
    this.field= field;
    this.duckMoves = duckMoves;
    this.isAlive = true;
    this.spawnHeight = 0.25 * field.height;
    this.spawnWidth = Math.floor(Math.random() * (field.width - 10  + 1)) + 10;
    this.duckDiv;
  }



spawn(waveCounter) {
  const mainContainer = document.getElementById("mainContainer");
  duckDiv = document.createElement("div");
               mainContainer.appendChild(newDuck);
               duckDiv.style.width = this.spawnWidth + "px";
               duckDiv.style.height = this.spawnHeigh + "px";
               this.duck.fly();
               
}


fly() {


  setInterval(() => {
    const newLeft = Math.floor(Math.random() * (this.field.width - this.spawnWidth)); // Randomize new left position
    const newTop = Math.floor(Math.random() * (this.field.height - this.spawnHeight)); // Randomize new top position

    this.duckDiv.style.left = newLeft + "px"; // Update left position
    this.duckDiv.style.top = newTop + "px"; // Update top position
  }, this.duckMoves);


}







}



// function horizontal(direction) {
//  let duck =  document.getElementById("duck");
//     if(direction === "left") {
//       duck.removeAttribute("class");
//       duck.setAttribute("class","move-Left");
//         duck.style.transform = "scaleX(-1)";
//     } 
//     if(direction === "right") {
//       duck.removeAttribute("class");
//       duck.setAttribute("class","move-right");
//       duck.style.transform = "none";
//     }

//  const start =  () => {duck.style.backgroundPosition = `-130px -121px`;
//  duck.style.width = "34px";
//  duck.style.height = "24px";
// }

// const mid = () => {duck.style.backgroundPosition = `-170px -123px`;
// duck.style.width = "34px";
// duck.style.height = "20px";
// }

// const final = () => {duck.style.backgroundPosition = `-211px -119px`;
// duck.style.width = "32px";
// duck.style.height = "28px";
// }

// setInterval(() => {
//     start();
//     setTimeout(() => {
//       mid();
//     }, 50);
//     setTimeout(() => {
//       final();
//     }, 100);
//   }, 150);

//   setInterval();
// }



// function diagonal(x,y) {
//  let duck =  document.getElementById("duck");
//  duck.removeAttribute("class");

//  switch(x) {
//   case "right": 
//     switch(y){
//       case "down":
//         duck.setAttribute('class','move-Right-Diagonal-down');
//         break;
//       case "up":
//         duck.setAttribute('class','move-Right-Diagonal-up')
//         break;
//     }
//     break; 
//     case "left":
//       switch(y){
//         case "down":
//           duck.setAttribute('class', 'move-Left-Diagonal-down');
//           break;
//         case "up":
//           duck.setAttribute('class', 'move-Left-Diagonal-up');
//           break;
//       }
//       break;
//  }

// const start = () => {duck.style.backgroundPosition = `-134px -157px`;
// duck.style.width = "25px";
// duck.style.height = "31px";
// }

// const mid = () => {duck.style.backgroundPosition = `-171px -158px`;
// duck.style.width = "32px";
// duck.style.height = "29px";
// }

// const final = () => {duck.style.backgroundPosition = `-213px -157px`;
// duck.style.width = "27px";
// duck.style.height = "31px";
// }

// setInterval(() => {
//     start();
//     setTimeout(() => {
//       mid();
//     }, 100);
//     setTimeout(() => {
//       final();
//     }, 200);
//   }, 300);
// }


// function moveDown() {
//   // duck.removeAttribute("class");
//   duck.setAttribute('class','move-Down')

//   const start = () => {
//   duck.style.backgroundPosition = `-131px -238px`;
// 	duck.style.width =  "31px";
// 	duck.style.height = "29px";
//   }

//   const final = () => {
//   duck.style.backgroundPosition = `-178px -237px`;
// 	duck.style.width =  "18px";
// 	duck.style.height = "30px";
//   }

//   start();

//   setTimeout(() => {
//     duck.removeAttribute("style");
//     setInterval(() => {
//       final();
//     }, 5);
//   }, 300);
// }






