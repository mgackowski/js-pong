import SpriteRepository from "./SpriteRepository";
import LevelManager from "./levels/LevelManager";

class View {

    constructor(level,targetViewWidth,targetViewHeight) {
        this._level = level;
        this._width = targetViewWidth;
        this._height = targetViewHeight;
        this._backgroundImage = SpriteRepository.getSprite("bg");
        this._isRendered = false;
    };

    get isRendered() {
        return this._isRendered;
    }

    set isRendered(bool) {
        this._isRendered = bool;
    }

    render(context) {
        if (!this._isRendered) return;

        let keepProportions = true;
        let level = this._level;

        let xScaleFactor = this._width / level.width;
        let yScaleFactor = this._height / level.height;

        let xOffset = 0;
        let yOffset = 0;

        if (keepProportions) {
            if (xScaleFactor > yScaleFactor) {
                xScaleFactor = yScaleFactor;
                xOffset = (this._width - (level.width * xScaleFactor)) / 2;
            } else {
                yScaleFactor = xScaleFactor;
                yOffset = (this._height - (level.height * yScaleFactor)) / 2;
            };
        };

        /* draw level background */
        context.fillStyle = "black";
        context.fillRect(
            0 + xOffset,
            0 + yOffset,
            level.width * xScaleFactor,
            level.height * yScaleFactor
        );

        context.drawImage(
            this._backgroundImage,
            0 + xOffset,
            0 + yOffset,
            level.width * xScaleFactor,
            level.height * yScaleFactor
        );
        

        level.entities.objects.forEach((el) => {
            el.draw(context,xScaleFactor,yScaleFactor,xOffset,yOffset);
        });

    }

}

export default View;