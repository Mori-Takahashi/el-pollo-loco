/**
 * Class representing the end screen of the game.
 * @extends DrawableObjects
 */
class Endscreen extends DrawableObjects {
    /**
     * Array of image paths for the end screen.
     * @type {string[]}
     */
    IMAGES = [
        'img/9_intro_outro_screens/game_over/game_over!.png',
        'img/9_intro_outro_screens/win/win_2.png'
    ];

    /**
     * Indicates whether the game is won or lost.
     * @type {number|null}
     */
    winOrLose = null;

    /**
     * Creates an instance of Endscreen.
     */
    constructor() {
        super();
        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
        this.loadImages(this.IMAGES);
        this.checkEndscreen(null);
    }

    /**
     * Checks and sets the end screen image based on the game result.
     * @param {number|null} winOrLose - The game result (0 for lose, 1 for win).
     */
    checkEndscreen(winOrLose) {
        this.winOrLose = winOrLose;
        let path = this.IMAGES[this.winOrLoseIndex()];
        this.img = this.imageCache[path];
        console.log('IMG WINORLOSE', winOrLose);
    }

    /**
     * Determines the index of the image to be displayed based on the game result.
     * @returns {number} The index of the image in the IMAGES array.
     */
    winOrLoseIndex() {
        if (this.winOrLose === 0) {
            return 0;
        } else {
            return 1;
        }
    }

    /**
     * Sets the end screen to the game over image.
     * @returns {void}
     */
    setGameOver() {
        return this.loadImage(this.IMAGES[0]);
    }

    /**
     * Sets the end screen to the game won image.
     * @returns {void}
     */
    setGameWon() {
        this.loadImage(this.IMAGES[1]);
    }
}