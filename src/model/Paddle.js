import MovingObject from "../../lib/model/MovingObject";

class Paddle extends MovingObject {

    constructor(xpos,ypos) {
        super(xpos,ypos,10,50);
    }

}

export default Paddle;