import Character from "./character"
import { DIRECTIONS, FLOORTYPES, TILETYPES } from "./util"

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

  isValidMonsterMove(gameMap, direction = DIRECTIONS[this.facing], monstersLast, monstersNext) {
    const x = this.tileFrom[0] + direction.DIRS[0];
    const y = this.tileFrom[1] + direction.DIRS[1]
    if (x < 0 || x > (mapW-1) || y < 0 || y > mapH-1) return false;
    if(TILETYPES[gameMap.map[this.toIndex(x,y)]].floor !== FLOORTYPES.open) return false;
    if (monstersLast[this.toIndex(x,y)] || monstersNext[this.toIndex(x,y)]) {
      return false;
    }
    return true
  }

  static resolveCollision(direction) {
    let randomDirection = () => {
      return Math.floor(Math.random() * 8) + 1
    }
    const directions = {
      1: "UP",
      2: "UPRIGHT",
      3: "UPLEFT",
      4: "DOWNLEFT",
      5: "DOWNRIGHT",
      6: "RIGHT",
      7: "DOWN",
      8: "LEFT",
    }

    let newDirection = directions[randomDirection()]
    debugger
    while (newDirection === direction.FACING) {
      newDirection = directions[randomDirection()]
    }

    return newDirection
    
  }

  
}

export default Monster

