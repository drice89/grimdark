import Viewport from "./view";
import Character from "./character";
import Map from "./map";
import { levelOne } from "./levels"
import { FLOORTYPES, TILETYPES, DIRECTIONS } from "./util"

class Game {
  constructor(viewportDimensions) {
    this.gameMap = new Map(levelOne)
    this.player = new Character()
    this.viewport = new Viewport(viewportDimensions) //game.width, game.height
    this.keysDown = {
      37: false, //left arrow
      39: false, //right arrow
      38: false, //up arrow
      40: false, //down arrow
    }
    // this.floorTypes = {
    //   solid: 1,
    //   open: 0
    // }
    // this.tileTypes = {
    //   0: { name: "wall", sprite:[{x:288, y:96, w:48, h:48}], floor: this.floorTypes.solid },
    //   1: { name: "tile", sprite:[{x:144, y:432, w:48, h:48}], floor: this.floorTypes.open },
    //   2: { name: "keycard", sprite:[{x: 0, y:112, w:16, h:16}], floor: this.floorTypes.open },
    //   3: { name: "item", sprite:[{x: 0, y:0, w:16, h:16}], floor: this.floorTypes.open },
    //   41: { name: "table", sprite:[{x: 0, y:32, w:16, h:16}], floor: this.floorTypes.solid },
    //   42: { name: "vat", sprite:[{x: 48, y:32, w:16, h:16}], floor: this.floorTypes.solid },
    //   43: { name: "crate", sprite:[{x: 16, y:32, w:16, h:16}], floor: this.floorTypes.open },
    //   5: { name: "computer", sprite:[{x: 64, y:32, w:16, h:16}], floor: this.floorTypes.solid },
    // }

    // this.DIRECTIONS = {
    //   "UP": [0, -1],
    //   "DOWN": [0, 1],
    //   "LEFT": [-1, 0],
    //   "RIGHT": [1,0],
    //   "UPLEFT": [-1,-1],
    //   "UPRIGHT": [1, -1],
    //   "DOWNLEFT": [-1, 1],
    //   "DOWNRIGHT": [1, 1]
    // }

    this.drawGame = () => {
    //move this out to index?
    

    if(window.ctx === null) return;
    if(!window.tilesetLoaded || !window.monsterSetLoaded) {
      requestAnimationFrame(this.drawGame)
      console.log(monsterSetLoaded)
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
    if (!this.player.processMovement(currentFrameTime)) {
      if((this.keysDown[37] && this.keysDown[39]) || (this.keysDown[38] && this.keysDown[40])) {
        //do nothing
        //prevent screen stuttering
      }
        //Left + up arrow
      else if ((this.keysDown[37] && this.keysDown[38]) && this.isValidMove(DIRECTIONS.UPLEFT, TILETYPES, FLOORTYPES)) {
        this.player.move(DIRECTIONS.UPLEFT, currentFrameTime)
      }
      //Left + down arrow
      else if ((this.keysDown[37] && this.keysDown[40]) && this.isValidMove(DIRECTIONS.DOWNLEFT, TILETYPES, FLOORTYPES)) {
        this.player.move(DIRECTIONS.DOWNLEFT, currentFrameTime)
      }
      //right + up arrow
      else if ((this.keysDown[39] && this.keysDown[38]) && this.isValidMove(DIRECTIONS.UPRIGHT, TILETYPES, FLOORTYPES)) {
        this.player.move(DIRECTIONS.UPRIGHT, currentFrameTime)
      }
      //right + down arrow
      else if ((this.keysDown[39] && this.keysDown[40]) && this.isValidMove(DIRECTIONS.DOWNRIGHT, TILETYPES, FLOORTYPES)) {
        this.player.move(DIRECTIONS.DOWNRIGHT, currentFrameTime)
      }
      //up arrow
      else if (this.keysDown[38] && this.isValidMove(DIRECTIONS.UP, TILETYPES, FLOORTYPES)) {
        this.player.move(DIRECTIONS.UP, currentFrameTime)  
      }
      //Down arrow
      else if (this.keysDown[40] && this.isValidMove(DIRECTIONS.DOWN, TILETYPES, FLOORTYPES)) {
        this.player.move(DIRECTIONS.DOWN, currentFrameTime)  
      }
      //Left arrow
      else if (this.keysDown[37] && this.isValidMove(DIRECTIONS.LEFT, TILETYPES, FLOORTYPES)) {
        this.player.move(DIRECTIONS.LEFT, currentFrameTime)  
      }
      //right arrow
      else if (this.keysDown[39] && this.isValidMove(DIRECTIONS.RIGHT, TILETYPES, FLOORTYPES)) {
        this.player.move(DIRECTIONS.RIGHT, currentFrameTime)
      }

      
      //check to see if player is moving
      if((this.player.tileFrom[0] !== this.player.tileTo[0]) || (this.player.tileFrom[1] !== this.player.tileTo[1])){
        this.player.timeMoved = currentFrameTime
      }
    }
   ////////////////////////////////////////////////////////////////


    this.viewport.update(this.player.position[0] + (this.player.dimensions[0]/2), 
                          this.player.position[1] + (this.player.dimensions[1]/2))
    
    //viewport image
    this.renderViewportImage()
    //draw from map
    for(let y = this.viewport.startTile[1]; y <= this.viewport.endTile[1]; y++) {
      for(let x = this.viewport.startTile[0]; x <= this.viewport.endTile[0]; x++) {
        const tile = TILETYPES[this.gameMap.map[this.toIndex(x,y)]];
        // const random = Math.floor(Math.random() * 6) + 1;
        // const tileSpriteX = (tile.name === "wall") || (tile.name === "tile") ? tile.sprite[0][1].x : tile.sprite[0].x;
        // const tileSpriteY = (tile.name === "wall") || (tile.name === "tile") ? tile.sprite[0][1].y : tile.sprite[0].y;
        // const tileSpriteW = (tile.name === "wall") || (tile.name === "tile") ? tile.sprite[0][1].y : tile.sprite[0].w;
        // const tileSpriteH = (tile.name === "wall") || (tile.name === "tile") ? tile.sprite[0][1].w : tile.sprite[0].h;
        //causing some problems with the map - revisit later
        // if((y%16 === 0) && (x%16 !== 0) && (x%16 !== 15)) {
        //     //debugger
        //     window.ctx.drawImage(tileset, tile.sprite[1].x, tile.sprite[1].y, tile.sprite[1].w, tile.sprite[1].h, 
        //     (viewport.offset[0] + (x * tileW)), ( viewport.offset[1] + (y*tileH)), tileW, tileH);
        //   } else {
            window.ctx.drawImage(window.tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h, 
            (this.viewport.offset[0] + (x * tileW)), (this.viewport.offset[1] + (y*tileH)), tileW, tileH);
        //  }
      }
    }
    this.renderPlayer()
    window.ctx.fillStyle = "ff0000";
    window.ctx.fillText("FPS: " + framesLastSecond, 10, 20)
  
    lastFrameTime = currentFrameTime;
    requestAnimationFrame(this.drawGame)
   }
  }

  renderPlayer() {
    let spriteIndex = (this.player.movementAnimation) ? 0 : 1
    window.ctx.drawImage(window.monsterSet, this.player.playerSprites[this.player.facing][spriteIndex].x, this.player.playerSprites[this.player.facing][spriteIndex].y, this.player.playerSprites[this.player.facing][spriteIndex].w, this.player.playerSprites[this.player.facing][spriteIndex].h,  (this.viewport.offset[0] + this.player.position[0]), (this.viewport.offset[1] + this.player.position[1]), this.player.dimensions[0], this.player.dimensions[1]);
  }


  renderViewportImage() {
     window.ctx.drawImage(window.spaceImage, 0, 0, 800, 800,  0, 0, this.viewport.screen[0], this.viewport.screen[1]);
  }

  toIndex(x,y) {
    return ((y*mapW) + x);
  }


  isValidMove(direction, TILETYPES, FLOORTYPES) {
    const x = this.player.tileFrom[0] + direction.DIRS[0];
    const y = this.player.tileFrom[1] + direction.DIRS[1]
    if(x < 0 || x > (mapW-1) || y < 0 || y > mapH-1) return false;
    //debugger
    if(TILETYPES[this.gameMap.map[this.toIndex(x,y)]].floor !== FLOORTYPES.open) return false;
    return true;
  }

}
  

export default Game;