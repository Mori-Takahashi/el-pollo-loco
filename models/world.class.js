class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    salsaBar = new SalsaBar();
    coinBar = new CoinBar();
    bossBar = new StatusbarBoss();
    endscreen = new Endscreen();
    throwableObjects = [];
    bottleInInventory = 0;
    CoinsInInventory = 0;
    endboss = level1.enemies[8];
    debug = true;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runDebug();
    }



    runDebug() {
        if (this.debug) {
            console.warn('Debug mode is on');
            setInterval(() => {
                //console.log('cooldown:', this.throwCooldown);
                //console.log('Character x:', this.character.x, 'y:', this.character.y);
                //console.log('Camera x:', this.camera_x);
                //console.log('Character energy:', this.character.energy);
                //console.log('Character salsa world:', this.bottleInInventory);
                //console.log('Character coins:', this.character.CoinsInInventory);
                //console.log('Boss energy:', this.endboss.energy);
                //console.log('endscreen:', this.endscreen);
                //console.log('audio on/off:', audio);
                //console.log('endboss energy:', this.character.energy_BOSS);
            }, 1000);
        }
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionJumpOnEnemy();
            this.checkBottleBreak();
            if (this.character.isDead() || this.character.isDead_BOSS()) {
                this.showEndGame();
            }
        }, 100);
    }

    /**
     * retrieves the x and y axes from the character
     */
checkThrowObjects() {
    if (this.keyboard.D) {
        if (this.bottleInInventory > 0 && !this.throwCooldown) {
            this.bottleInInventory--;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.salsaBar.setPercentage(this.bottleInInventory);
            this.throwCooldown = true;
            setTimeout(() => {
                this.throwCooldown = false;
            }, 1000);
        }
    }
}

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isChickenDead) {
                console.log('Character is colliding with enemy');
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });

        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)){
                this.CoinsInInventory += 10;
                this.character.colectingCoin();
                this.coinBar.setPercentage(this.character.CoinsInInventory);
                this.character.checkIsCollecting();
            }
        });

        this.level.salsa.forEach((salsa) => {
            if (this.character.isColliding(salsa)){
                this.bottleInInventory++;
                this.character.colectingSalsa();
                this.salsaBar.setPercentage(this.bottleInInventory);
                this.character.checkIsCollecting();
            }
        });

        this.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                this.character.reduceBossEnergy();
                this.bossBar.setPercentage(this.character.energy_BOSS);
                this.endboss.bossHurt();
                this.bossHit = true;
                this.resetBossHit();
                if (this.character.isDead_BOSS()) {
                    this.endboss.isBossDead = true;
                    setTimeout(() => {
                        this.level.enemies.splice(8, 1);
                    }, 2000);
                }
            }
        });
    }

    resetBossHit() {
        setTimeout(() => {
            this.bossHit = false;
        }, 2000);
    }
    bossHit = false;

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // --- Space for fixed objects --- //
        this.addToMap(this.statusBar);
        this.addToMap(this.salsaBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bossBar);
        if (this.character.isDead() || this.character.isDead_BOSS()) this.addToMap(this.endscreen);
        this.ctx.translate(this.camera_x, 0); // forwards for statusbar
        /*  find me */
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsa);
        this.addObjectsToMap(this.throwableObjects);




        this.ctx.translate(-this.camera_x, 0);

        /**
         * draw() is called again and again
         */
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
    
    addToMap(moveObject) {
        if (moveObject.otherDirection) {
            this.flipImage(moveObject)
        }
        moveObject.draw(this.ctx);


        if (moveObject.otherDirection) {
            this.flipImageBack(moveObject);
        }
    }

    flipImage(moveObject) {
        this.ctx.save();
        this.ctx.translate(moveObject.width, 0);
        this.ctx.scale(-1, 1);
        moveObject.x = moveObject.x * -1;
    }

    flipImageBack(moveObject) {
        moveObject.x = moveObject.x * -1;
        this.ctx.restore();
    }

    removeObjectFromCanvas(object) {
        if (!object) {
            console.error('removeObjectFromCanvas: object is undefined');
            return;
        }

        const coinIndex = this.level.coins.indexOf(object);
        if (coinIndex > -1) {
            this.level.coins.splice(coinIndex, 1);
            return;
        }

        const salsaIndex = this.level.salsa.indexOf(object);
        if (salsaIndex > -1) {
            this.level.salsa.splice(salsaIndex, 1);
            return;
        }

        console.error('removeObjectFromCanvas: object not found in coins or salsa arrays');
    }

    showEndGame() {
       if (this.character.isDead()) {
        this.endscreen.setGameOver();
       }
       if (this.character.isDead_BOSS()) {
        this.endscreen.setGameWon();
       }
       setTimeout(() => {
           restartGame();
       }, 5000);
    }

    checkCollisionJumpOnEnemy() {
        let enemyHit = false;
        this.level.enemies.forEach((enemy, index) => {
            if (!enemyHit && this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isChickenDead) {
                if (this.character.energy > 0) {

                    enemy.isChickenDead = true;
                    enemyHit = true;

                    this.character.jump();
                    this.character.energy += 5;

                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 500);
                }
            }
        });
    }


    checkBottleBreak() {
        this.throwableObjects = this.throwableObjects.filter((bottle) => {
            if (bottle.y > 350) {
                bottle.isSmashed = true;
                setTimeout(() => {
                    this.throwableObjects = this.throwableObjects.filter(b => b !== bottle);
                }, 500);
                return false;
            } else if (this.endboss.isColliding(bottle)) {
                this.character.reduceBossEnergy();
                this.bossBar.setPercentage(this.character.energy_BOSS);
                this.endboss.bossHurt();
                this.bossHit = true;
                this.resetBossHit();
                setTimeout(() => {
                    this.throwableObjects = this.throwableObjects.filter(b => b !== bottle);
                }, 500);
                if (this.character.isDead_BOSS()) {
                    this.endboss.isBossDead = true;
                    setTimeout(() => {
                        this.level.enemies.splice(8, 1);
                    }, 2000);
                }
                return false;
            }
            return true;
        });
    }
}
