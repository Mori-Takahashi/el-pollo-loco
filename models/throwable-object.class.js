class ThrowableObject extends movableObject {
    BOTTLE_ROTAION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
        ];

    BOTTLE_SMASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    brakeAudio = new Audio('audio/bottle_brake.mp3');


    isColliding(moveObject) {
        return super.isColliding(moveObject);
    }

    /**
     * new ThrowableObject(this.character.x + 100, this.character.y + 100);
     * @param x - info x
     * @param y - info y
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.BOTTLE_ROTAION);
        this.loadImages(this.BOTTLE_SMASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.trow();
        this.animate();
    }


    audio_was_played = false;
    isSmashed = false;

    //300 200 100
    animate() {
        setInterval(() => {
            if (this.y < 350) {
                this.playAnimation(this.BOTTLE_ROTAION);
            } else if (this.checkBottleHit()) {
                this.playAnimation(this.BOTTLE_SMASH);
                if (!this.audio_was_played) {
                    if (audio) this.brakeAudio.play();
                    this.audio_was_played = true;
                }
            } else {
                this.playAnimation(this.BOTTLE_SMASH);
                if (!this.audio_was_played) {
                    if (audio) this.brakeAudio.play();
                    this.audio_was_played = true;
                }
            }
        }, 95);
    }

    checkBottleHit() {
        return world.bossHit
    }

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