class World {
    character = new Character();
    
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0)
    ];
    
    canvas
    ctx;
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addToMap(this.character)
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.backgroundObjects);
        
        /**
         * draw() is called again and again
         */
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
    
    addToMap(moveObject) {
        this.ctx.drawImage(moveObject.img, moveObject.x, moveObject.y, moveObject.width, moveObject.height);
    }
}