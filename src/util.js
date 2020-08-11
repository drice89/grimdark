export const FLOORTYPES = {
    solid: 1,
    open: 0
  }
export const TILETYPES = {
    0: { name: "wall", sprite:[{x:288, y:96, w:48, h:48},{x: 0, y: 96, w:48, h:48}], floor: FLOORTYPES.solid },
    1: { name: "tile", sprite:[{x:144, y:432, w:48, h:48}], floor: FLOORTYPES.open },
    2: { name: "vat", sprite:[{x: 144, y:816, w:48, h:48}], floor: FLOORTYPES.solid },
    3: { name: "crate", sprite:[{x: 0, y:816, w:48, h:48}], floor: FLOORTYPES.open },
    5: { name: "computer", sprite:[{x:192, y:816, w:47, h:47}], floor: FLOORTYPES.solid },
    41: { name: "table", sprite:[{x: 48, y:912, w:47, h:47}], floor: FLOORTYPES.solid },
    100: {name: "closed_door", sprite: [{x:384, y:911, w:48, h:48}], floor: FLOORTYPES.solid},
    101: {name: "open_door", sprite: [{x:432, y:911, w:48, h:48}], floor: FLOORTYPES.open}
  }


export const DIRECTIONS = {
    UP: { DIRS: [0, -1], FACING: "UP" },
    DOWN: { DIRS: [0, 1], FACING: "DOWN" },
    LEFT: { DIRS: [-1, 0], FACING: "LEFT" },
    RIGHT: { DIRS: [1,0], FACING: "RIGHT" },
    UPLEFT: { DIRS: [-1,-1], FACING: "UPLEFT" },
    UPRIGHT: { DIRS: [1, -1], FACING: "UPRIGHT" },
    DOWNLEFT: { DIRS: [-1, 1], FACING: "DOWNLEFT" },
    DOWNRIGHT: { DIRS: [1, 1], FACING: "DOWNRIGHT" },
  }

export const ASSETURLS = {
  tilesetUrl: "./assets/tiny_galaxy_world.png",
  characterTilesetUrl: "./assets/tiny_galaxy_monsters.png",
  fxSetUrl: "./assets/tiny_galaxy_fx.png",
  spaceImageUrl: "./assets/space.png",
  hootsforce: "./assets/Gloryhammer-hootsforce.mp3",
  gameOver: "./assets/gameover.png",
  spaceSet: "./assets/tiny_galaxy_space_3x.png",
  interfaceUrl: "./assets/tiny_galaxy_interface_3x.png",
  itemsUrl: "./assets/tiny_galaxy_items_3x.png",
  singleShot: "./assets/gunShot.mp3",
  keyCardPickup: "./assets/keyCardPickup.wav",
  monsterPop: "./assets/monsterPop.wav",
  openDoors: "./assets/openDoors.wav",
  death: "./assets/death.wav"
} 

export const gameSoundFx = (assetKey) => {
  let audio = new Audio(ASSETURLS[assetKey])
  if (assetKey === "singleShot") {
    audio.volume = .5
  } else {
    audio.volume = .15
  }
  audio.play()
}

// export const gameMusic = () => {
//   let audio = new Audio(ASSETURLS.hootsforce)
//   audio.volume = 0.2
//   audio.play()
//   return audio
// }