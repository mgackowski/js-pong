import EntityManager from "./EntityManager";
import LevelManager from "./LevelManager";

class Level {

    constructor(width,height) {
        this._width = width;
        this._height = height;
        this._entities = new EntityManager();
        this._levelManager = null;
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
    set levelManager(levelManager) {
        this._levelManager = levelManager;
    };

    init() {};

}

export default Level;