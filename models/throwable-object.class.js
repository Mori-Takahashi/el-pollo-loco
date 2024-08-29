class ThrowableObject extends movableObject {


    /**
     * new ThrowableObject(this.character.x + 100, this.character.y + 100);
     * @param x - info x
     * @param y - info y
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.trow();

    }


    /**
     * Throw bottle
     * @param x - x from character
     * @param y - y from character
     */
    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}