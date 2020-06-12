const makeCollidable = function(targetObj,level) {
    level.collidableObjects.push(targetObj);
    targetObj.collide = function(withObj) {
        //generic collision logic?
        //table with all possible behaviours?
        //make a file.js or .json with all behaviours?
        //define common behaviours such as destroy, bounce?
    }
};

const makeControllable = function(target,input,behaviour) {
    //TODO
};