/**
 * Class representing a Salsa object that extends a movableObject.
 * The Salsa object has specific dimensions and images associated with it.
 */
class Salsa extends movableObject {
    /**
     * The y-coordinate of the Salsa object.
     * @type {number}
     */
    y = 360;

    /**
     * The height of the Salsa object.
     * @type {number}
     */
    height = 60;

    /**
     * The width of the Salsa object.
     * @type {number}
     */
    width = 50;

    /**
     * Array of image paths for the Salsa object.
     * @type {string[]}
     */
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    /**
     * Create a Salsa object.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);

        /**
         * The x-coordinate of the Salsa object, randomly set within a range.
         * @type {number}
         */
        this.x = 500 + Math.random() * 1800;
        this.animate();
    }

    /**
     * Animate the Salsa object by playing its animation at regular intervals.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}