import GameObject from "./GameObject";

class LevelBoundary extends GameObject {

    constructor(levelWidth,levelHeight,position) {
        let thickness = 100;
        switch(position) {
            case "upper" :
                super(-thickness,-thickness,levelWidth+(thickness*2),thickness);
                break;
            case "lower" :
                super(-thickness,levelHeight,levelWidth+(thickness*2),thickness);
                break;
            case "left" :
                super(-thickness,-thickness,thickness,levelHeight+(thickness*2));
                break;
            case "right" :
                super(levelWidth,-thickness,thickness,levelHeight+(thickness*2));
                break;
            default:
                throw("Boundary position must be 'upper/lower/left/right");
                break;
        };
        this._type = position;
    }

    collide(withObj) {
        //do nothing
    }

    get type() {
        return this._type;
    }

}

export default LevelBoundary;