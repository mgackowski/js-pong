import RectangularObject from "../../lib/model/RectangularObject";

class Ball extends RectangularObject {

    constructor(xpos,ypos) {
        super(xpos,ypos,10,10);
    }

}

export default Ball;