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
    this.bulletSprites = {
      "UP": [{x:192, y:192, w:47, h:47}, {x:192, y:192, w:47, h:47}],
      "DOWN": [{x:192, y:192, w:47, h:47}, {x:192, y:192, w:47, h:47}],
      "LEFT": [{x:0, y:192, w:47, h:47}, {x:0, y:192, w:47, h:47}],
      "RIGHT": [{x:0, y:192, w:47, h:47}, {x:0, y:192, w:47, h:47}],
      "UPLEFT": [{x:96, y:192, w:47, h:47}, {x:96, y:192, w:47, h:47}],
      "UPRIGHT": [{x:288, y:192, w:47, h:47}, {x:288, y:192, w:47, h:47}],
      "DOWNLEFT": [{x:288, y:192, w:47, h:47}, {x:288, y:192, w:47, h:47}],
      "DOWNRIGHT": [{x:96, y:192, w:47, h:47}, {x:96, y:192, w:47, h:47}],
    },
    this.movementAnimation = "false"
  }

}

export default Bullet