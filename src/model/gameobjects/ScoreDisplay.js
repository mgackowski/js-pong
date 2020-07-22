import GameObject from './GameObject';
import GameLogic from './GameLogic';
import Paddle from './Paddle';

class ScoreDisplay extends GameObject {

    constructor(xpos,ypos,player) {
        super(xpos,ypos,100,100);
        this._value = 0;
        this._player = player; //"P1"||"P2"
        this._alpha = 1;
    }

    step() {
        let logic = this._entityManager.objects.filter(
            el => el instanceof GameLogic)[0];
        this._value = logic.score[this._player];
        
        //TODO: Iterate through all paddles found
        let paddle = undefined;
        if (this._player == "P1") {
            paddle = this._entityManager.objects.filter(
                el => el instanceof Paddle && el.controlledBy == "P1")[0];
            this._xpos = paddle.xpos + paddle.width + 20;
        } else {
            paddle = this._entityManager.objects.filter(
                el => el instanceof Paddle &&
                (el.controlledBy == "P2" || el.controlledBy == "AI"))[0];
            this._xpos = paddle.xpos - 20;
        }
        if(paddle) this._ypos = paddle.center.y;

        if(this._alpha <= 0) this._entityManager.remove(this);
    }

    draw(context,xScale,yScale,xOffset,yOffset) {
        context.font = this._height + 'px sans-serif';
        context.textBaseline = 'middle';
        this._player == "P1" ? context.textAlign = 'left' : context.textAlign = 'right';
        context.globalAlpha = this._alpha;
        context.fillText(this._value,
            (this._xpos * xScale) + xOffset,
            (this._ypos * yScale) + yOffset);
        context.globalAlpha = 1;
        this._alpha -= 0.01;
    }

}

export default ScoreDisplay;