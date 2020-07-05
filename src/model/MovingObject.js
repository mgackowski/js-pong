import GameObject from "../../lib/model/GameObject";

class MovingObject extends GameObject {

    constructor(xpos, ypos, width, height) {
        super(xpos,ypos,width,height);
        this._velocity = {x:0, y:0};
        this._acceleration = {x:0, y:0};
        this._drag = 0;
        this._terminalVelocity = Number.MAX_VALUE;
    }

    move(timeElapsed) {

        let dimensions = ["x","y"];
        let tDrag = this._drag * timeElapsed / 1000;
        dimensions.forEach((prop) => {
            //apply base acceleration
            this._velocity[prop] += this._acceleration[prop] * (timeElapsed / 1000);

            //slow down using drag
            if (this._velocity[prop] > 0 && this._velocity[prop] > tDrag) {
                this._velocity[prop] -= tDrag;
            } else if (this._velocity[prop] > 0 && this._velocity[prop] < tDrag) {
                this._velocity[prop] = 0;
            } else if (this._velocity[prop] < 0 && this._velocity[prop] < tDrag * -1) {
                this._velocity[prop] += tDrag;
            } else if (this._velocity[prop] < 0 && this._velocity[prop] > tDrag * -1) {
                this._velocity[prop] = 0;
            }

            //cap at terminal velocity
            if (this._velocity[prop] > 0 && this._velocity[prop] > this._terminalVelocity) {
                this._velocity[prop] = this._terminalVelocity;
            }
            else if (this._velocity[prop] < 0 && this._velocity[prop] < (this._terminalVelocity * -1)) {
                this._velocity[prop] = this._terminalVelocity * -1;
            };
        });

        //update object position
        this._xpos += this._velocity.x * (timeElapsed / 1000);
        this._ypos += this._velocity.y * (timeElapsed / 1000);

    }

    get velocity() {
        return this._velocity;
    }

    get acceleration() {
        return this._acceleration;
    }

    get drag() {
        return this._drag;
    }

    get terminalVelocity() {
        return this._terminalVelocity;
    }

    set velocity(velocity) {
        this._velocity = velocity;
    }
    
    set acceleration(acceleration) {
        this._acceleration = acceleration;
    }

    set drag(drag) {
        this._drag = drag;
    }

    set velocity(terminalVelocity) {
        this._terminalVelocity = terminalVelocity;
    }

}

export default MovingObject;