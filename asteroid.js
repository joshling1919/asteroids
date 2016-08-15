const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");


Asteroid.RADIUS = 5;
Asteroid.COLOR = "green";


function Asteroid(postion){
  let options = { 'pos': postion['pos'], 'vel': Util.randomVec(6), 'color': Asteroid.COLOR, 'radius': Asteroid.RADIUS };
  MovingObject.call(this, options);

};

Util.inherits(Asteroid, MovingObject);


module.exports = Asteroid;


// const asteroid = new Asteroid({'pos': [1, 1]});
// console.log(asteroid);
