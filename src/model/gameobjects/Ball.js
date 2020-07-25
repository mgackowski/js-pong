import MovingObject from "./MovingObject";
import LevelBoundary from "./LevelBoundary";
import Paddle from "./Paddle";
import Controller from "../Controller";
import Jukebox from "../Jukebox";
import Glow from "./Glow";

class Ball extends MovingObject {

    constructor(xpos,ypos) {
        super(xpos,ypos,20,20);
        this._velocity.x = 0;
        this._velocity.y = 0;
        this._spawnPos = {x:xpos,y:ypos};
        this._state = "stopped"; // "stopped"||"moving"||"over_left"||"over_right"
    }

    get state() {
        return this._state;
    }
    get spawnPos() {
        return this._spawnPos;
    }

    control() {
        if(this._state == "stopped" && Controller.confirm) {
            this._velocity.x = Math.sign(Math.random()-0.5) * 200;
            if(this._velocity.x == 0) {
                this._velocity.x = 100;
            };
            this._velocity.y = Math.sign(Math.random()-0.5) * 200;
            this._state = "moving";
        }
    }

    collide(withObj) {
        let angleRestriction = 0.7; //fraction of 180 degree range to keep bounce more horizontal
        let speedChange = 1.1; //after each collision

        if(withObj instanceof LevelBoundary) {
            switch (withObj.type) {
                case "lower" :
                    this._ypos = withObj.ypos - this._height;
                    this._velocity.y *= -1;
                    Jukebox.playSound("beep_short_mid");
                    break;
                case "upper" :
                    this._ypos = withObj.ypos + withObj.height;
                    this._velocity.y *= -1;
                    Jukebox.playSound("beep_short_mid");
                    break;
                case "left" :
                    this._state = "over_left";
                    Jukebox.playSound("beep_long_low");
                    break;
                case "right" :
                    this._state = "over_right";
                    Jukebox.playSound("beep_long_low");
                    break;
            };
            this._entityManager.add(new Glow(this,"white",0.01),{});
        };

        if(withObj instanceof Paddle) {
            let newAngle = (withObj.ypos + (withObj.height / 2) - this.center.y) / (withObj.height / 2) * (Math.PI / 2) * angleRestriction;
            let currentSpeed = Math.sqrt(Math.pow(this._velocity.x,2) + Math.pow(this._velocity.y,2));

            if (this._velocity.x < 0) {
                this._xpos = withObj.xpos + withObj._width;
                this._velocity.x = currentSpeed * Math.cos(newAngle) * speedChange;
                this._velocity.y = -currentSpeed * Math.sin(newAngle) * speedChange;
                this._entityManager.add(new Glow(this,withObj.colour,0.03),{});
                this._entityManager.add(new Glow(withObj,withObj.colour,0.01),{});
            }
            else if (this._velocity.x > 0) {
                this._xpos = withObj.xpos - this._width;
                this._velocity.x = -currentSpeed * Math.cos(newAngle) * speedChange;
                this._velocity.y = -currentSpeed * Math.sin(newAngle) * speedChange;
                this._entityManager.add(new Glow(this,withObj.colour,0.03),{});
                this._entityManager.add(new Glow(withObj,withObj.colour,0.01),{});
            };

            Jukebox.playSound("beep_short_high");
        };

        
    }

}

export default Ball;