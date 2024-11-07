/**
 * Class representing the status bar for the boss character.
 * Extends the DrawableObjects class.
 */
class StatusbarBoss extends DrawableObjects {
    /**
     * Array of image paths representing different status bar states.
     * @type {string[]}
     */
    IMAGES = [
        "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    ];

    /**
     * The current percentage of the status bar.
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates an instance of StatusbarBoss.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the status bar and updates the image accordingly.
     * @param {number} percentage - The new percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image to use based on the current percentage.
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 4;
        }
        if (this.percentage > 60) {
            return 3;
        }
        if (this.percentage > 40) {
            return 2;
        }
        if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}