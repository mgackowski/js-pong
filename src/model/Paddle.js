import RectangularObject from "../../lib/model/RectangularObject";

class Paddle extends RectangularObject {

    constructor(xpos,ypos) {
        super(xpos,ypos,10,50);
    }

}

export default Paddle;