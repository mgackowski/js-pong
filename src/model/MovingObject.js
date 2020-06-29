import GameObject from "../../lib/model/GameObject";

class MovingObject extends GameObject {

    constructor(xpos, ypos, width, height) {
        super(xpos,ypos,width,height);
        this._velocity = {x:0, y:0};
        this._acceleration = {x:0, y:0};
        this._drag = 0;
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

    set velocity(velocity) {
        this._velocity = velocity;
    }
    
    set acceleration(acceleration) {
        this._acceleration = acceleration;
    }

    set drag(drag) {
        this._drag = drag;
    }

}

export default MovingObject;