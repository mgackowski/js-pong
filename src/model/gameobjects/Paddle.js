import MovingObject from "./MovingObject";
import Controller from "../Controller";
import LevelBoundary from "./LevelBoundary";
import Ball from "./Ball";

class Paddle extends MovingObject {

    constructor(xpos,ypos,controlledBy,colour) {
        super(xpos,ypos,20,100);
        this._terminalVelocity = 900;
        this._controlledBy = controlledBy; // "P1"||"P2"||"AI"

        this._movementSpeed = 90000;
        this._movementDrag = 7000;
        this._colour = colour;
    }

    get controlledBy() {
        return this._controlledBy;
    }

    get colour() {
        return this._colour;
    }

    step() {
        if(this._controlledBy != "AI") return;

        let margin = 50;
        let balls = this._entityManager.objects.filter(el => el instanceof Ball);
        if (Math.abs(balls[0].center.y - this.center.y) < margin) {
            this.acceleration.y = 0;
            this.drag = this._movementDrag;
        }
        else if (balls[0].center.y < this.center.y && balls[0].velocity.x > 0) {
            this.acceleration.y = -this._movementSpeed;
            this.drag = 0;
        }
        else if (balls[0].center.y > this.center.y && balls[0].velocity.x > 0) {
            this.acceleration.y = this._movementSpeed;
            this.drag = 0;
        };

    }

    control() {

        switch (this._controlledBy) {
            case "AI" :
                if (Controller.rightShipDown || Controller.rightShipUp) {
                    this._controlledBy = "P2";
                };
                break;

            case "P1":
                if (Controller.leftShipUp ? !Controller.leftShipDown : !Controller.leftShipDown) {
                    this.acceleration.y = 0;
                    this.drag = this._movementDrag;
                };
                if (Controller.leftShipUp) {
                    this.acceleration.y = -this._movementSpeed;
                    this.drag = 0;
                };
                if (Controller.leftShipDown) {
                    this.acceleration.y = this._movementSpeed;
                    this.drag = 0;
                };
                break;

            case "P2":
                if (Controller.rightShipUp ? !Controller.rightShipDown : !Controller.rightShipDown) {
                    this.acceleration.y = 0;
                    this.drag = this._movementDrag;
                };
                if (Controller.rightShipUp) {
                    this.acceleration.y = -this._movementSpeed;
                    this.drag = 0;
                };
                if (Controller.rightShipDown) {
                    this.acceleration.y = this._movementSpeed;
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