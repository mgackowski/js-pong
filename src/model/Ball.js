import MovingObject from "../../lib/model/MovingObject";

class Ball extends MovingObject {

    constructor(xpos,ypos) {
        super(xpos,ypos,10,10);
    }

}

export default Ball;