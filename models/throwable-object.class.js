class ThrowableObject extends movableObject {
    BOTTLE_ROTAION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
        ];

    /**
     * new ThrowableObject(this.character.x + 100, this.character.y + 100);
     * @param x - info x
     * @param y - info y
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.BOTTLE_ROTAION);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.trow();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_ROTAION);
        }, 100);
    }

    /* TODO: fix the throw method */

    /**
     * Throw bottle
     * @param x - x from character
     * @param y - y from character
     */
    trow() {
        this.speedY = 30;
        this.applyGravity();
        if (this.otherDirection) {
            setInterval(() => {
                this.x -= 10;
            }, 25);
        } else {
            setInterval(() => {
                this.x += 10;
            }, 25);
        }
    }
}