class EntityManager {

    constructor() {
        this._objects = [];
        this._moveableObjects = [];
        this._controllableObjects = [];
        this._collideableObjects = [];
    };

    /*
        @param props Object with boolean properties: moveable, controllable and/or collideable
    */
    add(object,props) {
        object.entityManager = this;
        this._objects.push(object);
        if(props.hasOwnProperty("moveable")) this._moveableObjects.push(object);
        if(props.hasOwnProperty("controllable")) this._controllableObjects.push(object);
        if(props.hasOwnProperty("collideable")) this._collideableObjects.push(object);
    };

    remove(object) {
        this._objects = this._objects.filter(entity => entity !== object);
        this._moveableObjects = this._moveableObjects.filter(entity => entity !== object);
        this._controllableObjects = this._controllableObjects.filter(entity => entity !== object);
        this._collideableObjects = this._collideableObjects.filter(entity => entity !== object);
    };

    clear() {
        this._objects = [];
        this._moveableObjects = [];
        this._controllableObjects = [];
        this._collideableObjects = [];
    };

    get objects() {
        return this._objects;
    };

    get moveableObjects() {
        return this._moveableObjects;
    };

    get controllableObjects() {
        return this._controllableObjects;
    };

    get collideableObjects() {
        return this._collideableObjects;
    };

}

export default EntityManager;