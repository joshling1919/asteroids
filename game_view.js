const Game = require('./game.js');

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  let gamev = this;
  setInterval(function(){
    gamev.game.step();
    gamev.game.draw(gamev.ctx);
  }, 20);
};


module.exports = GameView;
