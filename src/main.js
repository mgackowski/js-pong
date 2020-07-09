import Paddle from './model/gameobjects/Paddle.js';
import Level from './model/Level.js';
import Ball from './model/gameobjects/Ball.js';
import View from './model/View.js';
import Controller from './model/Controller.js';
import GameObject from './model/gameobjects/GameObject.js';
import Collider from './model/Collider.js';
import LevelBoundary from './model/gameobjects/LevelBoundary.js';

const Game = {

    init : function() {

        Game.playArea = new Level(1000,600);

        // Screen boundary represented as collision objects
        let upperBoundary = new LevelBoundary(
            Game.playArea.width,Game.playArea.height,"upper");
        let lowerBoundary = new LevelBoundary(
            Game.playArea.width,Game.playArea.height,"lower");
        let leftBoundary = new LevelBoundary(
            Game.playArea.width,Game.playArea.height,"left");
        let rightBoundary = new LevelBoundary(
            Game.playArea.width,Game.playArea.height,"right");

        let ball = new Ball((this.playArea.width/2)-10,(this.playArea.height/2)-10);
        let leftPaddle = new Paddle(10,(this.playArea.height/2)-50,"P1");
        let rightPaddle = new Paddle(this.playArea.width-30,(this.playArea.height/2)-50,"P2");

        Game.playArea.objects.push(upperBoundary,lowerBoundary,leftBoundary,rightBoundary,
            ball,leftPaddle,rightPaddle);
        Game.playArea.moveableObjects.push(ball,leftPaddle,rightPaddle);
        Game.playArea.controllableObjects.push(ball,leftPaddle,rightPaddle);
        Game.playArea.collideableObjects.push(
            upperBoundary,lowerBoundary,leftBoundary,rightBoundary,
            ball,leftPaddle,rightPaddle);
        
        Game.canvas = document.getElementById("gameCanvas");
        Game.gameView = new View(
            Game.playArea,
            Game.canvas.width,
            Game.canvas.height);
        Game.canvasContext = Game.canvas.getContext("2d");

        Controller.init();

        //Check time right before first update loop
        Game.tLastFrame = window.performance.now();
    },

    main : function(tCurrentFrame = window.performance.now()) {

        window.requestAnimationFrame(Game.main);

        //Print second for testing
        //console.log(Math.floor(tCurrentFrame/1000) + 's');

        let elapsedTime = tCurrentFrame - Game.tLastFrame;
        Game.tLastFrame = tCurrentFrame;
        Game.update(elapsedTime);

        Game.render();

    },

    update : function(elapsedTime) {

        Game.playArea.controllableObjects.forEach((el) => {
            el.control();
        });

        Game.playArea.objects.forEach((el) => {
            el.step();
        });

        Game.playArea.moveableObjects.forEach((el) => {
            el.move(elapsedTime);
        });

        let collisions = Collider.findCollisions(Game.playArea.collideableObjects);
        Collider.runCollisions(collisions);

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