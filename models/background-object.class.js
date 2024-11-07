/**
 * Class representing a background object.
 * @extends movableObject
 */
class BackgroundObject extends movableObject {

    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Create a background object.
     * @param {string} imagePath - The path to the image.
     * @param {number} x - The x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // 480 - 400
    }
}