class Map {
  constructor(map) {
    this.map = this.randomizeMap(map)
  }

  ramdomizer(num, i){
    if(num >= 1 && num !== 100 && num !== 101) {
      const tile = Math.floor(Math.random() * 100000)
      
      const keycard = 99852;
      const item = 99751;
      const object = 99125;
      const rearWallDecoration = 91000
      
      //order matters
      if(tile >= keycard) {
        return 2
      }

      if(tile >= item) return 3
      if(tile >= object ) return 4
      if(tile >= rearWallDecoration && (((i - (i%mapW))/mapW)%16) === 1) return 5
      return 1
    } else {
      return num;
    }
  }

  multiRandomizer() {
    const thing = Math.floor(Math.random()* 10) + 40
    if(thing > 7) return 41
    if(thing > 4) return 42
    return 43
  }

  randomizeMap(arr) {
    let multiItem = false
    let lastMulti = null
    return arr.map((tile, i) => {
      if (multiItem) {
        multiItem = false
        return lastMulti
      }
      const res = this.ramdomizer(tile, i)
      if(res !== 4) return res;
      multiItem = true;
      lastMulti = this.multiRandomizer(); 
      return lastMulti;
      })
  }

  static levelComplete(playerCurrentMapIndex, gameMap) {
    return gameMap[playerCurrentMapIndex] === 101
  }
}

export default Map;