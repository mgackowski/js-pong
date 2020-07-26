import SpriteRepository from "./SpriteRepository";
import LevelManager from "./levels/LevelManager";

class View {

    constructor(levelManager,targetViewWidth,targetViewHeight) {
        this._levelManager = levelManager;
        this._width = targetViewWidth;
        this._height = targetViewHeight;
    };

    render(context) {
        let keepProportions = true;
        let level = this._levelManager.levels[this._levelManager.currentLevel];

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

            /* draw level background */
            context.fillStyle = "black";
            context.fillRect(
                0 + xOffset,
                0 + yOffset,
                level.width * xScaleFactor,
                level.height * yScaleFactor
            );

            context.drawImage(
                SpriteRepository.getSprite("bg"),
                0 + xOffset,
                0 + yOffset,
                level.width * xScaleFactor,
                level.height * yScaleFactor
            );
        };

        level.entities.objects.forEach((el) => {
            el.draw(context,xScaleFactor,yScaleFactor,xOffset,yOffset);
        });

    }

}

export default View;