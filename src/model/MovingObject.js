import GameObject from "../../lib/model/GameObject";

class MovingObject extends GameObject {

    constructor(xpos, ypos, width, height) {
        super(xpos,ypos,width,height);
        this._velocity = {x:0, y:0};
        this._acceleration = {x:0, y:0};
    }

    //TODO: getters & setters

}