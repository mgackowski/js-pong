class PlayArea {

    constructor(width,height) {
        this._width = width;
        this._height = height;
        this._objects = [];
        this._controllableObjects = [];
        this._collidableObjects = [];   //TODO: getters & setters
    }

    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get objects() {
        return this._objects;
    }

}

export default PlayArea;