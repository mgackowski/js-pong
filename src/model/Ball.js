import MovingObject from "../../lib/model/MovingObject";
import GameObject from "../../lib/model/GameObject";
import LevelBoundary from "./LevelBoundary";
import Paddle from "./Paddle";

class Ball extends MovingObject {

    constructor(xpos,ypos) {
        super(xpos,ypos,20,20);
        this._velocity.x = 200;
        this._velocity.y = -200;
    }

    step() {

    }

    collide(withObj) {
        if(withObj instanceof LevelBoundary && withObj.type === "lower") {
            this._ypos = withObj.ypos - this._height;
            this._velocity.y *= -1;
        }
        else if(withObj instanceof LevelBoundary && withObj.type === "upper") {
            this._ypos = withObj.ypos + withObj.height;
            this._velocity.y *= -1;
        };
        if(withObj instanceof Paddle && this._velocity.x < 0) {
            this._xpos = withObj.xpos + withObj._width;
            this._velocity.x *= -1.1;
        }
        else if(withObj instanceof Paddle && this._velocity.x > 0) {
            this._xpos = withObj.xpos - this._width;
            this._velocity.x *= -1.1;
        }
            //TODO: map change in angle to position
            //relative to Paddle
    }

    destroy() {
        //
    }

}

export default Ball;