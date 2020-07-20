import MovingObject from "./MovingObject";
import Controller from "../Controller";
import LevelBoundary from "./LevelBoundary";

class Paddle extends MovingObject {

    constructor(xpos,ypos,controlledBy) {
        super(xpos,ypos,20,100);
        this._terminalVelocity = 900;
        this._controlledBy = controlledBy; // "P1"||"P2"||"AI"
    }

    control() {
        let keyPressAcceleration = 90000;
        let keyReleaseDrag = 7000;

        switch (this._controlledBy) {
            case "AI" :
                if (Controller.rightShipDown || Controller.rightShipUp) {
                    this._controlledBy = "P2";
                };
                break;

            case "P1":
                if (Controller.leftShipUp ? !Controller.leftShipDown : !Controller.leftShipDown) {
                    this.acceleration.y = 0;
                    this.drag = keyReleaseDrag;
                };
                if (Controller.leftShipUp) {
                    this.acceleration.y = -keyPressAcceleration;
                    this.drag = 0;
                };
                if (Controller.leftShipDown) {
                    this.acceleration.y = keyPressAcceleration;
                    this.drag = 0;
                };
                break;

            case "P2":
                if (Controller.rightShipUp ? !Controller.rightShipDown : !Controller.rightShipDown) {
                    this.acceleration.y = 0;
                    this.drag = keyReleaseDrag;
                };
                if (Controller.rightShipUp) {
                    this.acceleration.y = -keyPressAcceleration;
                    this.drag = 0;
                };
                if (Controller.rightShipDown) {
                    this.acceleration.y = keyPressAcceleration;
                    this.drag = 0;
                };
                break;
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