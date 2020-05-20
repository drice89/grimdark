/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/character.js":
/*!**************************!*\
  !*** ./src/character.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n////Character\nclass Character {\n  constructor() {\n    this.tileFrom = [1,1];\n    this.tileTo = [1,1];\n    //also affects movement speed \n    this.timeMoved = 0;\n    //this is the dimension of the character sprite\n    this.dimensions = [48, 48];\n    this.position = [51,51]\n    //movement speed\n    this.delayMove = 100;\n    this.facing = \"DOWN\"\n    this.LEFT = \"LEFT\"\n    this.RIGHT = \"RIGHT\"\n    this.UP = \"UP\"\n    this.DOWN = \"DOWN\"\n    this.playerSprites = {\n      \"UP\": [{x:96, y:0, w:47, h:47}, {x:96, y:48, w:47, h:47}],\n      \"DOWN\": [{x:48, y:0, w:47, h:47}, {x:48, y:48, w:47, h:47}],\n      \"LEFT\": [{x:144, y:0, w:47, h:47}, {x:144, y:48, w:47, h:47}],\n      \"RIGHT\": [{x:0, y:0, w:47, h:47}, {x:0, y:48, w:47, h:47}],\n    }\n    this.movementAnimation = \"false\"\n  }\n}\n//this function is dependent upon globals - maybe do tileW = this.tileW.bind(this)\nCharacter.prototype.placeAt = function(x,y) {\n  this.tileFrom = [x, y];\n  this.tileTo = [x, y];\n  this.position = [\n    (\n      (tileW * x) + ((tileW - this.dimensions[0])/2)\n    ),(\n      (tileH * y) + ((tileH-this.dimensions[1])/2)\n      )\n  ]\n}\n//this function is dependent upon globals\nCharacter.prototype.processMovement = function(time) {\n  if (this.tileFrom[0] === this.tileTo[0] && this.tileFrom[1] === this.tileTo[1]) {\n    return false\n  } \n  if((time - this.timeMoved) >= this.delayMove) {\n    this.placeAt(this.tileTo[0], this.tileTo[1])\n    this.movementAnimation = !this.movementAnimation\n  } else {\n    //below block gives pixel value starting position\n    this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0])/2);\n    // console.log(\"x\", this.position[0])\n    this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1])/2);\n    // console.log(\"y\", this.position[1])\n\n    //check if char is moving horizontally\n    if(this.tileTo[0] !== this.tileFrom[0]) {\n      const diff = (tileW/this.delayMove) * (time - this.timeMoved);\n      this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff)\n\n    }\n    //check if char is moving vertically\n    if(this.tileTo[1] != this.tileFrom[1]){\n\t\t\tvar diff = (tileH / this.delayMove) * (time - this.timeMoved);\n\t\t\tthis.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);\n\t\t}\n\n    this.position[0] = Math.round(this.position[0])\n    this.position[1] = Math.round(this.position[1])\n  }\n\n  return true\n}\n//this function is dependent upon globals - needs to go in the map\n\n\nCharacter.prototype.canMoveUp = function() { return this.isValidMove(this.tileFrom[0], (this.tileFrom[1] - 1)) }\nCharacter.prototype.canMoveDown = function() { return this.isValidMove(this.tileFrom[0], (this.tileFrom[1] + 1)) }\nCharacter.prototype.canMoveLeft = function() { return this.isValidMove((this.tileFrom[0] - 1), this.tileFrom[1]) }\nCharacter.prototype.canMoveRight = function() { return this.isValidMove((this.tileFrom[0] + 1), this.tileFrom[1]) }\nCharacter.prototype.canMoveUpLeft = function() { return this.isValidMove((this.tileFrom[0] - 1), (this.tileFrom[1] - 1)) }\nCharacter.prototype.canMoveUpRight = function() { return this.isValidMove((this.tileFrom[0] + 1), (this.tileFrom[1] - 1)) }\nCharacter.prototype.canMoveDownLeft = function() { return this.isValidMove((this.tileFrom[0] - 1), (this.tileFrom[1] + 1)) }\nCharacter.prototype.canMoveDownRight = function() { return this.isValidMove((this.tileFrom[0] + 1), (this.tileFrom[1] + 1)) }\n\nCharacter.prototype.move = function(direction, time) {\n  this.tileTo[0] += direction.DIRS[0]\n  this.tileTo[1] += direction.DIRS[1]\n  this.timeMoved = time\n  this.facing = direction.FACING\n  // switch(direction) {\n  //   case \"UPLEFT\":\n  //     this.tileTo[0] -= 1\n  //     this.tileTo[1] -= 1\n  //     this.facing = this.LEFT\n  //     break;\n  //   case \"UPRIGHT\":\n  //     this.tileTo[0] += 1\n  //     this.tileTo[1] -= 1\n  //     this.facing = this.RIGHT\n  //     break;\n  //   case \"DOWNLEFT\":\n  //     this.tileTo[0] -= 1\n  //     this.tileTo[1] += 1\n  //     this.facing = this.LEFT\n  //     break;\n  //   case \"DOWNRIGHT\":\n  //     this.tileTo[0] += 1\n  //     this.tileTo[1] += 1\n  //     this.facing = this.RIGHT\n  //     break;\n  //   case \"UP\":\n  //     this.tileTo[1] -= 1 \n  //     this.facing = this.UP\n  //     break;\n  //   case \"DOWN\":\n  //     this.tileTo[1] += 1\n  //     this.facing = this.DOWN\n  //     break;\n  //   case \"LEFT\":\n  //     this.tileTo[0] -= 1\n  //     this.facing = this.LEFT\n  //     break;\n  //   case \"RIGHT\":\n  //     this.tileTo[0] += 1\n  //     this.facing = this.RIGHT\n  //     break;\n  // }\n  \n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Character);\n\n\n//# sourceURL=webpack:///./src/character.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"./src/view.js\");\n/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./character */ \"./src/character.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map */ \"./src/map.js\");\n/* harmony import */ var _levels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./levels */ \"./src/levels.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\n\n\n\n\nclass Game {\n  constructor(viewportDimensions) {\n    this.gameMap = new _map__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_levels__WEBPACK_IMPORTED_MODULE_3__[\"levelOne\"])\n    this.player = new _character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n    this.viewport = new _view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](viewportDimensions) //game.width, game.height\n    this.keysDown = {\n      37: false, //left arrow\n      39: false, //right arrow\n      38: false, //up arrow\n      40: false, //down arrow\n    }\n    // this.floorTypes = {\n    //   solid: 1,\n    //   open: 0\n    // }\n    // this.tileTypes = {\n    //   0: { name: \"wall\", sprite:[{x:288, y:96, w:48, h:48}], floor: this.floorTypes.solid },\n    //   1: { name: \"tile\", sprite:[{x:144, y:432, w:48, h:48}], floor: this.floorTypes.open },\n    //   2: { name: \"keycard\", sprite:[{x: 0, y:112, w:16, h:16}], floor: this.floorTypes.open },\n    //   3: { name: \"item\", sprite:[{x: 0, y:0, w:16, h:16}], floor: this.floorTypes.open },\n    //   41: { name: \"table\", sprite:[{x: 0, y:32, w:16, h:16}], floor: this.floorTypes.solid },\n    //   42: { name: \"vat\", sprite:[{x: 48, y:32, w:16, h:16}], floor: this.floorTypes.solid },\n    //   43: { name: \"crate\", sprite:[{x: 16, y:32, w:16, h:16}], floor: this.floorTypes.open },\n    //   5: { name: \"computer\", sprite:[{x: 64, y:32, w:16, h:16}], floor: this.floorTypes.solid },\n    // }\n\n    // this.DIRECTIONS = {\n    //   \"UP\": [0, -1],\n    //   \"DOWN\": [0, 1],\n    //   \"LEFT\": [-1, 0],\n    //   \"RIGHT\": [1,0],\n    //   \"UPLEFT\": [-1,-1],\n    //   \"UPRIGHT\": [1, -1],\n    //   \"DOWNLEFT\": [-1, 1],\n    //   \"DOWNRIGHT\": [1, 1]\n    // }\n\n    this.drawGame = () => {\n    //move this out to index?\n    \n\n    if(window.ctx === null) return;\n    if(!window.tilesetLoaded || !window.monsterSetLoaded) {\n      requestAnimationFrame(this.drawGame)\n      console.log(monsterSetLoaded)\n      return\n    }\n    \n    const currentFrameTime = Date.now()\n    const timeElapsed = currentFrameTime - lastFrameTime\n\n    let sec = Math.floor(Date.now()/1000);\n    if (sec !== currentSecond) {\n      currentSecond = sec;\n      framesLastSecond = frameCount;\n      frameCount = 1\n    } else {\n      frameCount ++\n    }\n\n    //Player movement//////////////////////////////////////////////////////\n    if (!this.player.processMovement(currentFrameTime)) {\n      if((this.keysDown[37] && this.keysDown[39]) || (this.keysDown[38] && this.keysDown[40])) {\n        //do nothing\n        //prevent screen stuttering\n      }\n        //Left + up arrow\n      else if ((this.keysDown[37] && this.keysDown[38]) && this.isValidMove(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].UPLEFT, _util__WEBPACK_IMPORTED_MODULE_4__[\"TILETYPES\"], _util__WEBPACK_IMPORTED_MODULE_4__[\"FLOORTYPES\"])) {\n        this.player.move(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].UPLEFT, currentFrameTime)\n      }\n      //Left + down arrow\n      else if ((this.keysDown[37] && this.keysDown[40]) && this.isValidMove(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].DOWNLEFT, _util__WEBPACK_IMPORTED_MODULE_4__[\"TILETYPES\"], _util__WEBPACK_IMPORTED_MODULE_4__[\"FLOORTYPES\"])) {\n        this.player.move(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].DOWNLEFT, currentFrameTime)\n      }\n      //right + up arrow\n      else if ((this.keysDown[39] && this.keysDown[38]) && this.isValidMove(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].UPRIGHT, _util__WEBPACK_IMPORTED_MODULE_4__[\"TILETYPES\"], _util__WEBPACK_IMPORTED_MODULE_4__[\"FLOORTYPES\"])) {\n        this.player.move(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].UPRIGHT, currentFrameTime)\n      }\n      //right + down arrow\n      else if ((this.keysDown[39] && this.keysDown[40]) && this.isValidMove(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].DOWNRIGHT, _util__WEBPACK_IMPORTED_MODULE_4__[\"TILETYPES\"], _util__WEBPACK_IMPORTED_MODULE_4__[\"FLOORTYPES\"])) {\n        this.player.move(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].DOWNRIGHT, currentFrameTime)\n      }\n      //up arrow\n      else if (this.keysDown[38] && this.isValidMove(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].UP, _util__WEBPACK_IMPORTED_MODULE_4__[\"TILETYPES\"], _util__WEBPACK_IMPORTED_MODULE_4__[\"FLOORTYPES\"])) {\n        this.player.move(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].UP, currentFrameTime)  \n      }\n      //Down arrow\n      else if (this.keysDown[40] && this.isValidMove(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].DOWN, _util__WEBPACK_IMPORTED_MODULE_4__[\"TILETYPES\"], _util__WEBPACK_IMPORTED_MODULE_4__[\"FLOORTYPES\"])) {\n        this.player.move(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].DOWN, currentFrameTime)  \n      }\n      //Left arrow\n      else if (this.keysDown[37] && this.isValidMove(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].LEFT, _util__WEBPACK_IMPORTED_MODULE_4__[\"TILETYPES\"], _util__WEBPACK_IMPORTED_MODULE_4__[\"FLOORTYPES\"])) {\n        this.player.move(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].LEFT, currentFrameTime)  \n      }\n      //right arrow\n      else if (this.keysDown[39] && this.isValidMove(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].RIGHT, _util__WEBPACK_IMPORTED_MODULE_4__[\"TILETYPES\"], _util__WEBPACK_IMPORTED_MODULE_4__[\"FLOORTYPES\"])) {\n        this.player.move(_util__WEBPACK_IMPORTED_MODULE_4__[\"DIRECTIONS\"].RIGHT, currentFrameTime)\n      }\n\n      \n      //check to see if player is moving\n      if((this.player.tileFrom[0] !== this.player.tileTo[0]) || (this.player.tileFrom[1] !== this.player.tileTo[1])){\n        this.player.timeMoved = currentFrameTime\n      }\n    }\n   ////////////////////////////////////////////////////////////////\n\n\n    this.viewport.update(this.player.position[0] + (this.player.dimensions[0]/2), \n                          this.player.position[1] + (this.player.dimensions[1]/2))\n    \n    //viewport image\n    this.renderViewportImage()\n    //draw from map\n    for(let y = this.viewport.startTile[1]; y <= this.viewport.endTile[1]; y++) {\n      for(let x = this.viewport.startTile[0]; x <= this.viewport.endTile[0]; x++) {\n        const tile = _util__WEBPACK_IMPORTED_MODULE_4__[\"TILETYPES\"][this.gameMap.map[this.toIndex(x,y)]];\n        // const random = Math.floor(Math.random() * 6) + 1;\n        // const tileSpriteX = (tile.name === \"wall\") || (tile.name === \"tile\") ? tile.sprite[0][1].x : tile.sprite[0].x;\n        // const tileSpriteY = (tile.name === \"wall\") || (tile.name === \"tile\") ? tile.sprite[0][1].y : tile.sprite[0].y;\n        // const tileSpriteW = (tile.name === \"wall\") || (tile.name === \"tile\") ? tile.sprite[0][1].y : tile.sprite[0].w;\n        // const tileSpriteH = (tile.name === \"wall\") || (tile.name === \"tile\") ? tile.sprite[0][1].w : tile.sprite[0].h;\n        //causing some problems with the map - revisit later\n        // if((y%16 === 0) && (x%16 !== 0) && (x%16 !== 15)) {\n        //     //debugger\n        //     window.ctx.drawImage(tileset, tile.sprite[1].x, tile.sprite[1].y, tile.sprite[1].w, tile.sprite[1].h, \n        //     (viewport.offset[0] + (x * tileW)), ( viewport.offset[1] + (y*tileH)), tileW, tileH);\n        //   } else {\n            window.ctx.drawImage(window.tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h, \n            (this.viewport.offset[0] + (x * tileW)), (this.viewport.offset[1] + (y*tileH)), tileW, tileH);\n        //  }\n      }\n    }\n    this.renderPlayer()\n    window.ctx.fillStyle = \"ff0000\";\n    window.ctx.fillText(\"FPS: \" + framesLastSecond, 10, 20)\n  \n    lastFrameTime = currentFrameTime;\n    requestAnimationFrame(this.drawGame)\n   }\n  }\n\n  renderPlayer() {\n    let spriteIndex = (this.player.movementAnimation) ? 0 : 1\n    window.ctx.drawImage(window.monsterSet, this.player.playerSprites[this.player.facing][spriteIndex].x, this.player.playerSprites[this.player.facing][spriteIndex].y, this.player.playerSprites[this.player.facing][spriteIndex].w, this.player.playerSprites[this.player.facing][spriteIndex].h,  (this.viewport.offset[0] + this.player.position[0]), (this.viewport.offset[1] + this.player.position[1]), this.player.dimensions[0], this.player.dimensions[1]);\n  }\n\n\n  renderViewportImage() {\n     window.ctx.drawImage(window.spaceImage, 0, 0, 800, 800,  0, 0, this.viewport.screen[0], this.viewport.screen[1]);\n  }\n\n  toIndex(x,y) {\n    return ((y*mapW) + x);\n  }\n\n\n  isValidMove(direction, TILETYPES, FLOORTYPES) {\n    const x = this.player.tileFrom[0] + direction.DIRS[0];\n    const y = this.player.tileFrom[1] + direction.DIRS[1]\n    if(x < 0 || x > (mapW-1) || y < 0 || y > mapH-1) return false;\n    //debugger\n    if(TILETYPES[this.gameMap.map[this.toIndex(x,y)]].floor !== FLOORTYPES.open) return false;\n    return true;\n  }\n\n}\n  \n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst tileW = window.tileW = 48\nconst tileH = window.tileH = 48;\nconst mapW = window.mapW = 64;\nconst mapH = window.mapH = 64;\nwindow.tileset = new Image();\nwindow.monsterSet = new Image();\nwindow.spaceImage = new Image()\nconst assetUrls ={\n  tilesetURL: \"./assets/tiny_galaxy_world.png\",\n  characterTilesetUrl: \"./assets/tiny_galaxy_monsters.png\",\n  spaceImageUrl: \"./assets/space.png\",\n} \nwindow.ctx = null\nwindow.tilesetLoaded = false \nwindow.monsterSetLoaded = false; \nwindow.currentSecond = 0, \nwindow.frameCount = 0, \nwindow.framesLastSecond = 0;\nwindow.lastFrameTime = 0;\n\n\nwindow.onload = function() {\n  /// revisit\n\n  window.tileset.onerror = function(e) {\n    window.ctx = null;\n    alert(e.message);\n  }\n  \n  window.monsterSet.onerror = function(e) {\n    window.ctx = null;\n    alert(e.message);\n  }\n\n  window.spaceImage.onerror = function(e) {\n    window.ctx = null;\n    alert(e.message);\n  }\n  \n  window.tileset.onload = function() { window.tilesetLoaded = true };\n  window.monsterSet.onload = function() { window.monsterSetLoaded = true }\n  //revisit \n\n  window.tileset.src = assetUrls.tilesetURL;\n  window.monsterSet.src = assetUrls.characterTilesetUrl;\n  window.spaceImage.src = assetUrls.spaceImageUrl;\n  const game = document.getElementById(\"game\")\n  window.ctx = game.getContext('2d');\n  const newGame = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([game.width, game.height])\n  window.ctx.font = \"bold 10pt sans-serif\";\n  \n  window.addEventListener(\"keydown\", (e) => {\n    if (e.keyCode >= 37 && e.keyCode <= 40) {\n      newGame.keysDown[e.keyCode] = true;\n    }\n  });\n  window.addEventListener(\"keyup\", (e) => {\n    if (e.keyCode >= 37 && e.keyCode <= 40) {\n      newGame.keysDown[e.keyCode] = false;\n    }\n  });\n  //this is setting the viewport screen area \n  \n  requestAnimationFrame(newGame.drawGame);\n};\n\n\n\n//viewport\n\n\n\n\n\n\n\n\n\n\n\n// const interiorWalls = {\n//   1: {x:144, y:0, w:48, h:48},\n//   2: {x:112, y:0, w:16, h:16},\n//   3: {x:128, y:0, w:16, h:16},\n//   4: {x:144, y:0, w:16, h:16},\n//   5: {x:160, y:0, w:16, h:16},\n//   6: {x:176, y:0, w:16, h:16},\n// }\n\n// const floorTiles = {\n//   1: {x:0, y:16, w:48, h:48},\n//   2: {x:112, y:16, w:16, h:16},\n//   3: {x:128, y:16, w:16, h:16},\n//   4: {x:144, y:16, w:16, h:16},\n//   5: {x:160, y:16, w:16, h:16},\n//   6: {x:176, y:16, w:16, h:16},\n// }\n\n\n\n  //listeners\n  \n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/levels.js":
