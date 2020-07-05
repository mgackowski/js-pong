class Level {

    constructor(width,height) {
        this._width = width;
        this._height = height;
        this._objects = [];
        this._moveableObjects = [];
        this._controllableObjects = [];
        this._collideableObjects = [];
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
    get moveableObjects() {
        return this._moveableObjects;
    }
    get controllableObjects() {
        return this._controllableObjects;
    }
    get collideableObjects() {
        return this._collideableObjects;
    }

}

export default Level;