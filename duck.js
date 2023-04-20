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

}







}







