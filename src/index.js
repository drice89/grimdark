import Game from "./game"

const tileW = window.tileW = 48
const tileH = window.tileH = 48;
const mapW = window.mapW = 64;
const mapH = window.mapH = 64;
window.tileset = new Image();
window.monsterSet = new Image();
window.spaceImage = new Image()
const assetUrls ={
  tilesetURL: "./assets/tiny_galaxy_world.png",
  characterTilesetUrl: "./assets/tiny_galaxy_monsters.png",
  spaceImageUrl: "./assets/space.png",
} 
window.ctx = null
window.tilesetLoaded = false 
window.monsterSetLoaded = false; 
window.currentSecond = 0, 
window.frameCount = 0, 
window.framesLastSecond = 0;
window.lastFrameTime = 0;


window.onload = function() {
  /// revisit

  window.tileset.onerror = function(e) {
    window.ctx = null;
    alert(e.message);
  }
  
  window.monsterSet.onerror = function(e) {
    window.ctx = null;
    alert(e.message);
  }

  window.spaceImage.onerror = function(e) {
    window.ctx = null;
    alert(e.message);
  }
  
  window.tileset.onload = function() { window.tilesetLoaded = true };
  window.monsterSet.onload = function() { window.monsterSetLoaded = true }
  //revisit 

  window.tileset.src = assetUrls.tilesetURL;
  window.monsterSet.src = assetUrls.characterTilesetUrl;
  window.spaceImage.src = assetUrls.spaceImageUrl;
  const game = document.getElementById("game")
  window.ctx = game.getContext('2d');
  const newGame = new Game([game.width, game.height])
  window.ctx.font = "bold 10pt sans-serif";
  
  window.addEventListener("keydown", (e) => {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      newGame.keysDown[e.keyCode] = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      newGame.keysDown[e.keyCode] = false;
    }
  });
  //this is setting the viewport screen area 
  
  requestAnimationFrame(newGame.drawGame);
};



//viewport











// const interiorWalls = {
//   1: {x:144, y:0, w:48, h:48},
//   2: {x:112, y:0, w:16, h:16},
//   3: {x:128, y:0, w:16, h:16},
//   4: {x:144, y:0, w:16, h:16},
//   5: {x:160, y:0, w:16, h:16},
//   6: {x:176, y:0, w:16, h:16},
// }

// const floorTiles = {
//   1: {x:0, y:16, w:48, h:48},
//   2: {x:112, y:16, w:16, h:16},
//   3: {x:128, y:16, w:16, h:16},
//   4: {x:144, y:16, w:16, h:16},
//   5: {x:160, y:16, w:16, h:16},
//   6: {x:176, y:16, w:16, h:16},
// }



  //listeners
  









