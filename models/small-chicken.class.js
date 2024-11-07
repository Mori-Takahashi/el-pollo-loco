/**
 * Class representing a small chicken that can move and animate.
 * @extends movableObject
 */
class SmallChicken extends movableObject {
    /**
     * Indicates if the chicken is dead.
     * @type {boolean}
     */
    isChickenDead = false;

    /**
     * The y-coordinate of the chicken.
     * @type {number}
     */
    y = 360;

    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 60;

    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 50;

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Array of image paths for the dead animation.
     * @type {string[]}
     */
    DEAD_IMAGE = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Audio object for the chicken dead sound.
     * @type {Audio}
     */
    DEAD_AUDIO = new Audio('audio/chicken_sound.mp3');

    /**
     * Creates an instance of SmallChicken.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.DEAD_IMAGE);
        this.x = 500 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Animates the chicken by moving it left and switching between walking and dead animations.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isChickenDead === false) {
                this.chickenWalkingAnimation();
            } else {
                this.chickenDeadAnimation();
            }
        }, 200);
    }

    /**
     * Indicates if the chicken dead audio was played.
     * @type {boolean}
     */
    audio_was_played = false;

    /**
     * Loads the dead image and plays the dead audio if it hasn't been played yet.
     */
    chickenDeadAnimation() {
        this.loadImage(this.DEAD_IMAGE);
        if (!this.audio_was_played) {
            if (audio) this.DEAD_AUDIO.play();
            this.audio_was_played = true;
        }
    }

    /**
     * Plays the walking animation by cycling through the walking images.
     */
    chickenWalkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }
}