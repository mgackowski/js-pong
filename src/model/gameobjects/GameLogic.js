import EntityManager from "../levels/EntityManager";
import GameObject from "./GameObject";
import Ball from "./Ball";
import ScoreDisplay from "./ScoreDisplay";
import Controller from "../Controller";
import LevelManager from "../levels/LevelManager";

class GameLogic extends GameObject {

    constructor(levelManager) {
        super(0,0,0,0);
        this._score = {P1:0,P2:0};
        this._levelManager = levelManager;
    }

    get score() {
        return this._score;
    }

    step() {
        let balls = this._entityManager.objects.filter(el => el instanceof Ball);

        balls.forEach( ball => {
            if(ball.state == "over_left" || ball.state == "over_right") {
                this._entityManager.remove(ball);
                this._entityManager.add(new Ball(ball.spawnPos.x,ball.spawnPos.y),
                {moveable:true, controllable:true, collideable:true});
    
                if(ball.state == "over_left") {
                    this._score.P2++;
                }
                else if(ball.state == "over_right") {
                    this._score.P1++;
                };
    
                this._entityManager.add(new ScoreDisplay(-100,-100,"P1"),{});
                this._entityManager.add(new ScoreDisplay(-100,-100,"P2"),{});
            };
        });

        if(Controller.nextLevel) {
            this._levelManager.gotoNextLevel();
        };
    }

};

export default GameLogic;