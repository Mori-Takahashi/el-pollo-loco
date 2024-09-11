class Endboss extends movableObject{

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


    constructor() {
        super().loadImage(this.IMAGES_BOSS_ALERT[0]);
        this.loadImages(this.IMAGES_BOSS_ALERT);
        this.loadImages(this.IMAGES_BOSS_WALK);
        this.loadImages(this.IMAGES_BOSS_ATTACK);
        this.loadImages(this.IMAGES_BOSS_HURT);
        this.loadImages(this.IMAGES_BOSS_DEAD);
        this.x = 2500;
        this.speed = 0.80;
        this.animate();
    }

    isBossHit = false;

    bossHurt() {
        this.isBossHit = true;
        this.hurtAudio.play();
        setInterval(() => {
            if (this.isBossHit) {
                this.playAnimation(this.IMAGES_BOSS_HURT);
            }
        }, 400);

        setTimeout(() => {
            this.isBossHit = false;
        }, 2000);
    }


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

    startMoving(hadFirstContact) {
        if (hadFirstContact === true && !this.startAttackIntervalStarted) {
            this.startAttackIntervalStarted = true;
            setInterval(() => {
                this.startAttackInterval();
            }, 3000);
        }
    }

    startAttackInterval() {
        let randomAction = this.getRandomNumber();
        clearInterval(this.currentInterval);
        clearInterval(this.currentIntervalAnimation);
        if (this.isBossHit === false) {
            if (randomAction === 1) {
                /*move left*/
                this.currentInterval = setInterval(() => this.startMovingLeft(), 1000 / 60);
                this.currentIntervalAnimation = setInterval(() => this.animationWalk(), 200);
            } else if (randomAction === 2) {
                /*move right*/
                this.currentInterval = setInterval(() => this.startMovingRight(), 1000 / 60);
                this.currentIntervalAnimation = setInterval(() => this.animationWalk(), 200);
            } else if (randomAction === 3) {
                /*attack*/
                this.startAttack();
                this.currentInterval = setInterval(() => this.startAttack(), 1000 / 60);
                this.currentIntervalAnimation = setInterval(() => this.animationAttack(), 200);
            }
        } else {
            clearInterval(this.currentInterval);
            clearInterval(this.currentIntervalAnimation);
        }
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 3) + 1;
    }

    startMovingLeft() {
        this.moveLeft();
    }

    startAttack() {
        this.jump();
    }

    startMovingRight() {
        this.moveRight();
    }

    animationWalk() {
        this.playAnimation(this.IMAGES_BOSS_WALK);
    }

    animationAttack() {
        this.playAnimation(this.IMAGES_BOSS_ATTACK);
    }


}