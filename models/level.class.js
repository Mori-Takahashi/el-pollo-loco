class Level {
    enemies;
    coins;
    salsa;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies,coins ,salsa ,clouds, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.salsa = salsa;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}