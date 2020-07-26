import View from './model/View.js';
import Controller from './model/Controller.js';
import Collider from './model/Collider.js';
import MainLevel from './model/levels/MainLevel';
import TripleBallLevel from './model/levels/TripleBallLevel';
import DoublePaddleLevel from './model/levels/DoublePaddleLevel';
import LevelManager from './model/levels/LevelManager.js';

const Game = {

    init() {

        this.levelManager = new LevelManager();
        this.levelManager.add(new MainLevel(1000,600));
        this.levelManager.add(new DoublePaddleLevel(1000,600));
        this.levelManager.add(new TripleBallLevel(1000,600));
        this.levelManager.gotoLevel(0);
        
        this.canvas = document.getElementById("gameCanvas");
        this.gameView = new View(
            this.levelManager,
            this.canvas.width,
            this.canvas.height);
        this.canvasContext = this.canvas.getContext("2d");

        Controller.init();

        //Check time right before first update loop
        this.tLastFrame = window.performance.now();
    },

    main(tCurrentFrame = window.performance.now()) {

        window.requestAnimationFrame(() => this.main(tCurrentFrame = window.performance.now()));

        //Print second
        //console.log(Math.floor(tCurrentFrame/1000) + 's');

        let elapsedTime = tCurrentFrame - Game.tLastFrame;
        this.tLastFrame = tCurrentFrame;
        this.update(elapsedTime);

        this.render();

    },

    update(elapsedTime) {

        let entities = this.levelManager.levels[this.levelManager.currentLevel].entities;

        entities.controllableObjects.forEach((el) => {
            el.control();
        });

        entities.objects.forEach((el) => {
            el.step();
        });

        entities.moveableObjects.forEach((el) => {
            el.move(elapsedTime);
        });

        let collisions = Collider.findCollisions(entities.collideableObjects);
        Collider.runCollisions(collisions);

    },

    render()  {
        this.canvasContext.fillStyle = "black";
        this.canvasContext.fillRect(
            0,0,
            this.canvas.width,this.canvas.height);
        this.gameView.render(Game.canvasContext);
    },

};

document.addEventListener('DOMContentLoaded', (event) => {
    Game.init();
    Game.main();
});