class movableObject {
    x = 120;
    y = 280;
    img;
    height= 150;
    width= 100;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     *
     * @param {Array} arr - Array where img will be loaded ['img/img1.png', img/img2.png, ...]
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    movingRight() {
        console.log('movingRight');
    }

    moveLeft() {
        console.log('moveLeft');
    }
}