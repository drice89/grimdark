import Viewport from "./view";
import Character from "./character";
import Map from "./map";
import * as levels from "./levels"
import { FLOORTYPES, TILETYPES, DIRECTIONS, gameSoundFx } from "./util"
import Monster from "./monsters"
import Bullet from "./bullets"
import DeadMonster from "./deadMonsters"

class Game {
  constructor(viewportDimensions, level) {
    this.gameStatus = "active"
    this.level = level
    this.gameMap = new Map(levels[`level${this.level}`], this.level)
    this.player = new Character()
    this.viewport = new Viewport(viewportDimensions)
    this.bullets = []
    this.keysDown = {
      32: false, //spacebar
      37: false, //left arrow
      39: false, //right arrow
      38: false, //up arrow
      40: false, //down arrow
    }
    this.monsters = {}
    this.deadMonsters = []
    this.spawnRate = 7 - level
    this.maxSpawns = 400 + (100 * level)
    this.currentSpawns = 0
    this.score = 0
    this.key = null
    this.drawGame = () => {

    if(ctx === null) return;
    if(!tilesetLoaded || !monsterSetLoaded || !fxSetLoaded) {
      requestAnimationFrame(this.drawGame)
      return;
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

    //////// generate bullet
    if(this.keysDown[32] && (currentFrameTime - this.player.lastBulletFired) > this.player.rateOfFire) {
      
      let bullet = new Bullet(this.player.facing)
      bullet.placeAt(this.player.tileFrom[0] + (DIRECTIONS[bullet.facing].DIRS[0]), this.player.tileFrom[1] + (DIRECTIONS[bullet.facing].DIRS[1]))
      gameSoundFx("singleShot")
      this.bullets.push(bullet)
      this.player.lastBulletFired = currentFrameTime
    }

    this.viewport.update(this.player.position[0] + (this.player.dimensions[0]/2), 
    this.player.position[1] + (this.player.dimensions[1]/2))
    this.renderViewportImage()
    this.renderMap()
    this.moveAndRenderBullets(currentFrameTime)
    //// generate monster
    if (!(sec%this.spawnRate) && this.currentSpawns < this.maxSpawns) this.placeMonster(TILETYPES,FLOORTYPES)
  
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

    //monsters
    
    let monsterMap = {}
    for(let monster in this.monsters) {
      monster = this.monsters[monster]

      //if monster is dead then do not render
      if (!monster.alive) {
        //see if key drops
        if (!this.key && !this.player.keyCard) {
          const randomlyDropKeyAtDeathPosition = monster.dropKey()
          if (randomlyDropKeyAtDeathPosition) {
            this.key = randomlyDropKeyAtDeathPosition
            gameSoundFx("keyCardPickup")
          }
        }
        
      //add to dead monsters list to process death animation
        this.deadMonsters.push(new DeadMonster(monster.position, currentFrameTime))

        continue;
      }

      if(!monster.processMovement(currentFrameTime)) {
        
        let direction = DIRECTIONS[monster.determineDirection(this.player.position)]
        //Loss condition here - if direction is blank then we know the monster is at the same position as the player
        if (!direction) {
          this.renderMonster(monster)
          this.gameStatus = "loss"
          window.ctx.font = "bold 70pt 'Creepster'";
          ctx.fillText("GAME OVER", 215, 370, 473, 171)
          gameSoundFx("death")
          music.pause()
          return;
        }
        let i = 2
        while(!monster.isValidMonsterMove(this.gameMap, direction, this.monsters, monsterMap) && i > 0) {
          //make 4 attempts to change direction
          direction = DIRECTIONS[Monster.resolveCollision(direction)]
          i -= 1

        }
        if(i > 0 ) monster.move(direction, currentFrameTime)

      }
      this.renderMonster(monster);
      //might be redundant
      if (monster.alive) monsterMap[this.toIndex(...monster.tileTo)] = monster;
    }
    this.monsters = monsterMap;
    //render and pick up key //
    if (this.key) this.renderKey();
    if (this.key && (this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]) === Math.floor(this.toIndex(this.key[0], this.key[1])))) {
      this.player.keyCard = true;
      gameSoundFx("openDoors")
      this.key = null
    }
    //////////////////////////
    this.renderDeadMonsterAnimations(currentFrameTime)
    this.renderPlayer();
    this.renderHud(framesLastSecond);
    lastFrameTime = currentFrameTime;
    //check for win condition
    if (this.player.keyCard && Map.levelComplete(this.toIndex(this.player.tileTo[0], this.player.tileTo[1]), this.gameMap.map)) {
      this.gameStatus = this.level === 5 ? "endgame" :"win"
      window.ctx.font = "bold 60pt 'Creepster'";
      window.ctx.fillText("LEVEL COMPLETED!", 170, 340, 473, 171)
      return this.gameStatus;
    }
    requestAnimationFrame(this.drawGame);
   }
  }


  increaseScore() {
    this.currentSpawns -= 1
    this.score += 1
  }

  renderPlayer() {
    let spriteIndex = (this.player.movementAnimation) ? 0 : 1
    window.ctx.drawImage(window.monsterSet, this.player.playerSprites[this.player.facing][spriteIndex].x, this.player.playerSprites[this.player.facing][spriteIndex].y, this.player.playerSprites[this.player.facing][spriteIndex].w, this.player.playerSprites[this.player.facing][spriteIndex].h,  (this.viewport.offset[0] + this.player.position[0]), (this.viewport.offset[1] + this.player.position[1]), this.player.dimensions[0], this.player.dimensions[1]);
  }
  renderMonster(monster) {
    let spriteIndex = (monster.movementAnimation) ? 0 : 1
    window.ctx.drawImage(window.monsterSet, monster.monsterSprites[monster.facing][spriteIndex].x, monster.monsterSprites[monster.facing][spriteIndex].y, monster.monsterSprites[monster.facing][spriteIndex].w, monster.monsterSprites[monster.facing][spriteIndex].h, (this.viewport.offset[0] + monster.position[0]), (this.viewport.offset[1]+ monster.position[1]), monster.dimensions[0], monster.dimensions[1]);
  }


  renderViewportImage() {
     window.ctx.drawImage(window.spaceImage, 0, 0, 800, 800,  0, 0, this.viewport.screen[0], this.viewport.screen[1]);
  }

  toIndex(x,y) {
    return ((y*mapW) + x);
  }

  //This function should be moved into the map
  isValidMove(direction, TILETYPES, FLOORTYPES) {
    const x = this.player.tileFrom[0] + direction.DIRS[0];
    const y = this.player.tileFrom[1] + direction.DIRS[1]
    if(x < 0 || x > (mapW-1) || y < 0 || y > mapH-1) return false;
    if(TILETYPES[this.gameMap.map[this.toIndex(x,y)]].floor !== FLOORTYPES.open) return false;
    return true;
  }

  // isValidMonsterMove(monster, direction, TILETYPES, FLOORTYPES) {
  //   const x = monster.tileFrom[0] + direction.DIRS[0];
  //   const y = monster.tileFrom[1] + direction.DIRS[1];
  //   if(x < 0 || x > (mapW-1) || y < 0 || y > mapH-1) return false;
  //   if(TILETYPES[this.gameMap.map[this.toIndex(x,y)]].floor !== FLOORTYPES.open) return false;
  //   if (this.monsters[this.gameMap.map[this.toIndex(x,y)]]) return false;
  //   return true;
  // }
  

  renderMap() {
    for(let y = this.viewport.startTile[1]; y <= this.viewport.endTile[1]; y++) {
      for(let x = this.viewport.startTile[0]; x <= this.viewport.endTile[0]; x++) {
        const index = this.toIndex(x,y)
        if (this.gameMap.map[index] === 100 && this.player.keyCard) this.gameMap.map[index] = 101
        const tile = TILETYPES[this.gameMap.map[index]];
        const spriteIndex = tile.name === "wall" && this.gameMap.map[index + 64] ? 1 : 0
        try {
          window.ctx.drawImage(window.tileset, tile.sprite[spriteIndex].x, tile.sprite[spriteIndex].y, tile.sprite[spriteIndex].w, tile.sprite[spriteIndex].h, 
            (this.viewport.offset[0] + (x * tileW)), (this.viewport.offset[1] + (y*tileH)), tileW, tileH);
          } catch(err) {
            console.log(err + " at map index " + this.gameMap.map[index + 64])
          }
      }
    }
  }

  renderHud(framesLastSecond) {
    window.ctx.drawImage(window.interface, 574, 285, 145, 60, 10, 10, 130, 100);
    window.ctx.fillStyle = "#980598";
    window.ctx.fillText("FPS: " + framesLastSecond, 45, 35);
    window.ctx.fillText("SCORE: " + this.score, 45, 60);
    window.ctx.fillText(`LEVEL: ${this.level}`, 45, 85);
    //This is controling the shadow around the sprites as well
    window.ctx.shadowOffestX = 1
    window.ctx.shadowOffestY = 1
    window.ctx.shadowColor = "#980598";
    window.ctx.shadowBlur = 1;

  }

  placeMonster(TILETYPES,FLOORTYPES) {
    const playerPosition = this.player.tileFrom
    const newMonsterPosition = () => [Math.floor(Math.random() * mapH - 1) + 1, Math.floor(Math.random() * mapW - 1) + 1]
    const validateMonsterPlacement = (position) => {
      if (Math.abs(position[0] - playerPosition[0]) <= 1 || Math.abs(position[1] - playerPosition[1]) <= 1) return false
      if(TILETYPES[this.gameMap.map[this.toIndex(...position)]].floor !== FLOORTYPES.open) return false
      return true
    }
    let monsterPosition = newMonsterPosition()
    while (!validateMonsterPlacement(monsterPosition)) {
      monsterPosition = newMonsterPosition()
    }
    const monster = new Monster(this.level)
    monster.placeAt(...monsterPosition)
    this.monsters[this.toIndex(...monsterPosition)] = monster
    this.currentSpawns += 1
  }
  
  moveAndRenderBullets(currentFrameTime) {
  let bullets = []
  
    if (this.bullets.length > 0) {
     for(let bullet of this.bullets) {
  
      if (bullet.detectCollision(this.monsters)) this.increaseScore()

      if(bullet.isValidMove(this.gameMap)) {
        if(!bullet.processMovement(currentFrameTime)) {
          bullet.move(DIRECTIONS[bullet.facing], currentFrameTime)
        }
        bullets.push(bullet)
    }

  
      let spriteIndex = (bullet.movementAnimation) ? 0 : 1
      window.ctx.drawImage(window.fxSet, bullet.bulletSprites[bullet.facing][spriteIndex].x, bullet.bulletSprites[bullet.facing][spriteIndex].y, bullet.bulletSprites[bullet.facing][spriteIndex].w, bullet.bulletSprites[bullet.facing][spriteIndex].h, (this.viewport.offset[0] + bullet.position[0]), (this.viewport.offset[1]+ bullet.position[1]), bullet.dimensions[0], bullet.dimensions[1]);

     }
    } 
   this.bullets = bullets
  }

  renderKey() {
    const [x, y] = this.key
    const pos = [x * tileW, y * tileH]
    window.ctx.drawImage(window.items, 390, 0, 48, 48, (this.viewport.offset[0] + pos[0]), (this.viewport.offset[1] + pos[1]), 48, 48)
  }

  renderDeadMonsterAnimations(sec) {
    let deadMonsters = []
    this.deadMonsters.forEach(deadMonster => {
      window.ctx.drawImage(window.fxSet, deadMonster.sprite[0].x, deadMonster.sprite[0].y, deadMonster.sprite[0].w, deadMonster.sprite[0].h, (this.viewport.offset[0] + deadMonster.position[0]), (this.viewport.offset[1] + deadMonster.position[1]), 48, 48)
      deadMonster.changeAnimation(sec)
      if (!deadMonster.expired) deadMonsters.push(deadMonster)
    })
    this.deadMonsters = deadMonsters
  }
}


  

export default Game;


