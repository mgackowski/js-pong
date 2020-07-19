import View from './model/View.js';
import Controller from './model/Controller.js';
import Collider from './model/Collider.js';
import MainLevel from './model/levels/MainLevel';

const Game = {

    init : function() {

        Game.score = {P1:0,P2:0};
        Game.playArea = new MainLevel(1000,600);
        Game.playArea.init();
        
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

        //Print second
        //console.log(Math.floor(tCurrentFrame/1000) + 's');

        let elapsedTime = tCurrentFrame - Game.tLastFrame;
        Game.tLastFrame = tCurrentFrame;
        Game.update(elapsedTime);

        Game.render();

    },

    update : function(elapsedTime) {

        Game.playArea.entities.controllableObjects.forEach((el) => {
            el.control();
        });

        Game.playArea.entities.objects.forEach((el) => {
            el.step();
        });

        Game.playArea.entities.moveableObjects.forEach((el) => {
            el.move(elapsedTime);
        });

        let collisions = Collider.findCollisions(Game.playArea.entities.collideableObjects);
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