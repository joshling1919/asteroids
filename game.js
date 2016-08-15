const Asteroid = require('./asteroid.js');
const Util = require('./utils.js');

Game.DIM_X = 1500;
Game.DIM_Y = 1500;
Game.NUM_ASTEROIDS = 10;


function Game(){
  this.xDim = Game.DIM_X;
  this.yDim = Game.DIM_Y;
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(
      new Asteroid({pos: Util.randomVec(100)})
    );
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.xDim, this.yDim);
  console.log('I\'m drawing');
  this.asteroids.forEach(function (asteroid){
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(function (asteroid) {
    asteroid.move();
  });
};

module.exports = Game;
