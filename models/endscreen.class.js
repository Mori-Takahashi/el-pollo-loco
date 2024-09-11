class Endscreen extends DrawableObjects{
    IMAGES = [
        'img/9_intro_outro_screens/game_over/game_over!.png',
        'img/9_intro_outro_screens/win/win_1.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
    }

    setGameOver() {
       this.loadImage(this.IMAGES[0]);
    }

    setGameWon() {
        this.loadImage(this.IMAGES[1]);
    }
}