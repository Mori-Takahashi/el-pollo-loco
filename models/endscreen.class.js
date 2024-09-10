class Endscreen extends DrawableObjects{
    IMAGES = [
        { src: 'img/9_intro_outro_screens/game_over/game over!.png', id: 'gameOverImage' },
        { src: 'img/9_intro_outro_screens/win/win_1.png', id: 'winImage' }
    ];

    constructor() {
        super().loadImage(this.IMAGES[0].src);
        this.loadImages(this.IMAGES.map(image => image.src));
        this.addImagesToDOM();
        this.hideImages();
    }

    addImagesToDOM() {
        this.IMAGES.forEach((image) => {
            const img = new Image();
            img.src = image.src;
            img.id = image.id;
            document.body.appendChild(img);
        });
    }

    hideImages() {
        this.IMAGES.forEach((image) => {
            const img = document.getElementById(image.id);
            if (img) {
                img.style.display = 'none';
            }
        });
    }

    setGameOver() {
        this.showImage(this.IMAGES[0].id);
    }

    setGameWon() {
        this.showImage(this.IMAGES[1].id);
    }

    showImage(id) {
        const img = document.getElementById(id);
        if (img) {
            img.style.display = 'unset';
        }
    }
}