/*!***********************!*\
  !*** ./src/levels.js ***!
  \***********************/
/*! exports provided: levelOne */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"levelOne\", function() { return levelOne; });\nconst levelOne = [\n        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,\n        0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,\n        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,\n        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,\n        0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,\n        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];\n  \n\n//# sourceURL=webpack:///./src/levels.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Map {\n  constructor(map) {\n    this.map = this.randomizeMap(map)\n  }\n\n  ramdomizer(num, i){\n    if(num >= 1) {\n      const tile = Math.floor(Math.random() * 100000)\n      \n      const keycard = 99852;\n      const item = 99751;\n      const object = 99125;\n      const rearWallDecoration = 91000\n      \n      //order matters\n      if(tile >= keycard) {\n        console.log(tile)\n        return 2\n      }\n\n      if(tile >= item) return 3\n      if(tile >= object ) return 4\n      if(tile >= rearWallDecoration && (((i - (i%mapW))/mapW)%16) === 1) return 5\n      return 1\n    } else {\n      return 0;\n    }\n  }\n\n  multiRandomizer() {\n    const thing = Math.floor(Math.random()* 10) + 40\n    if(thing > 7) return 41\n    if(thing > 4) return 42\n    return 43\n  }\n\n  randomizeMap(arr) {\n    let multiItem = false\n    let lastMulti = null\n    return arr.map((tile, i) => {\n      if (multiItem) {\n        multiItem = false\n        return lastMulti\n      }\n      const res = this.ramdomizer(tile, i)\n      if(res !== 4) return res;\n      multiItem = true;\n      lastMulti = this.multiRandomizer(); \n      return lastMulti;\n      })\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Map);\n\n//# sourceURL=webpack:///./src/map.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: FLOORTYPES, TILETYPES, DIRECTIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FLOORTYPES\", function() { return FLOORTYPES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TILETYPES\", function() { return TILETYPES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DIRECTIONS\", function() { return DIRECTIONS; });\nconst FLOORTYPES = {\n    solid: 1,\n    open: 0\n  }\nconst TILETYPES = {\n    0: { name: \"wall\", sprite:[{x:288, y:96, w:48, h:48}], floor: FLOORTYPES.solid },\n    1: { name: \"tile\", sprite:[{x:144, y:432, w:48, h:48}], floor: FLOORTYPES.open },\n    2: { name: \"keycard\", sprite:[{x: 0, y:112, w:16, h:16}], floor: FLOORTYPES.open },\n    3: { name: \"item\", sprite:[{x: 0, y:0, w:16, h:16}], floor: FLOORTYPES.open },\n    41: { name: \"table\", sprite:[{x: 0, y:32, w:16, h:16}], floor: FLOORTYPES.solid },\n    42: { name: \"vat\", sprite:[{x: 48, y:32, w:16, h:16}], floor: FLOORTYPES.solid },\n    43: { name: \"crate\", sprite:[{x: 16, y:32, w:16, h:16}], floor: FLOORTYPES.open },\n    5: { name: \"computer\", sprite:[{x: 64, y:32, w:16, h:16}], floor: FLOORTYPES.solid },\n  }\n\nconst DIRECTIONS = {\n    UP: { DIRS: [0, -1], FACING: \"UP\" },\n    DOWN: { DIRS: [0, 1], FACING: \"DOWN\" },\n    LEFT: { DIRS: [-1, 0], FACING: \"LEFT\" },\n    RIGHT: { DIRS: [1,0], FACING: \"RIGHT\" },\n    UPLEFT: { DIRS: [-1,-1], FACING: \"LEFT\" },\n    UPRIGHT: { DIRS: [1, -1], FACING: \"RIGHT\" },\n    DOWNLEFT: { DIRS: [-1, 1], FACING: \"LEFT\" },\n    DOWNRIGHT: { DIRS: [1, 1], FACING: \"RIGHT\" },\n  }\n\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Viewport {\n  constructor(viewportDimensions) {\n      //dimensions of canvas\n    this.screen = viewportDimensions,\n    //top left tile\n    this.startTile = [0,0],\n    //bottom right tile\n    this.endTile = [0,0],\n    //x and y offeset from the beginning of the screen\n    this.offset = [0,0]\n  }\n  update(px, py) {\n    //px and py are the center of the visible area to the camera\n    //drawing area with/2 - camera horizontal offeset\n    this.offset[0] = Math.floor((this.screen[0]/2) - px);\n    //dawing area height/2 - camera vertical offser\n    this.offset[1] = Math.floor((this.screen[1]/2) - py);\n\n    //this is the x, y value of the tile at the center\n    const tile = [Math.floor(px/tileW), Math.floor(py/tileH)]\n    //based on center tile defined by camera. horizontal value \n    //[first tile X] = [center tile X] - 1 - Round Up(([Canvas width] / 2) / [tile width]); x - 9\n    this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0]/2) /tileW);\n    // first tile y = center tile y -  9\n    this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1]/2) /tileH);\n    if(this.startTile[0] < 0) this.startTile[0] = 0;\n    if(this.startTile[1] < 0) this.startTile[1] = 0;\n\n    //x + 9\n    this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2) /tileW);\n    // y + 9\n    this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[0]/2) /tileH);\n\n    if(this.endTile[0] >= mapW) this.endTile[0] = mapW - 1;\n    if(this.endTile[1] >= mapH) this.endTile[1] = mapH - 1;\n\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Viewport);\n\n\n//# sourceURL=webpack:///./src/view.js?");

/***/ })

/******/ });