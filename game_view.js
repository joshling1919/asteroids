const Game = require('./game.js');

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
