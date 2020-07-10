export const FLOORTYPES = {
    solid: 1,
    open: 0
  }
export const TILETYPES = {
    0: { name: "wall", sprite:[{x:288, y:96, w:48, h:48},{x: 0, y: 96, w:48, h:48}], floor: FLOORTYPES.solid },
    1: { name: "tile", sprite:[{x:144, y:432, w:48, h:48}], floor: FLOORTYPES.open },
    2: { name: "keycard", sprite:[{x: 0, y:112, w:16, h:16}], floor: FLOORTYPES.open },
    3: { name: "item", sprite:[{x: 0, y:0, w:16, h:16}], floor: FLOORTYPES.open },
    41: { name: "table", sprite:[{x: 48, y:912, w:47, h:47}], floor: FLOORTYPES.solid },
    42: { name: "vat", sprite:[{x: 144, y:816, w:47, h:47}], floor: FLOORTYPES.solid },
    43: { name: "crate", sprite:[{x: 0, y:816, w:47, h:47}], floor: FLOORTYPES.open },
    5: { name: "computer", sprite:[{x:192, y:816, w:47, h:47}], floor: FLOORTYPES.solid },
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
  interfaceUrl: "./assets/tiny_galaxy_interface_3x.png"
} 