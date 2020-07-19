import Level from "./Level";
import LevelBoundary from "../gameobjects/LevelBoundary";
import Ball from "../gameobjects/Ball";
import Paddle from "../gameobjects/Paddle";

class MainLevel extends Level {

    constructor(levelWidth,levelHeight) {
        super(levelWidth,levelHeight);
    };

    init() {
        this._entities.add(new LevelBoundary(this._width,this._height,"upper"),
            {collideable:true});
        this._entities.add(new LevelBoundary(this._width,this._height,"lower"),
            {collideable:true});
        this._entities.add(new LevelBoundary(this._width,this._height,"left"),
            {collideable:true});
        this._entities.add(new LevelBoundary(this._width,this._height,"right"),
            {collideable:true});

        this._entities.add(new Ball((this._width/2)-10,(this._height/2)-10),
            {moveable:true, controllable:true, collideable:true});
        this._entities.add(new Paddle(10,(this._height/2)-50,"P1"),
            {moveable:true, controllable:true, collideable:true});
        this._entities.add(new Paddle(this._width-30,(this._height/2)-50,"P2"),
            {moveable:true, controllable:true, collideable:true});
    };

};

export default MainLevel;