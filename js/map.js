    
    

let ctx = null;
const tileW = 50, tileH = 50;
const mapW = 64, mapH = 64;
let tileset = null, tilesetLoaded = false; 
const tilesetURL = "./assets/tiny_galaxy_world.png"

let currentSecond = 0, frameCount = 0, framesLastSecond = 0;
let lastFrameTime = 0;

let keysDown = { 
  37: false, //left arrow
  39: false, //right arrow
  38: false, //up arrow
  40: false, //down arrow
  }

//viewport

const viewport = {
  //dimensions of canvas
  screen: [0,0],
  //top left tile
  startTile: [0,0],
  //bottom right tile
  endTile: [0,0],
  //x and y offeset from the beginning of the screen
  offset: [0,0],
  update: function(px, py) {
    //px and py are the center of the visible area to the camera
    //drawing area with/2 - camera horizontal offeset
    this.offset[0] = Math.floor((this.screen[0]/2) - px);
    //dawing area height/2 - camera vertical offser
    this.offset[1] = Math.floor((this.screen[1]/2) - py);

    //this is the x, y value of the tile at the center
    const tile = [Math.floor(px/tileW), Math.floor(py/tileH)]
    //based on center tile defined by camera. horizontal value 
    //[first tile X] = [center tile X] - 1 - Round Up(([Canvas width] / 2) / [tile width]); x - 9
    this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0]/2) /tileW);
    // first tile y = center tile y -  9
    this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1]/2) /tileH);
    if(this.startTile[0] < 0) this.startTile[0] = 0;
    if(this.startTile[1] < 0) this.startTile[1] = 0;

    //x + 9
    this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2) /tileW);
    // y + 9
    this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[0]/2) /tileH);

    if(this.endTile[0] >= mapW) this.endTile[0] = mapW - 1;
    if(this.endTile[1] >= mapH) this.endTile[1] = mapH - 1;
  }
}


////Character

function Character() {
  this.tileFrom = [1,1];
  this.tileTo = [1,1];
  //also affects movement speed 
  this.timeMoved = 0;
  //this is the dimension of the character sprite
  this.dimensions = [30, 30];
  this.position = [51,51]
  //movement speed
  this.delayMove = 000;
  this.facing = "down"
  this.LEFT = "LEFT"
  this.RIGHT = "RIGHT"
  this.UP = "UP"
  this.DOWN = "DOWN"
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
//this function is dependent upon globals
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
      break;
    case "UPRIGHT":
      this.tileTo[0] += 1
      this.tileTo[1] -= 1
      break;
    case "DOWNLEFT":
      this.tileTo[0] -= 1
      this.tileTo[1] += 1
      break;
    case "DOWNRIGHT":
      this.tileTo[0] += 1
      this.tileTo[1] += 1
      break;
    case "UP":
      this.tileTo[1] -= 1 
      break;
    case "DOWN":
      this.tileTo[1] += 1
      break;
    case "LEFT":
      this.tileTo[0] -= 1
      break;
    case "RIGHT":
      this.tileTo[0] += 1
      break;
  }
  this.timeMoved = time
}


let player = new Character();

const map = [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];
  



function ramdomizer(num, i){
  if(num >= 1) {
    const tile = Math.floor(Math.random() * 100000)
    
    const keycard = 99852;
    const item = 99751;
    const object = 99125;
    const rearWallDecoration = 91000
    
    //order matters
    if(tile >= keycard) {
      console.log(tile)
      return 2
    }

    if(tile >= item) return 3
    if(tile >= object ) return 4
    if(tile >= rearWallDecoration && (((i - (i%mapW))/mapW)%16) === 1) return 5
    return 1
  } else {
    return 0;
  }
}

function multiRandomizer() {
  const thing = Math.floor(Math.random()* 10) + 40
  if(thing > 7) return 41
  if(thing > 4) return 42
  return 43
}

function randomizeMap(arr) {
  let multiItem = false
  let lastMulti = null
  return arr.map((tile, i) => {
    if (multiItem) {
      multiItem = false
      return lastMulti
    }
    const res = ramdomizer(tile, i)
    if(res !== 4) return res;
    multiItem = true;
    lastMulti = multiRandomizer(); 
    return lastMulti;
    })
}
const gameMap = randomizeMap(map)
const floorTypes = {
  solid: 1,
  open: 0
}

