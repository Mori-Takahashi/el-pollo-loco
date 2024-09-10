class Endscreen extends DrawableObjects{
    IMAGES = [
        'img/9_intro_outro_screens/game_over/game over!.png',
        'img/9_intro_outro_screens/win/win_1.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 200;
        this.y = 100;
        this.width = 1000;
        this.height = 400;
    }

    /*TODO fix endscreen */

    setGameOver() {
        this.img = this.imageCache[this.IMAGES[0]];
    }

    setGameWon() {
        this.img = this.imageCache[this.IMAGES[1]];
    }
}