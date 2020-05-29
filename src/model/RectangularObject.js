class RectangularObject {
    constructor(xpos, ypos, width, height) {
        this._xpos = xpos;
        this._ypos = ypos;
        this._width = width;
        this._height = height;
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
}

export default RectangularObject;