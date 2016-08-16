

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
