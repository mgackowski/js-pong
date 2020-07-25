const Jukebox = {

    _sounds : {
        beep_short_high: {src: "./assets/high_short.ogg"},
        beep_short_mid: {src: "./assets/mid_short.ogg"},
        beep_long_low: {src: "./assets/low_long.ogg"}
    },

    playSound : function(name) {
        let sound = new Audio(this._sounds[name].src);
        sound.volume = 0.25;
        sound.play();
    }

}

export default Jukebox;