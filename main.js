const GameView = require("./lib/game_view.js");

document.addEventListener("DOMContentLoaded", function(){
  let canvas = document.getElementById("game-canvas");
  let c = canvas.getContext('2d');
  new GameView(c).start();
});
