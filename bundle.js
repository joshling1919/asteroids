/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);

	document.addEventListener("DOMContentLoaded", function(){
	  let canvas = document.getElementById("game-canvas");
	  let c = canvas.getContext('2d');
	  new GameView(c).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

	function GameView(ctx) {
	  this.game = new Game();
	  this.ctx = ctx;
	}

	GameView.prototype.bindKeyHandlers = function() {
	  key('w', () => this.game.ship.power([0, -1]));
	  key('a', () => this.game.ship.power([-1, 0]));
	  key('s', () => this.game.ship.power([0, 1]));
	  key('d', () => this.game.ship.power([1, 0]));
	  key('space', () => {
	    this.game.ship.fireBullet()
	  });
	};

	GameView.prototype.start = function() {
	  let gamev = this;
	  gamev.bindKeyHandlers();
	  setInterval(function(){
	    gamev.game.step();
	    gamev.game.draw(gamev.ctx);
	  }, 20);
	};


	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Util = __webpack_require__(5);
	const Ship = __webpack_require__(6);

	Game.DIM_X = 500;
	Game.DIM_Y = 500;
	Game.NUM_ASTEROIDS = 10;


	function Game(){
	  this.xDim = Game.DIM_X;
	  this.yDim = Game.DIM_Y;
	  this.asteroids = [];
	  this.addAsteroids();
	  this.ship = new Ship({'pos': Util.randomVec(Game.DIM_X), 'game': this});
	  this.bullets = [];
	  this.numAsteroids = this.asteroids.length;
	}

	Game.prototype.addAsteroids = function() {

	  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    this.asteroids.push(
	      new Asteroid({'pos': Util.randomVec(Game.DIM_X), 'game': this})
	    );
	  }
	};

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, this.xDim, this.yDim);
	  this.allObjects().forEach(function (obj){
	    obj.draw(ctx);
	  });
	};

	Game.prototype.moveObjects = function() {
	  this.allObjects().forEach(function (obj) {
	    obj.move();
	  });
	};


	Game.prototype.wrap = function(pos){
	  if (pos[0] <= 0) {pos[0] = this.xDim - 1;}
	  if (pos[1] <= 0) {pos[1] = this.yDim - 1; }
	  return [pos[0]%this.xDim, pos[1]%this.yDim];
	};

	Game.prototype.checkCollisions = function() {
	  for (let i = 0; i < this.allObjects().length - 1; i++) {
	    for (let j = i + 1; j < this.allObjects().length; j++) {
	      if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
	        this.allObjects()[i].collideWith(this.allObjects()[j]);
	        // alert('COLLISION!');
	      }
	    }
	  }
	};

	Game.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollisions();
	};

	Game.prototype.remove = function(asteroid) {
	  let asteroidInd = this.asteroids.indexOf(asteroid);
	  console.log('remove');
	  this.asteroids.splice(asteroidInd, 1);
	  this.numAsteroids -= 1;
	};

	Game.prototype.allObjects = function() {
	  return this.asteroids.concat([this.ship]).concat(this.bullets);
	};

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);
	const Ship = __webpack_require__(6)

	Asteroid.RADIUS = 15;
	Asteroid.COLOR = "green";


	function Asteroid(postion){
	  let options = {'game': postion['game'], 'pos': postion['pos'],
	    'vel': Util.randomVec(4), 'color': Asteroid.COLOR,
	    'radius': Asteroid.RADIUS };
	  MovingObject.call(this, options);

	}

	Util.inherits(Asteroid, MovingObject);


	Asteroid.prototype.collideWith = function(otherObject) {
	  if (otherObject instanceof Ship ) {
	    otherObject.relocate();
	  } else if (!(otherObject instanceof Asteroid)) {
	    let ast = this;
	    this.game.remove(ast);
	  }
	};



	module.exports = Asteroid;


	// const asteroid = new Asteroid({'pos': [1, 1]});
	// console.log(asteroid);


/***/ },
/* 4 */
/***/ function(module, exports) {

	

	function MovingObject(options){
	  this.position = options['pos'];
	  this.velocity = options['vel'];
	  this.radius = options['radius'];
	  this.color = options['color'];
	  this.game = options['game'];
	}

	MovingObject.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	    this.position[0],
	    this.position[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );

	  ctx.fill();
	};

	MovingObject.prototype.move = function() {
	  // debugger;
	  this.position = [this.position[0] + this.velocity[0],
	    this.position[1] + this.velocity[1]];
	  this.position = this.game.wrap(this.position);
	};

	MovingObject.prototype.isCollidedWith = function(otherObject) {
	  let pos1 = this.position;
	  let pos2 = otherObject.position;
	  let rad1 = this.radius;
	  let rad2 = otherObject.radius;
	  let distance = Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) +
	    Math.pow((pos1[1] - pos2[1]), 2));
	  if ((rad1 + rad2) >= distance) {
	    return true;
	  } else {
	    return false;
	  }
	};

	MovingObject.prototype.collideWith = function(otherObject) {
	  // this.game.remove(otherObject);
	  // this.game.remove(this);
	};


	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const Util = {};

	Util.inherits = function(childClass, parentClass) {
	  function Surrogate() {}
	  Surrogate.prototype = parentClass.prototype;
	  childClass.prototype = new Surrogate();
	  childClass.prototype.constructor = childClass;
	};

	Util.randomVec = function(length) {
	  let x = Math.floor(Math.random() * length);
	  let y = Math.floor(Math.random() * length);

	  return [x, y];
	};




	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Bullet = __webpack_require__(7);
	const Util = __webpack_require__(5);

	Ship.COLOR = 'red';
	Ship.RADIUS = 10;

	function Ship(postion){
	  let options = {'game': postion['game'], 'pos': postion['pos'],
	   'vel': [0, 0], 'color': Ship.COLOR, 'radius': Ship.RADIUS };
	  MovingObject.call(this, options);

	}

	Util.inherits(Ship, MovingObject);

	Ship.prototype.relocate = function() {
	  this.position = Util.randomVec(this.game.xDim);
	  this.velocity = [0, 0];
	};

	Ship.prototype.power = function(impulse) {
	  this.velocity[0] += impulse[0];
	  this.velocity[1] += impulse[1];
	};

	Ship.prototype.fireBullet = function() {

	  let vel = [this.velocity[0] * 2, this.velocity[1] * 2];
	  if (vel[0] === 0 && vel[1] === 0) {vel = [0, 2]}
	  let bullet = new Bullet({'pos': this.position, 'vel': vel ,
	    'game': this.game});
	  console.log(bullet);
	  this.game.bullets.push(bullet);

	}

	module.exports = Ship;
	//
	// console.log(this.position);
	// this.position = Util.randomVec(this.game.xDim);
	// this.velocity = [0, 0];
	// console.log(this.position);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);

	Bullet.COLOR = 'black';
	Bullet.RADIUS = 3;

	function Bullet(opt){
	  let options = {'game': opt['game'], 'pos': opt['pos'],
	   'vel': opt['vel'], 'color': Bullet.COLOR, 'radius': Bullet.RADIUS };
	  MovingObject.call(this, options);

	}
	Util.inherits(Bullet, MovingObject);

	Bullet.prototype.move = function () {
	  this.position = [this.position[0] + this.velocity[0],
	    this.position[1] + this.velocity[1]];
	};



	module.exports = Bullet;


/***/ }
/******/ ]);