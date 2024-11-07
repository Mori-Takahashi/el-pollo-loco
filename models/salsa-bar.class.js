/**
 * Class representing a SalsaBar, which is a drawable object that displays
 * different images based on a percentage value.
 * @extends DrawableObjects
 */
class SalsaBar extends DrawableObjects {
    /**
     * Array of image paths representing different states of the SalsaBar.
     * @type {string[]}
     */
    IMAGES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];

    /**
     * The current percentage value of the SalsaBar.
     * @type {number}
     */
    percentage = 0;

    /**
     * Create a SalsaBar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Set the percentage value of the SalsaBar and update the displayed image.
     * @param {number} percentage - The percentage value to set (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage * 5;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolve the index of the image to display based on the current percentage.
     * @returns {number} The index of the image to display.
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