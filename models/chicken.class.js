class Chicken extends movableObject {
    isChickenDead = false;
    y = 340; //330
    height = 80;
    width = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    DEAD_IMAGE = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    DEAD_AUDIO = new Audio('audio/chicken_sound.mp3');


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.DEAD_IMAGE);
        this.x = 500 + Math.random() * 2200; //500
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)

        setInterval(() => {
            if (!this.isChickenDead) {
                this.chickenWalkingAnimation();
            } else {
                this.chickenDeadAnimation();
            }
        }, 200);
    }

    /**
     * for chicken dead sound.
     * @type {boolean} - true or false (True if chicken audio was played)
     */
    audio_was_played = false;



    /**
     * Handles the animation and sound for when the chicken is dead.
     * Loads the dead image and plays the dead sound if it hasn't been played yet.
     */
    chickenDeadAnimation() {
        this.loadImage(this.DEAD_IMAGE);
        if (!this.audio_was_played) {
            if (audio) this.DEAD_AUDIO.play();
            this.audio_was_played = true;
        }
    }

    /**
     * Handles the walking animation for the chicken.
     * Plays the walking animation using the images defined in IMAGES_WALKING.
     */
    chickenWalkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }


}