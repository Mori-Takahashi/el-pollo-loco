/**
 * Class representing a Cloud.
 * @extends movableObject
 */
class Cloud extends movableObject {
    /**
     * The y-coordinate of the cloud.
     * @type {number}
     */
    y = 20;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 250;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 500;

    /**
     * Create a Cloud.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        /**
         * The x-coordinate of the cloud, randomly set between 0 and 500.
         * @type {number}
         */
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Animate the cloud by moving it to the left at a constant speed.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}