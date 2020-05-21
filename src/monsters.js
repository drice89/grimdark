import Character from "./character"

class Monster extends Character {
  constructor() {
    super()
    this.tileFrom = null;
    this.tileTo = null;
    //also affects movement speed 
    this.timeMoved = 0;
    //this is the dimension of the character sprite
    this.dimensions = [48, 48];
    this.position = null
    this.bulletEnteredTile = false;
    this.alive = true;
    //movement speed
    this.delayMove = 400;
    this.facing = "DOWN"
    this.monsterSprites = {
      "UP": [{x:96, y:576, w:47, h:47}, {x:96, y:624, w:47, h:47}],
      "DOWN": [{x:48, y:576, w:47, h:47}, {x:48, y:624, w:47, h:47}],
      "LEFT": [{x:144, y:576, w:47, h:47}, {x:144, y:624, w:47, h:47}],
      "RIGHT": [{x:0, y:576, w:47, h:47}, {x:0, y:624, w:47, h:47}],
      "UPLEFT": [{x:144, y:576, w:47, h:47}, {x:144, y:624, w:47, h:47}],
      "UPRIGHT": [{x:0, y:576, w:47, h:47}, {x:0, y:624, w:47, h:47}],
      "DOWNLEFT": [{x:144, y:576, w:47, h:47}, {x:144, y:624, w:47, h:47}],
      "DOWNRIGHT": [{x:0, y:576, w:47, h:47}, {x:0, y:624, w:47, h:47}],
    }
    this.movementAnimation = "false"
  }
 determineDirection(playerPosition) {
   
    let x = !(playerPosition[0] - this.position[0]) ? "" : Math.abs(playerPosition[0] - (this.position[0] - 1)) < Math.abs(playerPosition[0] - (this.position[0] + 1)) 
            ? "LEFT" : "RIGHT"
    let y = !(playerPosition[1] - this.position[1]) ? "" : Math.abs(playerPosition[1] - (this.position[1] - 1)) < Math.abs(playerPosition[1] - (this.position[1] + 1)) 
            ? "UP" : "DOWN";

    return y + x
 }


 checkCurrentPositionForBullets(bullets) {
   //should ensure that if the monster is moving on this frame, it does not get hit
   if(bullets[this.currentPostion] && this.bulletEnteredTile) {
     this.alive = false
   } 
   else if(bullets[this.currentPostion]) {
     this.bulletEnteredTile = true
   }
 }

  static resolveCollision(direction) {
    switch(direction.FACING) {
      case "UP":
        return "RIGHT";
      case "UPRIGHT":
        return "UPLEFT"
      case "UPLEFT":
        return "DOWNLEFT"
      case "DOWNLEFT":
        return "DOWNRIGHT";
      case "DOWNRIGHT":
        return "UP"; 
      case "RIGHT":
        return "DOWN";
      case "DOWN":
        return "LEFT";
      case "LEFT":
        return "UPRIGHT";
    }
  }
}

export default Monster

