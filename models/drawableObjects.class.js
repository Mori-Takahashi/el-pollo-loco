class DrawableObjects {
    x = 120;
    y = 280;
    height= 150;
    width= 100;
    img;
    imageCache = {};
    currentImage = 0;


    /**
     * Load images
     * @param path - path of the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * creates the "hit box"
     * @param ctx - context
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
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
}