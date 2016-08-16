const MovingObject = require("./moving_object.js");
const Bullet = require("./bullet.js");
const Util = require("./utils.js");

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
  let bullet = new Bullet({'pos': this.position, 'vel': [this.velocity[0] + 3, this.velocity[1] + 3],
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
