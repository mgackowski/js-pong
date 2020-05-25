import RectangularObject from './model/RectangularObject.js';
import Paddle from './model/Paddle.js';

let testObject = new RectangularObject(1,2,3,4);
let paddleObject = new Paddle(50,50);

console.log(paddleObject.width);
console.log(paddleObject.height);