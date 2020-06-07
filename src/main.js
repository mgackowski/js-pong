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
    console.log(`${el.id}, ${el.xpos}, ${el.ypos}, ${el.width}, ${el.height}`);
}))

const init = function() {
    // create playarea and set objects on it
    // initialise variables
}

const loop = function() {

    // 1. take input
        //read input
        //call listeners on controllable objects
            //e.g. update velocities, accelerations.
    // 2. process logic (movement, scores etc.)
        //calculate and object positions
        //call listeners on collidable objects
    // 3. render

}