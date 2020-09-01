class Map {
  constructor(map, level) {
    this.rawMap = map;
    this.isWall = (i) => {
      if (this.rawMap[i] === 100) return false
      return this.rawMap[i] === 0 && this.rawMap[i-1] === 0 && this.rawMap[i+1] === 0
    }
    this.walkways = this.forbiddenIndicies(map)
    this.level = level;
    this.map = this.randomizeMap(map);
  }

  ramdomizer(arr, num, i){
    if(num >= 1 && num !== 100 && num !== 101) {
      const tile = Math.floor(Math.random() * 100000)
      
      const vat = 97852;
      const item = 92000;
      //const object = 94125;
      const rearWallDecoration = 87000
      
      //order matters
      if(tile >= vat && !this.walkways.includes(i)) {
        return 2
      }

      if(tile >= item && !this.walkways.includes(i)) return 3
      //if(tile >= object ) return 4
      if(tile >= rearWallDecoration && this.isWall(i - mapW)) return 5
      return 1
    } else {
      return num;
    }
  }

  // multiRandomizer() {
  //   const thing = Math.floor(Math.random()* 10) + 40
  //   debugger
  //   if(thing > 7) return 41
  //   if(thing > 4) return 42
  //   return 43
  // }

  randomizeMap(arr) {
    //let multiItem = false
    //let lastMulti = null
    const copy = arr.slice()
    return arr.map((tile, i) => {
      // if (multiItem) {
      //   multiItem = false
      //   return lastMulti
      // }
      const res = this.ramdomizer(copy, tile, i)
      if(res !== 4) return res;
      //multiItem = true;
      //lastMulti = this.multiRandomizer(); 
      //return lastMulti;
      })
  }

  forbiddenIndicies(arr) {
    const forbidden = []

    arr.forEach((val, i) => {
      if (val === 1 && i > mapW) {
        let aboveVal = arr[i-mapW]
        let rightAboveVal = arr[(i-mapW) + 1]
        let rightVal = arr[i + 1]
        let rightBelowVal = arr[(i+mapW) + 1]
        let belowVal = arr[i + mapW]
        let leftBelowVal = arr[(i+mapW) - 1]
        let leftVal = arr[i - 1]
        let leftAboveVal = arr[(i-mapW) - 1]
    
        function rightSide() {
          return rightAboveVal === 0 && rightVal === 0 && rightBelowVal === 0
        }
    
        function leftSide() {
          return leftAboveVal === 0 && leftVal === 0 && leftBelowVal === 0
        }
    
        function topSide() {
          return aboveVal === 0 && rightAboveVal === 0 && leftAboveVal === 0
        }
    
        function bottomSide() {
          return belowVal === 0 && rightBelowVal === 0 && leftBelowVal === 0
        }
    
        let dirs = [aboveVal, rightAboveVal, rightVal, rightBelowVal, belowVal, leftBelowVal, leftVal, leftAboveVal]
        if (!dirs.includes(0)) return
        if ((aboveVal === 0 && belowVal === 0) || (leftVal === 0 && rightVal === 0)) {
          forbidden.push(i)
          return
        }
        if (leftSide() || rightSide() || topSide() || bottomSide()) return
        forbidden.push(i)
      }
    })


    return forbidden
  }

  static levelComplete(playerCurrentMapIndex, gameMap) {
    return gameMap[playerCurrentMapIndex] === 101
  }

}

export default Map;