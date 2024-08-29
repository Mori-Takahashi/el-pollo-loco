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
    energy = 100;
    lastHit = 0;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * creates the "hit box"
     * @param ctx - context
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    }

    /**
     * Checks whether 2 objects combine
     * @param moveObject - objects
     * @returns {boolean} - e.g. character.isColliding(chicken);
     */
    isColliding(moveObject) {
        return this.x + this.width > moveObject.x &&
            this.y + this.height > moveObject.y &&
            this.x < moveObject.x &&
            this.y < moveObject.y + moveObject.height;
    }

    /**
     * remove energy
     */
    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    /**
     * Is character energy === 0
     * @returns {boolean} - true or false
     */
    isDead() {
        return this.energy === 0;
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
        let i = this.currentImage % images.length;
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