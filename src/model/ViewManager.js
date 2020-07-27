class ViewManager {

    constructor() {
        this._views = [];
    }

    get currentLevel() {
        return this._currentLevel;
    }

    getView(number) {
        return this._views[number];
    }

    add(view) {
        this._views.push(view);
    }

    activate(viewNumber) {
        this._views[viewNumber].isRendered = true;
    }

    deactivate(viewNumber) {
        this._views[viewNumber].isRendered = false;
    }

    render(context) {
        this._views.forEach(view => {
            view.render(context);
        });
    }

};

export default ViewManager;