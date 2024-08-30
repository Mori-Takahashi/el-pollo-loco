class World_spawner {

    static createLevelBottles() {
        return [
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
        ];
    }

    static createLevelCoins() {
        return [new Coins(), new Coins(), new Coins(), new Coins(), new Coins()];
    }

}