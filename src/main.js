import View from './model/View.js';
import Controller from './model/Controller.js';
import Collider from './model/Collider.js';
import MainLevel from './model/levels/MainLevel';

const Game = {

    init() {

        this.score = {P1:0,P2:0};
        this.playArea = new MainLevel(1000,600);
        this.playArea.init();
        
        this.canvas = document.getElementById("gameCanvas");
        this.gameView = new View(
            this.playArea,
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

        this.playArea.entities.controllableObjects.forEach((el) => {
            el.control();
        });

        this.playArea.entities.objects.forEach((el) => {
            el.step();
        });

        this.playArea.entities.moveableObjects.forEach((el) => {
            el.move(elapsedTime);
        });

        let collisions = Collider.findCollisions(this.playArea.entities.collideableObjects);
        Collider.runCollisions(collisions);

    },

    render()  {
        this.canvasContext.fillStyle = "#111111"
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