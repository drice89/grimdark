import { DIRECTIONS, FLOORTYPES, TILETYPES } from "./util"
////Character
class Character {
  constructor() {
    this.tileFrom = [1,1];
    this.tileTo = [1,1];
    //also affects movement speed 
    this.timeMoved = 0;
    //this is the dimension of the character sprite
    this.dimensions = [48, 48];
    this.position = [49,49]
    //movement speed
    this.delayMove = 300;
    this.facing = "DOWN"
    this.playerSprites = {
      "UP": [{x:96, y:0, w:47, h:47}, {x:96, y:48, w:47, h:47}],
      "DOWN": [{x:48, y:0, w:47, h:47}, {x:48, y:48, w:47, h:47}],
      "LEFT": [{x:144, y:0, w:47, h:47}, {x:144, y:48, w:47, h:47}],
      "RIGHT": [{x:0, y:0, w:47, h:47}, {x:0, y:48, w:47, h:47}],
      "UPLEFT": [{x:96, y:0, w:47, h:47}, {x:96, y:48, w:47, h:47}],
      "UPRIGHT": [{x:96, y:0, w:47, h:47}, {x:96, y:48, w:47, h:47}],
      "DOWNLEFT": [{x:48, y:0, w:47, h:47}, {x:48, y:48, w:47, h:47}],
      "DOWNRIGHT": [{x:48, y:0, w:47, h:47}, {x:48, y:48, w:47, h:47}],
    }
    this.movementAnimation = "false"
    this.rateOfFire = 150
    this.lastBulletFired = 0
  }
  
  currentPosition() {
    return (this.tileFrom[0] + (mapW * this.tileFrom[1]))
  }
  
  toIndex(x,y) {
    return ((y*mapW) + x);
  }
  
  isValidMove(gameMap, direction = DIRECTIONS[this.facing]) {
    const x = this.tileFrom[0] + direction.DIRS[0];
    const y = this.tileFrom[1] + direction.DIRS[1]
    if (x < 0 || x > (mapW-1) || y < 0 || y > mapH-1) return false;
    if(TILETYPES[gameMap.map[this.toIndex(x,y)]].floor !== FLOORTYPES.open) return false;
    return true
  }

  lossCondition(monsters) {
    return monsters[this.toIndex(...this.tileFrom)]
  }
}
//this function is dependent upon globals - maybe do tileW = this.tileW.bind(this)
Character.prototype.placeAt = function(x,y) {
  this.tileFrom = [x, y];
  this.tileTo = [x, y];
  this.position = [
    (
        //multiply row tile value * size of tile
        //add tile width - the xdimension /2 in order to center horizontally
      (tileW * x) + ((tileW - this.dimensions[0])/2)
    ),(
      (tileH * y) + ((tileH - this.dimensions[1])/2)
      )
  ]
}
//this function is dependent upon globals
Character.prototype.processMovement = function(time) {
  if (this.tileFrom[0] === this.tileTo[0] && this.tileFrom[1] === this.tileTo[1]) {
    return false
  } 
  if((time - this.timeMoved) >= this.delayMove) {
    this.placeAt(this.tileTo[0], this.tileTo[1])
    this.movementAnimation = !this.movementAnimation
  } else {
    //below block gives pixel value starting position
    this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0])/2);
    this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1])/2);

    //check if char is moving horizontally
    if(this.tileTo[0] !== this.tileFrom[0]) {
      const diff = (tileW/this.delayMove) * (time - this.timeMoved);
      this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff)

    }
    //check if char is moving vertically
    if(this.tileTo[1] != this.tileFrom[1]){
			var diff = (tileH / this.delayMove) * (time - this.timeMoved);
      this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}
    
    this.position[0] = Math.round(this.position[0])
    this.position[1] = Math.round(this.position[1])
  }

  return true
}
//this function is dependent upon globals - needs to go in the map


Character.prototype.move = function(direction, time) {
  this.tileTo[0] += direction.DIRS[0]
  this.tileTo[1] += direction.DIRS[1]
  this.timeMoved = time
  this.facing = direction.FACING
  //console.log("tile to", this.tileTo[0], this.tileTo[1], direction)

}




export default Character
