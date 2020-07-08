class Pregame {
  constructor() {
    this.ship = {x:240, y:334, w:48, h:49};
    this.shipPositionX = 400;
    this.shipPositionY = [315, 312];
    this.gameStart = false
    this.drawPregame = () => {
      window.ctx.clearRect(0,0,800,800)
      if (this.gameStart) return;
      let sec = Math.floor(Date.now()/1000);
      window.ctx.drawImage(window.spaceSet, this.ship.x, this.ship.y, this.ship.w, this.ship.h, this.shipPositionX, !(sec%2) ? this.shipPositionY[0] : this.shipPositionY[1], 48, 48)
      requestAnimationFrame(this.drawPregame);
    }
  }
}

export default Pregame