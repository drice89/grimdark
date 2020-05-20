export const FLOORTYPES = {
    solid: 1,
    open: 0
  }
export const TILETYPES = {
    0: { name: "wall", sprite:[{x:288, y:96, w:48, h:48}], floor: FLOORTYPES.solid },
    1: { name: "tile", sprite:[{x:144, y:432, w:48, h:48}], floor: FLOORTYPES.open },
    2: { name: "keycard", sprite:[{x: 0, y:112, w:16, h:16}], floor: FLOORTYPES.open },
    3: { name: "item", sprite:[{x: 0, y:0, w:16, h:16}], floor: FLOORTYPES.open },
    41: { name: "table", sprite:[{x: 0, y:32, w:16, h:16}], floor: FLOORTYPES.solid },
    42: { name: "vat", sprite:[{x: 48, y:32, w:16, h:16}], floor: FLOORTYPES.solid },
    43: { name: "crate", sprite:[{x: 16, y:32, w:16, h:16}], floor: FLOORTYPES.open },
    5: { name: "computer", sprite:[{x: 64, y:32, w:16, h:16}], floor: FLOORTYPES.solid },
  }

export const DIRECTIONS = {
    UP: { DIRS: [0, -1], FACING: "UP" },
    DOWN: { DIRS: [0, 1], FACING: "DOWN" },
    LEFT: { DIRS: [-1, 0], FACING: "LEFT" },
    RIGHT: { DIRS: [1,0], FACING: "RIGHT" },
    UPLEFT: { DIRS: [-1,-1], FACING: "LEFT" },
    UPRIGHT: { DIRS: [1, -1], FACING: "RIGHT" },
    DOWNLEFT: { DIRS: [-1, 1], FACING: "LEFT" },
    DOWNRIGHT: { DIRS: [1, 1], FACING: "RIGHT" },
  }

