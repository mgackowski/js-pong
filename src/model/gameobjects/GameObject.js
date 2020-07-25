import IDGenerator from "../../util/IDGenerator";

class GameObject {
    constructor(xpos, ypos, width, height) {
        this._id = IDGenerator.createNewID();
        this._xpos = xpos;
        this._ypos = ypos;
        this._width = width;
        this._height = height;
        this._entityManager = null;
    }
    step() {
        //custom step event
    }
    draw(context,xScale,yScale,xOffset,yOffset) {
        context.beginPath();
        context.fillStyle = "#AAA";
        context.fillRect(
            this._xpos * xScale + xOffset,
            this._ypos * yScale + yOffset,
            this._width * xScale,
            this._height * yScale);
        context.stroke();
    }
    get id() {
        return this._id;
    }
    get xpos() {
        return this._xpos;
    }
    get ypos() {
        return this._ypos;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get center() {
        return {
            x: this._xpos + this._width / 2,
            y: this._ypos + this._height / 2
        }
    }
    get entityManager() {
        return this._entityManager;
    }
    set xpos(xpos) {
        this._xpos = xpos;
    }
    set ypos(ypos) {
        this._ypos = ypos;
    }
    set width(width) {
        this._width = width;
    }
    set height(height) {
        this._height = height;
    }
    set entityManager(entityManager) {
        this._entityManager = entityManager;
    }
}

export default GameObject;