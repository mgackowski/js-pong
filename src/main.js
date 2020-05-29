import Paddle from './model/Paddle.js';
import PlayArea from './model/PlayArea.js';
import Ball from './model/Ball.js';

const playArea = new PlayArea(500,500);
playArea.objects.push(
    new Ball(250,250),
    new Paddle(0,250),
    new Paddle(240,250)
);

console.log(playArea.objects.forEach((el) => {
    console.log(`${el.xpos}, ${el.ypos}, ${el.width}, ${el.height}`);
}))