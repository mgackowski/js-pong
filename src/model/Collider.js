const Collider = {

    findCollisions : function(gameObjects) {
        let collisions = [];
        gameObjects.forEach(obj => {
            gameObjects.forEach(target => {
                if (obj === target) return; //continue loop
                if (obj.xpos + obj.width > target.xpos
                    && obj.xpos < target.xpos + target.width
                    && obj.ypos + obj.height > target.ypos
                    && obj.ypos < target.ypos + target.height) {
                    collisions.push({collidingObj : obj, withObj : target});
                };
            });
        });
        return collisions;
    },

    runCollisions : function(collisions) {
        collisions.forEach(obj => {
            obj.collidingObj.collide(obj.withObj);
        });
    }

};

export default Collider;