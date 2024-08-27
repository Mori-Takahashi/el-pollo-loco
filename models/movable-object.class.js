class movableObject {
    x = 120;
    y = 400;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
    movingRight() {
        console.log('movingRight');
    }

    moveLeft() {
        console.log('moveLeft');
    }
}