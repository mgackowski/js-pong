class LevelManager {

    constructor(viewManager) {
        this._levels = [];
        this._currentLevel = 0;
        this._viewManager = viewManager;
    }

    get levels() {
        return this._levels;
    }

    get currentLevel() {
        return this._currentLevel;
    }

    add(level) {
        level.levelManager = this;
        this._levels.push(level);
    }

    gotoNextLevel() {
        this.gotoLevel((this.currentLevel + 1) % this._levels.length);
    }

    gotoLevel(levelNumber) {
        this._viewManager.deactivate(this._currentLevel);
        this.unloadLevel(this.currentLevel);
        this._currentLevel = levelNumber;
        this._levels[levelNumber].init();
        this._viewManager.activate(levelNumber);
    }

    unloadLevel(levelNumber) {
        this._levels[levelNumber].entities.clear();
    }

};

export default LevelManager;