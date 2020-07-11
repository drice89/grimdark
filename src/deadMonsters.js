class DeadMonster {
  constructor(position, currentSecond) {
    this.position = position
    this.animationBeginTime = currentSecond
    this.animationExpiration = this.animationBeginTime + 50
    this.expired = false
    this.sprite = [{x: 384, y:96, w: 48, h: 48}, {x: 432, y:96, w: 48, h: 48}, {x: 480, y:96, w: 48, h: 48}]
  }

  changeAnimation(currentSecond) {
    if (currentSecond > this.animationExpiration) {
      this.sprite.shift();
      this.animationExpiration = currentSecond + 50
      if (!this.sprite.length) {
        this.expired = true
      }
    }
  }

  
  
}

export default DeadMonster