class View {

    constructor(level,targetViewWidth,targetViewHeight) {
        this._level = level;
        this._width = targetViewWidth;
        this._height = targetViewHeight;
    };

    render(context) {
        let keepProportions = true;

        let xScaleFactor = this._width / this._level.width;
        let yScaleFactor = this._height / this._level.height;

        let xOffset = 0;
        let yOffset = 0;

        if (keepProportions) {
            if (xScaleFactor > yScaleFactor) {
                xScaleFactor = yScaleFactor;
                xOffset = (this._width - (this._level.width * xScaleFactor)) / 2;
            } else {
                yScaleFactor = xScaleFactor;
                yOffset = (this._height - (this._level.height * yScaleFactor)) / 2;
            };

            /* draw level background */
            context.fillStyle = "black";
            context.fillRect(
                0 + xOffset,
                0 + yOffset,
                this._level.width * xScaleFactor,
                this._level.height * yScaleFactor);
            //context.stroke();
        };

        this._level.objects.forEach((el) => {
            if ( true ) { // TODO: no sprite check
                context.beginPath();
                context.fillStyle = "#888888";
                context.fillRect(
                    el.xpos * xScaleFactor + xOffset,
                    el.ypos * yScaleFactor + yOffset,
                    el.width * xScaleFactor,
                    el.height * yScaleFactor);
                context.stroke();
            } else {
                //use sprite
            };
        });

    }

}

export default View;