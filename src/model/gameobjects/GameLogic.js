import EntityManager from "../levels/EntityManager";
import GameObject from "./GameObject";
import Ball from "./Ball";
import ScoreDisplay from "./ScoreDisplay";

class GameLogic extends GameObject {

    constructor() {
        super(0,0,0,0);
        this._score = {P1:0,P2:0};
    }

    get score() {
        return this._score;
    }

    step() {
        let balls = this._entityManager.objects.filter(el => el instanceof Ball);

        //TODO: Iterate through all balls found
        if(balls.length <= 0) return;
        if(balls[0].state == "over_left" || balls[0].state == "over_right") {
            this._entityManager.remove(balls[0]);
            this._entityManager.add(new Ball(balls[0].spawnPos.x,balls[0].spawnPos.y),
            {moveable:true, controllable:true, collideable:true});

            if(balls[0].state == "over_left") {
                this._score.P2++;
            }
            else if(balls[0].state == "over_right") {
                this._score.P1++;
            };

            this._entityManager.add(new ScoreDisplay(-100,-100,"P1"),{});
            this._entityManager.add(new ScoreDisplay(-100,-100,"P2"),{});
        };
    }

};

export default GameLogic;