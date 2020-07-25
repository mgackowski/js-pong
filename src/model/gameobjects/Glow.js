import GameObject from "./GameObject";

class Glow extends GameObject{

    constructor(onObject,colour,fadePerStep) {
        super(onObject.xpos,onObject.ypos,onObject.width,onObject.height);
        this._onObject = onObject;
        this._colour = colour;
        this._fadePerStep = fadePerStep;
        this._alpha = 1;
    }

    step() {
        this._xpos = this._onObject.xpos;
        this._ypos = this._onObject.ypos;
        this._width = this._onObject.width;
        this._height = this._onObject.height;
        this._alpha -= this._fadePerStep;

        if(this._alpha <= 0) {
            this._entityManager.remove(this);
        };
    }

    draw(context,xScale,yScale,xOffset,yOffset) {

        let currentShadowBlur = context.shadowBlur;
        let currentShadowColor = context.shadowColor;
        let currentFillStyle = context.fillStyle;
        let currentGlobalAlpha = context.globalAlpha;

        context.shadowBlur = 20 * xScale;
        context.fillStyle = this._colour;
        context.shadowColor = this._colour;
        context.globalAlpha = this._alpha;
        context.fillRect(
            this._onObject._xpos * xScale + xOffset,
            this._onObject._ypos * yScale + yOffset,
            this._onObject._width * xScale,
            this._onObject._height * yScale);

        context.shadowBlur = currentShadowBlur;
        context.shadowColor = currentShadowColor;
        context.fillStyle = currentFillStyle;
        context.globalAlpha = currentGlobalAlpha;
    }

}

export default Glow;