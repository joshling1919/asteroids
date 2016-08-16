const Asteroid = require('./asteroid.js');
const Util = require('./utils.js');
const Ship = require('./ship.js');

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
  this.asteroids.splice(asteroidInd, 1);
  this.numAsteroids -= 1;
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat([this.ship]).concat(this.bullets);
};

module.exports = Game;
