/**
 * Class representing a CoinBar, which is a drawable object that displays the status of coins collected.
 * @extends DrawableObjects
 */
class CoinBar extends DrawableObjects {
    /**
     * Array of image paths representing different coin status levels.
     * @type {string[]}
     */
    COIN_STATUSBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
     * The current percentage of coins collected.
     * @type {number}
     */
    percentage = 0;

    /**
     * Create a CoinBar.
     */
    constructor() {
        super();
        this.loadImages(this.COIN_STATUSBAR);
        this.x = 20;
        this.y = 90;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Set the percentage of coins collected and update the image accordingly.
     * @param {number} percentage - The percentage of coins collected.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.COIN_STATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolve the index of the image to be displayed based on the current percentage.
     * @returns {number} The index of the image in the COIN_STATUSBAR array.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}