import Character from "./character"

class Bullet extends Character {
  constructor(direction) {
    super()
    this.position = null,
    this.tileFrom = null,
    this.tileTo = null,
    this.sprite = {},
    this.position = null,
    this.delayMove = 0,
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

}

export default Bullet