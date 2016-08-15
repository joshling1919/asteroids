const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");

Ship.COLOR = 'red';
Ship.RADIUS = 5;

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


module.exports = Ship;
//
// console.log(this.position);
// this.position = Util.randomVec(this.game.xDim);
// this.velocity = [0, 0];
// console.log(this.position);
