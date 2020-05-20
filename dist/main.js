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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (167:11)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| \\n|   isValidMove(arr) {\\n>     const x, y = arr\\n|     if(x < 0 || x > (mapW-1) || y < 0 || y > mapH-1) return false\\n|     if(this.tileTypes[this.gameMap[this.toIndex(x,y)]].floor !== this.floorTypes.open) return false\");\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst tileW = window.tileW = 48\nconst tileH = window.tileH = 48;\nconst mapW = window.mapW = 64;\nconst mapH = window.mapH = 64;\nwindow.tileset = new Image();\nwindow.monsterSet = new Image();\nwindow.spaceImage = new Image()\nconst assetUrls ={\n  tilesetURL: \"./assets/tiny_galaxy_world.png\",\n  characterTilesetUrl: \"./assets/tiny_galaxy_monsters.png\",\n  spaceImageUrl: \"./assets/space.png\",\n} \nwindow.ctx = null\nwindow.tilesetLoaded = false \nwindow.monsterSetLoaded = false; \n\n\nwindow.onload = function() {\n  /// revisit\n\n  window.tileset.onerror = function(e) {\n    window.ctx = null;\n    alert(e.message);\n  }\n  \n  window.monsterSet.onerror = function(e) {\n    window.ctx = null;\n    alert(e.message);\n  }\n\n  window.spaceImage.onerror = function(e) {\n    window.ctx = null;\n    alert(e.message);\n  }\n  \n  window.tileset.onload = function() { window.tilesetLoaded = true };\n  window.monsterSet.onload = function() { window.monsterSetLoaded = true }\n  //revisit \n\n  window.tileset.src = assetUrls.tilesetURL;\n  window.monsterSet.src = assetUrls.characterTilesetUrl;\n  window.spaceImage.src = assetUrls.spaceImageUrl;\n  const game = document.getElementById(\"game\")\n  window.ctx = game.getContext('2d');\n  const newGame = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([game.width, game.height])\n  window.ctx.font = \"bold 10pt sans-serif\";\n  \n  window.addEventListener(\"keydown\", (e) => {\n    if (e.keyCode >= 37 && e.keyCode <= 40) {\n      newGame.keysDown[e.keyCode] = true;\n    }\n  });\n  window.addEventListener(\"keyup\", (e) => {\n    if (e.keyCode >= 37 && e.keyCode <= 40) {\n      newGame.keysDown[e.keyCode] = false;\n    }\n  });\n  //this is setting the viewport screen area \n  \n  requestAnimationFrame(newGame.drawGame);\n};\n\n\n\n//viewport\n\n\n\n\n\n\n\n\n\n\n\n// const interiorWalls = {\n//   1: {x:144, y:0, w:48, h:48},\n//   2: {x:112, y:0, w:16, h:16},\n//   3: {x:128, y:0, w:16, h:16},\n//   4: {x:144, y:0, w:16, h:16},\n//   5: {x:160, y:0, w:16, h:16},\n//   6: {x:176, y:0, w:16, h:16},\n// }\n\n// const floorTiles = {\n//   1: {x:0, y:16, w:48, h:48},\n//   2: {x:112, y:16, w:16, h:16},\n//   3: {x:128, y:16, w:16, h:16},\n//   4: {x:144, y:16, w:16, h:16},\n//   5: {x:160, y:16, w:16, h:16},\n//   6: {x:176, y:16, w:16, h:16},\n// }\n\n\n\n  //listeners\n  \n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });