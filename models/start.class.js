class Start extends DrawableObjects{
    START_IMG = [
        'img/9_intro_outro_screens/start/startscreen_1.png'
    ];

    constructor() {
        super().loadImage('img/9_intro_outro_screens/start/startscreen_1.png');
        this.init();
        this.startGame();
    }

    startGame() {
        setInterval(() => {
            if (this.character.energy <= 0) {
                this.init();
            }
        }, 50);
    }

}