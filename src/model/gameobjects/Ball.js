import MovingObject from "../../../lib/model/MovingObject";
import GameObject from "../../../lib/model/GameObject";
import LevelBoundary from "./LevelBoundary";
import Paddle from "./Paddle";
import Controller from "../Controller";

class Ball extends MovingObject {

    constructor(xpos,ypos) {
        super(xpos,ypos,20,20);
        this._initialXpos = xpos;
        this._initialYpos = ypos;
        this._velocity.x = 0;
        this._velocity.y = 0;
        this._state = "stopped" // "stopped"||"moving"
    }

    control() {
        if(this._state == "stopped" && Controller.confirm) {
            //TODO: small chance might return 0;
            this._velocity.x = Math.sign(Math.random()-0.5) * 200;
            this._velocity.y = Math.sign(Math.random()-0.5) * 200;
            this._state = "moving";
        }
    }

    collide(withObj) {
        let angleRestriction = 0.7; //franction of 180 degree range to keep bounce more horizontal
        let speedChange = 1.1; //after each collision

        if(withObj instanceof LevelBoundary) {
            switch (withObj.type) {
                case "lower" :
                    this._ypos = withObj.ypos - this._height;
                    this._velocity.y *= -1;
                    break;
                case "upper" :
                    this._ypos = withObj.ypos + withObj.height;
                    this._velocity.y *= -1;
                    break;
                case "left" :
                    break;
                case "right" :
                    break;
            };
        };

        if(withObj instanceof Paddle) {
            let newAngle = (withObj.ypos + (withObj.height / 2) - this.center.y) / (withObj.height / 2) * (Math.PI / 2) * angleRestriction;
            let currentSpeed = Math.sqrt(Math.pow(this._velocity.x,2) + Math.pow(this._velocity.y,2));

            if (this._velocity.x < 0) {
                this._xpos = withObj.xpos + withObj._width;
                this._velocity.x = currentSpeed * Math.cos(newAngle) * speedChange;
                this._velocity.y = -currentSpeed * Math.sin(newAngle) * speedChange;
            }
            else if (this._velocity.x > 0) {
                this._xpos = withObj.xpos - this._width;
                this._velocity.x = -currentSpeed * Math.cos(newAngle) * speedChange;
                this._velocity.y = -currentSpeed * Math.sin(newAngle) * speedChange;
            };
        };
    }

}

export default Ball;