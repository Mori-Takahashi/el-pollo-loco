class movableObject {
    x = 120;
    y = 280;
    img;
    height= 150;
    width= 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    /**
     * Falling down Speed
     * @type {number} - speed
     */
    acceleration = 2.5;

    /**
     * Gravity (Jump)
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25);
    }

    /**
     * Checks whether the character is on the floor
     * @returns {boolean} - none
     */
    isAboveGround() {
        return this.y < 155
    }

    /**
     * Load images
     * @param path - path of the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     *
     * @param {Array} arr - Array where img will be loaded ['img/img1.png', img/img2.png, ...]
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Animate images loop
     * @param {array} images - Path of the array images (this.IMAGES_WALKING)
     */
    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        // i = 0, 1, 2, 3, 4, 5, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
            this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}