class Character extends movableObject{

    height = 280;
    y = 155; // 155
    speed = 10;
    lastKeyPressTime = Date.now();
    collecting = false;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_long_idle = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    walking_sound = new Audio('audio/walk_sound.mp3');
    snoose_sound = new Audio('audio/snort.mp3');
    COIN_SOUND = new Audio('audio/coin.mp3');
    salsa_SOUND = new Audio('audio/bottle.mp3');
    hurt_SOUND = new Audio('audio/hurt.mp3');


    /**
     * Constructs a new Character instance.
     * Loads images, applies gravity, and starts animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_long_idle);
        this.applyGravity();
        this.animate();
        this.jumpOneTime = false;
        this.playHurtSound = true;
    }

    /**
     * Updates the timestamp of the last key press to the current time.
     */
    updateLastKeyPressTime() {
        this.lastKeyPressTime = new Date().getTime();
    }

    /**
     * Checks if the character is collecting an item (coin or salsa).
     * If a coin or salsa is found, sets the collecting flag to true and returns the item.
     * Otherwise, sets the collecting flag to false and returns null.
     *
     * @returns {Object|null} The collected item (coin or salsa) or null if no item is collected.
     */
    isCollecting() {
        const coin = this.world.level.coins.find(coin => this.isColliding(coin));
        if (coin) {
            this.collecting = true;
            return coin;
        }
        const salsa = this.world.level.salsa.find(salsa => this.isColliding(salsa));
        if (salsa) {
            this.collecting = true;
            return salsa;
        }
        this.collecting = false;
        return null;
    }

    /**
     * Removes the specified object from the canvas and sets the collecting flag to false.
     *
     * @param {Object} object - The object to be removed from the canvas.
     */
    removeObject(object) {
        this.world.removeObjectFromCanvas(object);
        this.collecting = false;
    }

    /**
     * Animates the character by setting up various intervals for different actions.
     * Handles movement, jumping, and playing animations based on the character's state.
     */
    animate() {
        setInterval(() => {

            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.x + this.width < this.world.endboss.x) {
                this.moveRight();
                if (audio) this.walking_sound.play();
                this.otherDirection = false;
                this.updateLastKeyPressTime();
                this.snoose_sound.pause();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                if (audio) this.walking_sound.play();
                this.otherDirection = true;
                this.updateLastKeyPressTime();
                this.snoose_sound.pause();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.updateLastKeyPressTime();
                this.snoose_sound.pause();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.deadLikeMario();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.hurtSound();
            } else {
                    if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
                        this.playAnimation(this.IMAGES_WALKING);
                    }
                }
            },50);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 80);

        setInterval(() => {
            if (Date.now() - this.lastKeyPressTime > 100) {
                this.playAnimation(this.IMAGES_IDLE);
            }
            if (Date.now() - this.lastKeyPressTime > 15000) {
                this.playAnimation(this.IMAGES_long_idle);
                if (audio) this.snoose_sound.play();
            }
        }, 200);
    }

    /**
     * Checks if the character is collecting an item (coin or salsa).
     * If an item is collected, it removes the object from the canvas.
     */
    checkIsCollecting() {
        const collectedObject = this.isCollecting();
        if (collectedObject) {
            this.removeObject(collectedObject);
        }
    }

    /**
     * Makes the character jump once when dead, similar to Mario.
     * Sets the `jumpOneTime` flag to true to ensure the jump happens only once.
     * After a delay, sets the character's y-coordinate to 400.
     */
    deadLikeMario() {
        if (!this.jumpOneTime) {
            this.jumpOneTime = true;
            this.jump();
            setTimeout(() => {
                this.y = 400;
            }, 1000);

            console.log('jumpOneTime', this.y);
        }
    }

    /**
     * Plays the hurt sound if the character is hurt and not above ground.
     * Ensures the sound is played only once within a specified interval.
     */
    hurtSound() {
        if (this.playHurtSound && !this.isAboveGround()) {
            if (audio) this.hurt_SOUND.play();
            this.playHurtSound = false;
            setTimeout(() => {
                this.playHurtSound = true;
            }, 1000);
        }
    }
}