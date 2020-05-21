import Character from "./character"
class Bullet extends Character {
  constructor() {
    super()
    this.direction = null
    this.position = null
    this.tileFrom = null
    this.tileTo = null
    this.sprite = {}
    this.position = null
    this.delayMove = 000;
    this.facing = null
    this.monsterSprites = {
      "UP": [{x:96, y:576, w:47, h:47}, {x:96, y:624, w:47, h:47}],
      "DOWN": [{x:48, y:576, w:47, h:47}, {x:48, y:624, w:47, h:47}],
      "LEFT": [{x:144, y:576, w:47, h:47}, {x:144, y:624, w:47, h:47}],
      "RIGHT": [{x:0, y:576, w:47, h:47}, {x:0, y:624, w:47, h:47}],
    }
    this.movementAnimation = "false"
  }
}