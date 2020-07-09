const Controller = {

    leftShipUp : false,
    leftShipDown : false,
    rightShipUp : false,
    rightShipDown : false,
    confirm : false,

    init : function() {

        window.addEventListener("keydown", function (event) {
            console.log("Key down: " + event.key);
            Controller._mapToAction(event.key,true);
        });

        window.addEventListener("keyup", function (event) {
            Controller._mapToAction(event.key,false);
        });

    },

    _mapToAction : function(key, isPressed) {

        switch (key) {
            case "w":
                this.leftShipUp = isPressed;
                break;
            case "s":
                this.leftShipDown = isPressed;
                break;
            case "Up":
            case "ArrowUp":
                this.rightShipUp = isPressed;
                break;
            case "Down":
            case "ArrowDown":
                this.rightShipDown = isPressed;
                break;
            case "Enter":
            case "Spacebar":
            case " ":
                this.confirm = isPressed;
                break;
            default:
                return;
        }

    }

}

export default Controller;
