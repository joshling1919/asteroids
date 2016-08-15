

function MovingObject(options){
  this.position = options['pos'];
  this.velocity = options['vel'];
  this.radius = options['radius'];
  this.color = options['color'];
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
  this.position = [this.position[0] + this.velocity[0],
    this.position[1] + this.velocity[1]];
  return this.position;
};


module.exports = MovingObject;
