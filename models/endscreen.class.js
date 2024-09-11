class Endscreen extends DrawableObjects{
    IMAGES = [
        'img/9_intro_outro_screens/game_over/game_over!.png',
        'img/9_intro_outro_screens/win/win_2.png'
    ];

    winOrLose = null;

    constructor() {
        super();
        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
        this.loadImages(this.IMAGES);
        this.checkEndscreen(null);
    }

    checkEndscreen(winOrLose) {
        this.winOrLose = winOrLose;
        let path = this.IMAGES[this.winOrLoseIndex()];
        this.img = this.imageCache[path];
        console.log('IMG WINORLOSE', winOrLose);
    }

    winOrLoseIndex() {
        if (this.winOrLose === 0) {
            return 0;
        } else {
            return 1;
        }
    }

    setGameOver() {
       return this.loadImage(this.IMAGES[0]);
    }

    setGameWon() {
        this.loadImage(this.IMAGES[1]);
    }
}