import View from './model/View.js';
import Controller from './model/Controller.js';
import Collider from './model/Collider.js';
import MainLevel from './model/levels/MainLevel';
import TripleBallLevel from './model/levels/TripleBallLevel';
import DoublePaddleLevel from './model/levels/DoublePaddleLevel';
import LevelManager from './model/levels/LevelManager.js';
import ViewManager from './model/ViewManager.js';

const Game = {

    init() {
        this.canvas = document.getElementById("gameCanvas");
        this.canvasContext = this.canvas.getContext("2d");

        this.viewManager = new ViewManager();
        this.levelManager = new LevelManager(this.viewManager);
        let levels = [
            new MainLevel(1000,600),
            new DoublePaddleLevel(1000,600),
            new TripleBallLevel(1000,600)
        ];

        for (levelNo = 0; levelNo < levels.length; levelNo++) {
            this.levelManager.add(levels[levelNo]);
            this.viewManager.add(new View(this.levelManager.levels[levelNo],
                this.canvas.width,this.canvas.height));
        };

        Controller.init();
        this.levelManager.gotoLevel(0);

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
        this.viewManager.render(Game.canvasContext);
    },

};

document.addEventListener('DOMContentLoaded', (event) => {
    Game.init();
    Game.main();
});