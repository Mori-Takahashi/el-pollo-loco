/**
 * Class representing the Endboss character.
 * @extends movableObject
 */
class Endboss extends movableObject {

    height = 400;
    width = 250;
    y = 60;

    IMAGES_BOSS_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_BOSS_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_BOSS_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_BOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_BOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    hurtAudio = new Audio('audio/big-chicken.mp3');
    isBossDead = false;
    isBossHit = false;

    /**
     * Create an Endboss.
     */
    constructor() {
        super().loadImage(this.IMAGES_BOSS_ALERT[0]);
        this.loadImages(this.IMAGES_BOSS_ALERT);
        this.loadImages(this.IMAGES_BOSS_WALK);
        this.loadImages(this.IMAGES_BOSS_ATTACK);
        this.loadImages(this.IMAGES_BOSS_HURT);
        this.loadImages(this.IMAGES_BOSS_DEAD);
        this.x = 2500;
        this.speed = 2;
        this.animate();
        this.checkIsDead();
    }

    /**
     * Check if the boss is dead and play dead animation.
     */
    checkIsDead() {
        setInterval(() => {
            if (this.isBossDead) {
                this.playAnimation(this.IMAGES_BOSS_DEAD);
                console.log('Boss is dead');
                console.log('stop animation 1', this.currentInterval);
                console.log('stop animation 2', this.currentIntervalAnimation);
                console.log('play dead animation', this.IMAGES_BOSS_DEAD);
            }
        }, 200);
    }

    /**
     * Handle the boss being hurt.
     */
    bossHurt() {
        this.isBossHit = true;
        if (audio) this.hurtAudio.play();
        clearInterval(this.currentInterval);
        clearInterval(this.currentIntervalAnimation);
        setInterval(() => {
            if (this.isBossHit && !this.isBossDead) {
                this.playAnimation(this.IMAGES_BOSS_HURT);
            }
        }, 350);

        setTimeout(() => {
            this.isBossHit = false;
            this.startAttackInterval();
        }, 3000);
    }

    /**
     * Animate the boss.
     */
    animate() {
        let firstAnimation = 0;
        let hadFirstContact = false;

        setInterval(() => {
            let position = world.character.x;

            if (firstAnimation < 8) {
                this.playAnimation(this.IMAGES_BOSS_ALERT);
            } else {
                this.startMoving(hadFirstContact);
            }
            firstAnimation += 1;

            if (position > 1500 && !hadFirstContact) {
                firstAnimation = 0;
                hadFirstContact = true;
            }

        }, 200);
    }

    /**
     * Start moving the boss if it had first contact.
     * @param {boolean} hadFirstContact - Indicates if the boss had first contact.
     */
    startMoving(hadFirstContact) {
        if (hadFirstContact === true && !this.startAttackIntervalStarted) {
            this.startAttackIntervalStarted = true;
            setInterval(() => {
                this.startAttackInterval();
            }, 3000);
        }
    }

    /**
     * Start the attack interval.
     */
    startAttackInterval() {
        let randomAction = this.getRandomNumber();
        clearInterval(this.currentInterval);
        clearInterval(this.currentIntervalAnimation);
        if (this.isBossHit === false && this.isBossDead === false) {
            if (randomAction === 1 || randomAction === 2) {
                this.currentInterval = setInterval(() => this.startMovingLeft(), 1000 / 60);
                this.currentIntervalAnimation = setInterval(() => this.animationWalk(), 200);
            } else if (randomAction === 3) {
                this.startAttack();
                this.currentInterval = setInterval(() => this.startAttack(), 1000 / 60);
                this.currentIntervalAnimation = setInterval(() => this.animationAttack(), 200);
            }
        } else {
            if (this.isBossDead) {
                clearInterval(this.currentInterval);
                clearInterval(this.currentIntervalAnimation);
            }
        }
    }

    /**
     * Get a random number between 1 and 3.
     * @returns {number} A random number between 1 and 3.
     */
    getRandomNumber() {
        return Math.floor(Math.random() * 3) + 1;
    }

    /**
     * Start moving the boss to the left.
     */
    startMovingLeft() {
        this.moveLeft();
    }

    /**
     * Start the boss attack.
     */
    startAttack() {
        this.jump();
    }

    /**
     * Play the walking animation.
     */
    animationWalk() {
        this.playAnimation(this.IMAGES_BOSS_WALK);
    }

    /**
     * Play the attack animation.
     */
    animationAttack() {
        this.playAnimation(this.IMAGES_BOSS_ATTACK);
    }
}