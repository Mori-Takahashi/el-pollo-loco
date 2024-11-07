/**
 * Class representing a throwable object.
 * Extends the movableObject class.
 */
class ThrowableObject extends movableObject {
    /**
     * Array of image paths representing the bottle rotation animation.
     * @type {string[]}
     */
    BOTTLE_ROTAION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of image paths representing the bottle smash animation.
     * @type {string[]}
     */
    BOTTLE_SMASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Audio object for the bottle brake sound.
     * @type {Audio}
     */
    brakeAudio = new Audio('audio/bottle_brake.mp3');

    /**
     * Checks if the throwable object is colliding with another object.
     * @param {Object} moveObject - The object to check collision with.
     * @returns {boolean} True if colliding, false otherwise.
     */
    isColliding(moveObject) {
        return super.isColliding(moveObject);
    }

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The x-coordinate of the throwable object.
     * @param {number} y - The y-coordinate of the throwable object.
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

    /**
     * Indicates whether the audio was played.
     * @type {boolean}
     */
    audio_was_played = false;

    /**
     * Indicates whether the bottle is smashed.
     * @type {boolean}
     */
    isSmashed = false;

    /**
     * Animates the throwable object.
     */
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

    /**
     * Checks if the bottle has hit the boss.
     * @returns {boolean} True if the bottle hit the boss, false otherwise.
     */
    checkBottleHit() {
        return world.bossHit;
    }

    /**
     * Throws the bottle.
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