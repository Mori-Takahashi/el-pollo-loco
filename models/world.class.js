class World {
    /**
     * The character in the game.
     * @type {Character}
     */
    character = new Character();

    /**
     * The current level of the game.
     * @type {Level}
     */
    level = level1;

    /**
     * The canvas element for rendering the game.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The 2D rendering context for the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The keyboard input handler.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * The x-coordinate of the camera.
     * @type {number}
     */
    camera_x = 0;

    /**
     * The status bar for the character.
     * @type {StatusBar}
     */
    statusBar = new StatusBar();

    /**
     * The salsa bar for the character.
     * @type {SalsaBar}
     */
    salsaBar = new SalsaBar();

    /**
     * The coin bar for the character.
     * @type {CoinBar}
     */
    coinBar = new CoinBar();

    /**
     * The status bar for the boss.
     * @type {StatusbarBoss}
     */
    bossBar = new StatusbarBoss();

    /**
     * The end screen of the game.
     * @type {Endscreen}
     */
    endscreen = new Endscreen();

    /**
     * Array of throwable objects in the game.
     * @type {ThrowableObject[]}
     */
    throwableObjects = [];

    /**
     * Number of bottles in the character's inventory.
     * @type {number}
     */
    bottleInInventory = 0;

    /**
     * Number of coins in the character's inventory.
     * @type {number}
     */
    CoinsInInventory = 0;

    /**
     * The end boss of the current level.
     * @type {Enemy}
     */
    endboss = level1.enemies[8];

    /**
     * Flag indicating whether debug mode is enabled.
     * @type {boolean}
     */
    debug = false;

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runDebug();
    }

    /**
     * Runs the debug mode if enabled.
     */
    runDebug() {
        if (this.debug) {
            console.warn('Debug mode is on');
            setInterval(() => {
                // Debugging information can be logged here
            }, 1000);
        }
    }

    /**
     * Sets the world property of the character to this instance of World.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the main game loop, checking for collisions and other game events.
     */
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
     * Checks if the character is throwing objects and handles the throw logic.
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

    /**
     * Checks for collisions between the character and other objects in the game.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isChickenDead && !this.character.isAboveGround()) {
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

    /**
     * Resets the boss hit flag after a delay.
     */
    resetBossHit() {
        setTimeout(() => {
            this.bossHit = false;
        }, 2000);
    }

    /**
     * Flag indicating whether the boss has been hit.
     * @type {boolean}
     */
    bossHit = false;

    /**
     * Draws the game elements on the canvas.
     */
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

    /**
     * Adds an array of objects to the map.
     * @param {Object[]} objects - The objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map.
     * @param {Object} moveObject - The object to add to the map.
     */
    addToMap(moveObject) {
        if (moveObject.otherDirection) {
            this.flipImage(moveObject)
        }
        moveObject.draw(this.ctx);

        if (moveObject.otherDirection) {
            this.flipImageBack(moveObject);
        }
    }

    /**
     * Flips the image of an object horizontally.
     * @param {Object} moveObject - The object to flip.
     */
    flipImage(moveObject) {
        this.ctx.save();
        this.ctx.translate(moveObject.width, 0);
        this.ctx.scale(-1, 1);
        moveObject.x = moveObject.x * -1;
    }

    /**
     * Flips the image of an object back to its original orientation.
     * @param {Object} moveObject - The object to flip back.
     */
    flipImageBack(moveObject) {
        moveObject.x = moveObject.x * -1;
        this.ctx.restore();
    }

    /**
     * Removes an object from the canvas.
     * @param {Object} object - The object to remove.
     */
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

    /**
     * Shows the end game screen based on the character's status.
     */
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

    /**
     * Checks for collisions when the character jumps on an enemy.
     */
    checkCollisionJumpOnEnemy() {
        let enemyHit = false;
        this.level.enemies.forEach((enemy, index) => {
            if (!enemyHit && this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isChickenDead && this.character.speedY < 15) {
                if (this.character.energy > 0) {
                    enemy.isChickenDead = true;
                    enemyHit = true;
                    this.character.jump();
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 500);
                }
            }
        });
    }

    /**
     * Checks if a bottle has broken and handles the logic for removing broken bottles.
     */
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