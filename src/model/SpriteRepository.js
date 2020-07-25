const SpriteRepository = {

    _sprites: {
        bg : {src: "./assets/bg.svg"}
    },

    getSprite : function(name) {
        let image = new Image();
        image.src = this._sprites[name].src;
        return image;
    }

};

export default SpriteRepository;