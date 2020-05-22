import Character from "./character"
import { DIRECTIONS, TILETYPES, FLOORTYPES } from "./util"

class Bullet extends Character {
  constructor(direction) {
    super()
    this.valid = true;
    this.position = null,
    this.tileFrom = null,
    this.tileTo = null,
    this.sprite = {},
    this.position = null,
    this.delayMove = 100,
    this.facing = direction,
    this.dimensions = direction === "LEFT" || direction === "RIGHT" ? [12, 3] :
      direction === "UP" || direction === "DOWN" ? [3, 12] : [9, 10],
    this.bulletSprites = {
      "UP": [{x:212, y:210, w:3, h:12}, {x:212, y:210, w:3, h:12}],
      "DOWN": [{x:212, y:210, w:3, h:12}, {x:212, y:210, w:3, h:12}],
      "LEFT": [{x:18, y:213, w:12, h:3}, {x:18, y:213, w:12, h:3}],
      "RIGHT": [{x:18, y:213, w:12, h:3}, {x:18, y:213, w:12, h:3}],
      "UPLEFT": [{x:116, y:209, w:9, h:10}, {x:116, y:209, w:9, h:10}],
      "UPRIGHT": [{x:305, y:209, w:9, h:10}, {x:305, y:209, w:9, h:10}],
      "DOWNLEFT": [{x:305, y:209, w:9, h:10}, {x:305, y:209, w:9, h:10}],
      "DOWNRIGHT": [{x:116, y:209, w:9, h:10}, {x:116, y:209, w:9, h:10}],
    },
    this.movementAnimation = "false"
  }

  detectCollision(monsters){
    const dirs = DIRECTIONS[this.facing].DIRS
    const indexOfNextPosition = ((this.tileTo[1] + dirs[1]) * mapW) + this.tileTo[0] + dirs[0]
    const monsterCurrentPosition = monsters[this.currentPosition()]
    const monsterNextPosition = monsters[indexOfNextPosition]
    //console.log(dirs)
    //console.log("bullet current position", monsterCurrentPosition)
    //console.log("bullet next position", monsterNextPosition )


    if (monsterCurrentPosition) monsterCurrentPosition.alive = false
    if (monsterNextPosition) monsterNextPosition.alive = false

    if (monsterCurrentPosition || monsterNextPosition) {
      return true
    }

    return false
  }

  isValidMove(gameMap, direction = DIRECTIONS[this.facing]) {
    const x = this.tileFrom[0] + direction.DIRS[0];
    const y = this.tileFrom[1] + direction.DIRS[1]
    if (x < 0 || x > (mapW-1) || y < 0 || y > mapH-1) return false;
    if(TILETYPES[gameMap.map[this.toIndex(x,y)]].floor !== FLOORTYPES.open) return false;
    return true
  }

}

export default Bullet