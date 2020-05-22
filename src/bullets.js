import Character from "./character"
import { DIRECTIONS } from "./util"

class Bullet extends Character {
  constructor(direction) {
    super()
    this.position = null,
    this.tileFrom = null,
    this.tileTo = null,
    this.sprite = {},
    this.position = null,
    this.delayMove = 50,
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

    if (monsterCurrentPosition) monsterCurrentPosition.alive = false
    if (monsterNextPosition) monsterNextPosition.alive = false

    if (monsterCurrentPosition || monsterNextPosition) {
      return true
    }

    return false
  }

}

export default Bullet