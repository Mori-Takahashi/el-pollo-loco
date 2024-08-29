class movableObject extends  DrawableObjects{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    /**
     * Falling down Speed
     * @type {number} - speed
     */
    acceleration = 2.5;


    /**
     * Life / Energy of character
     * @type {number} - 100(%) is default value.
     */
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
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 155
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