class movableObject {
    x = 120;
    y = 250;
    img;
    height= 150;
    width= 100;

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