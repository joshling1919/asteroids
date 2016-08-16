const Game = require('./game.js');

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.bindKeyHandlers = function() {
  key('w', () => this.game.ship.power([0, -.01]));
  key('a', () => this.game.ship.power([-.01, 0]));
  key('s', () => this.game.ship.power([0, .01]));
  key('d', () => this.game.ship.power([.01, 0]));

};

GameView.prototype.start = function() {
  let gamev = this;
  setInterval(function(){
    gamev.bindKeyHandlers();
    gamev.game.step();
    gamev.game.draw(gamev.ctx);
  }, 20);
};


module.exports = GameView;
