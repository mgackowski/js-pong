import MovingObject from "../../lib/model/MovingObject";
import GameObject from "../../lib/model/GameObject";

class Ball extends MovingObject {

    constructor(xpos,ypos) {
        super(xpos,ypos,10,10);
        this._velocity.x = 1;
        this._velocity.y = 1;
    }

    step() { //TODO: extract to move()?
        this._velocity.x += this._acceleration.x;
        this._velocity.y += this._acceleration.y;
    }

    draw(context) {
        context.beginPath();
        context.rect(this._xpos,this._ypos,this._width,this._height);
        context.stroke;
    }

    collide(withObj,side) {
        if(typeof withObj === "GameObject") {
            if(side === "top") {
                this._ypos = withObj.ypos + withObj.height;
                this._velocity.y *= -1;
            }
            if(side === "bottom") {
                this._ypos = withObj.ypos - this._height;
                this._velocity.y *= -1;
            }
            if(side === "left") {
                this._xpos = withObj.xpos + withObj._width;
                this._velocity.x *= -1;
            }
            if(side === "right") {
                this._xpos = withObj.xpos - this._width;
                this._velocity.x *= -1;
            }
        }
        if(typeof withObj === "Paddle") {
            //TODO: map change in angle to position
            //relative to Paddle
            this._velocity.x *= 0.01;
            this._velocity.y *= 0.01;
        }
    }

    destroy() {
        this = {};
    }

}

export default Ball;