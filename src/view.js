class Viewport {
  constructor(viewportDimensions) {
      //dimensions of canvas
    this.screen = viewportDimensions,
    //top left tile
    this.startTile = [0,0],
    //bottom right tile
    this.endTile = [0,0],
    //x and y offeset from the beginning of the screen
    this.offset = [0,0]
  }
  update(px, py) {
    //px and py are the center of the visible area to the camera
    //drawing area with/2 - camera horizontal offeset
    this.offset[0] = Math.floor((this.screen[0]/2) - px);
    //dawing area height/2 - camera vertical offser
    this.offset[1] = Math.floor((this.screen[1]/2) - py);

    //this is the x, y value of the tile at the center
    const tile = [Math.floor(px/tileW), Math.floor(py/tileH)]
    //based on center tile defined by camera. horizontal value 
    //[first tile X] = [center tile X] - 1 - Round Up(([Canvas width] / 2) / [tile width]); x - 9
    this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0]/2) /tileW);
    // first tile y = center tile y -  9
    this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1]/2) /tileH);
    if(this.startTile[0] < 0) this.startTile[0] = 0;
    if(this.startTile[1] < 0) this.startTile[1] = 0;

    //x + 9
    this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2) /tileW);
    // y + 9
    this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[0]/2) /tileH);

    if(this.endTile[0] >= mapW) this.endTile[0] = mapW - 1;
    if(this.endTile[1] >= mapH) this.endTile[1] = mapH - 1;

  }
}

export default Viewport;
