import MovingObject from "../../lib/model/MovingObject";
import Controller from "../Controller";
import LevelBoundary from "./LevelBoundary";

class Paddle extends MovingObject {

    constructor(xpos,ypos) {
        super(xpos,ypos,20,100);
        this._terminalVelocity = 900;
    }

    control() {
        if (Controller.leftShipUp ? !Controller.leftShipDown : !Controller.leftShipDown) {
            this.acceleration.y = 0;
            this.drag = 7000;
        };
        if (Controller.leftShipUp) {
            this.acceleration.y = -90000;
            this.drag = 0;
        };
        if (Controller.leftShipDown) {
            this.acceleration.y = 90000;
            this.drag = 0;
        };

    }

    collide(withObj) {
        if (withObj instanceof LevelBoundary && withObj.type === "upper") {
            this._ypos = withObj.ypos + withObj.height;
            this._velocity.y = 0;
            this._acceleration.y = 0;
        }
        if (withObj instanceof LevelBoundary && withObj.type === "lower") {
            this._ypos = withObj.ypos - this._height;
            this._velocity.y = 0;
            this._acceleration.y = 0;
        }
    }

}

export default Paddle;