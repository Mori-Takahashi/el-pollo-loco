/**
 * Class representing a Coin, which is a type of movable object.
 * The Coin class handles the loading of images, setting initial positions,
 * and animating the coin.
 *
 * @extends movableObject
 */
class Coin extends movableObject {
    /**
     * The height of the coin.
     * @type {number}
     */
    height = 60;

    /**
     * The width of the coin.
     * @type {number}
     */
    width = 50;

    /**
     * Array of image paths for the coin animation.
     * @type {string[]}
     */
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Create a Coin.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);

        /**
         * The x-coordinate of the coin, randomly set between 500 and 2300.
         * @type {number}
         */
        this.x = 500 + Math.random() * 1800;

        /**
         * The y-coordinate of the coin, randomly set between 155 and 350.
         * @type {number}
         */
        this.y = 155 + Math.random() * 195;
        this.animate();
    }

    /**
     * Animate the coin by cycling through the images at a set interval.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 500);
    }
}