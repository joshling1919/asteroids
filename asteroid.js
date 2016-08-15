const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");
const Ship = require("./ship.js")

Asteroid.RADIUS = 15;
Asteroid.COLOR = "green";


function Asteroid(postion){
  let options = {'game': postion['game'], 'pos': postion['pos'], 'vel': Util.randomVec(6), 'color': Asteroid.COLOR, 'radius': Asteroid.RADIUS };
  MovingObject.call(this, options);

}

Util.inherits(Asteroid, MovingObject);


Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship ) {
    otherObject.relocate();
  }
};



module.exports = Asteroid;


// const asteroid = new Asteroid({'pos': [1, 1]});
// console.log(asteroid);
