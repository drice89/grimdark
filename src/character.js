
////Character
class Character {
  constructor(mapH, mapW) {
    this.tileFrom = [1,1];
    this.tileTo = [1,1];
    //also affects movement speed 
    this.timeMoved = 0;
    //this is the dimension of the character sprite
    this.dimensions = [48, 48];
    this.position = [51,51]
    //movement speed
    this.delayMove = 100;
    this.facing = "DOWN"
    this.LEFT = "LEFT"
    this.RIGHT = "RIGHT"
    this.UP = "UP"
    this.DOWN = "DOWN"
    this.playerSprites = {
      "UP": [{x:96, y:0, w:47, h:47}, {x:96, y:48, w:47, h:47}],
      "DOWN": [{x:48, y:0, w:47, h:47}, {x:48, y:48, w:47, h:47}],
      "LEFT": [{x:144, y:0, w:47, h:47}, {x:144, y:48, w:47, h:47}],
      "RIGHT": [{x:0, y:0, w:47, h:47}, {x:0, y:48, w:47, h:47}],
    }
    this.movementAnimation = "false"
  }
}
//this function is dependent upon globals - maybe do tileW = this.tileW.bind(this)
Character.prototype.placeAt = function(x,y) {
  this.tileFrom = [x, y];
  this.tileTo = [x, y];
  this.position = [
    (
      (tileW * x) + ((tileW - this.dimensions[0])/2)
    ),(
      (tileH * y) + ((tileH-this.dimensions[1])/2)
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
    // console.log("x", this.position[0])
    this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1])/2);
    // console.log("y", this.position[1])

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
Character.prototype.isValidMove = function(x,y) {
  if(x < 0 || x > (mapW-1) || y < 0 || y > mapH-1) return false
  if(tileTypes[gameMap[toIndex(x,y)]].floor !== floorTypes.open) return false
  return true
}

Character.prototype.canMoveUp = function() { return this.isValidMove(this.tileFrom[0], (this.tileFrom[1] - 1)) }
Character.prototype.canMoveDown = function() { return this.isValidMove(this.tileFrom[0], (this.tileFrom[1] + 1)) }
Character.prototype.canMoveLeft = function() { return this.isValidMove((this.tileFrom[0] - 1), this.tileFrom[1]) }
Character.prototype.canMoveRight = function() { return this.isValidMove((this.tileFrom[0] + 1), this.tileFrom[1]) }
Character.prototype.canMoveUpLeft = function() { return this.isValidMove((this.tileFrom[0] - 1), (this.tileFrom[1] - 1)) }
Character.prototype.canMoveUpRight = function() { return this.isValidMove((this.tileFrom[0] + 1), (this.tileFrom[1] - 1)) }
Character.prototype.canMoveDownLeft = function() { return this.isValidMove((this.tileFrom[0] - 1), (this.tileFrom[1] + 1)) }
Character.prototype.canMoveDownRight = function() { return this.isValidMove((this.tileFrom[0] + 1), (this.tileFrom[1] + 1)) }

Character.prototype.move = function(direction, time) {
  switch(direction) {
    case "UPLEFT":
      this.tileTo[0] -= 1
      this.tileTo[1] -= 1
      this.facing = this.LEFT
      break;
    case "UPRIGHT":
      this.tileTo[0] += 1
      this.tileTo[1] -= 1
      this.facing = this.RIGHT
      break;
    case "DOWNLEFT":
      this.tileTo[0] -= 1
      this.tileTo[1] += 1
      this.facing = this.LEFT
      break;
    case "DOWNRIGHT":
      this.tileTo[0] += 1
      this.tileTo[1] += 1
      this.facing = this.RIGHT
      break;
    case "UP":
      this.tileTo[1] -= 1 
      this.facing = this.UP
      break;
    case "DOWN":
      this.tileTo[1] += 1
      this.facing = this.DOWN
      break;
    case "LEFT":
      this.tileTo[0] -= 1
      this.facing = this.LEFT
      break;
    case "RIGHT":
      this.tileTo[0] += 1
      this.facing = this.RIGHT
      break;
  }
  this.timeMoved = time
}


export default Character
