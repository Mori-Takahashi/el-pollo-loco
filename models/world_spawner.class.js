class World_spawner extends DrawableObjects{
    lastHit = 0;

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
     * add Coin
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
}