const tileTypes = {
  0: { name: "wall", sprite:[{x:96, y:0, w:16, h:16}, {x: 0, y:0, w:16, h:16}], color: "white", floor: floorTypes.solid },
  1: { name: "tile", sprite:[{x: 0, y:127, w:16, h:16}], color: "grey", floor: floorTypes.open },
  2: { name: "keycard", sprite:[{x: 0, y:0, w:40, h:40}], color: "green", floor: floorTypes.open },
  3: { name: "item", sprite:[{x: 0, y:0, w:40, h:40}], color: "yellow", floor: floorTypes.open },
  41: { name: "table", sprite:[{x: 0, y:0, w:40, h:40}], color: "blue", floor: floorTypes.solid },
  42: { name: "vat", sprite:[{x: 0, y:0, w:40, h:40}], color: "aqua", floor: floorTypes.solid },
  43: { name: "crate", sprite:[{x: 0, y:0, w:40, h:40}], color: "orange", floor: floorTypes.open },
  5: { name: "computer", sprite:[{x: 0, y:0, w:40, h:40}], color: "red", floor: floorTypes.solid },
}











  //helpers
  function toIndex(x,y) {
    return ((y*mapW) + x);
  }















  //listeners
  window.onload = function() {
    const game = document.getElementById("game")
    ctx = game.getContext('2d');
    requestAnimationFrame(drawGame);
    ctx.font = "bold 10pt sans-serif";

    window.addEventListener("keydown", (e) => {
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        keysDown[e.keyCode] = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        keysDown[e.keyCode] = false;
      }
    });
    //this is setting the viewport screen area 
    viewport.screen = [game.width, game.height]

    tileset = new Image();

    tileset.onError = function(e) {
      ctx = null;
      alert(e.message);
    }

    tileset.onload = function() {
      tilesetLoaded = true
    };

    tileset.src = tilesetURL;

  };

  function drawGame() {
    if(ctx === null) return;
    if(!tilesetLoaded) {
      requestAnimationFrame(drawGame)
      return
    }
    
    const currentFrameTime = Date.now()
    const timeElapsed = currentFrameTime - lastFrameTime

    let sec = Math.floor(Date.now()/1000);
    if (sec !== currentSecond) {
      currentSecond = sec;
      framesLastSecond = frameCount;
      frameCount = 1
    } else {
      frameCount ++
    }
    //Player movement//////////////////////////////////////////////////////
    if (!player.processMovement(currentFrameTime)) {
      if((keysDown[37] && keysDown[39]) || (keysDown[38] && keysDown[40])) {
        //do nothing
        //prevent screen stuttering
      }
        //Left + up arrow
      else if ((keysDown[37] && keysDown[38]) && player.canMoveUpLeft()) {
        player.move(player.UP + player.LEFT, currentFrameTime)
      }
      //Left + down arrow
      else if ((keysDown[37] && keysDown[40]) && player.canMoveDownLeft()) {
        player.move(player.DOWN + player.LEFT, currentFrameTime)
      }
      //right + up arrow
      else if ((keysDown[39] && keysDown[38]) && player.canMoveUpRight()) {
          player.move(player.UP + player.RIGHT, currentFrameTime)
      }
      //right + down arrow
      else if ((keysDown[39] && keysDown[40]) && player.canMoveDownRight()) {
        player.move(player.DOWN + player.RIGHT, currentFrameTime)
      }
      //up arrow
      else if (keysDown[38] && player.canMoveUp()) {
        player.move(player.UP, currentFrameTime)  
      }
      //Down arrow
      else if (keysDown[40] && player.canMoveDown()) {
        player.move(player.DOWN, currentFrameTime)  
      }
      //Left arrow
      else if (keysDown[37] && player.canMoveLeft()) {
        player.move(player.LEFT, currentFrameTime)  
      }
      //right arrow
      else if (keysDown[39] && player.canMoveRight()) {
        player.move(player.RIGHT, currentFrameTime)
      }

      
      //check to see if player is moving
      if((player.tileFrom[0] !== player.tileTo[0]) || (player.tileFrom[1] !== player.tileTo[1])){
        player.timeMoved = currentFrameTime
      }
    }
   ////////////////////////////////////////////////////////////////


    viewport.update(player.position[0] + (player.dimensions[0]/2), player.position[1] + (player.dimensions[1]/2))
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

    
    
    
    //draw from map
    for(let y = viewport.startTile[1]; y <= viewport.endTile[1]; y++) {
      for(let x = viewport.startTile[0]; x <= viewport.endTile[0]; x++) {
        const tile = tileTypes[gameMap[toIndex(x,y)]];
        //causing some problems with the map - revisit later
        // if((y%16 === 0) && (x%16 !== 0) && (x%16 !== 15)) {
        //     //debugger
        //     ctx.drawImage(tileset, tile.sprite[1].x, tile.sprite[1].y, tile.sprite[1].w, tile.sprite[1].h, 
        //     (viewport.offset[0] + (x * tileW)), ( viewport.offset[1] + (y*tileH)), tileW, tileH);
        //   } else {
            ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h, 
            (viewport.offset[0] + (x * tileW)), ( viewport.offset[1] + (y*tileH)), tileW, tileH);
        //  }
      }
    }




  //render player
  ctx.fillStyle = "#0000ff";
  ctx.fillRect((viewport.offset[0] + player.position[0]), (viewport.offset[1] + player.position[1]), player.dimensions[0], player.dimensions[1]);
  
  ctx.fillStyle = "ff0000";
  ctx.fillText("FPS: " + framesLastSecond, 10, 20)
  
  lastFrameTime = currentFrameTime;
  requestAnimationFrame(drawGame)
}





