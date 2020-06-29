import Paddle from './model/Paddle.js';
import Level from './model/Level.js';
import Ball from './model/Ball.js';
import View from './View.js';

const Game = {

    init : function() {

        Game.playArea = new Level(500,500);
        Game.playArea.objects.push(
            new Ball(10,10),
            new Paddle(30,30),
            new Paddle(50,50)
        );
        
        Game.canvas = document.getElementById("gameCanvas");
        Game.gameView = new View(
            Game.playArea,
            Game.canvas.width,
            Game.canvas.height);
        Game.canvasContext = Game.canvas.getContext("2d");

        console.log(Game.playArea.objects.forEach((el) => {
            console.log(`${el.id}, ${el.xpos}, ${el.ypos}, ${el.width}, ${el.height}`);
        }));
    },

    main : function(executionMillis) {

        window.requestAnimationFrame(Game.main);

        console.log(Math.floor(executionMillis/1000) + 's');
        
        //Game.pollInput TODO

        Game.update(executionMillis);

        Game.render();

    },

    update : function() {


    },

    render : function()  {
        Game.canvasContext.fillStyle = "#111111"
        Game.canvasContext.fillRect(
            0,0,
            Game.canvas.width,Game.canvas.height);
        Game.gameView.render(Game.canvasContext);
    },

};

document.addEventListener('DOMContentLoaded', (event) => {
    Game.init();
    Game.main();
});