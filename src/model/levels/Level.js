import EntityManager from "./EntityManager";

class Level {

    constructor(width,height) {
        this._width = width;
        this._height = height;
        this._entities = new EntityManager();
    };

    get width() {
        return this._width;
    };
    get height() {
        return this._height;
    };
    get entities() {
        return this._entities;
    };

    init() {};

}

export default Level;