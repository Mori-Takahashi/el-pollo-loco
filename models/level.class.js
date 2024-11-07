/**
 * Class representing a level in the game.
 */
class Level {
    /** @type {Array} Array of enemy objects in the level. */
    enemies;

    /** @type {Array} Array of coin objects in the level. */
    coins;

    /** @type {Array} Array of salsa objects in the level. */
    salsa;

    /** @type {Array} Array of cloud objects in the level. */
    clouds;

    /** @type {Array} Array of background objects in the level. */
    backgroundObjects;

    /** @type {number} The x-coordinate where the level ends. */
    level_end_x = 2200;

    /**
     * Create a level.
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} coins - The coins in the level.
     * @param {Array} salsa - The salsa objects in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     */
    constructor(enemies, coins, salsa, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.salsa = salsa;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}