const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");

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
