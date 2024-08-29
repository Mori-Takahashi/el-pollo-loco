class World {
    character = new Character();

    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)){
                    console.log('Collision with Character', enemy);
                }
            });
        }, 200);
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

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
        if (moveObject.otherDirection) {
            this.flipImage(moveObject)
        }
        moveObject.draw(this.ctx);
        moveObject.drawFrame(this.ctx);


        if (moveObject.otherDirection) {
            this.flipImageBack(moveObject);
        }
    }

    flipImage(moveObject) {
        this.ctx.save();
        this.ctx.translate(moveObject.width, 0);
        this.ctx.scale(-1, 1);
        moveObject.x = moveObject.x * -1;
    }

    flipImageBack(moveObject) {
        moveObject.x = moveObject.x * -1;
        this.ctx.restore();
    }
}

/*    isColliding (obj) {
    return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
        (this.Y + this.offsetY + this.height) >= obj.Y &&
        (this.Y + this.offsetY) <= (obj.Y + obj.height) &&
        obj.onCollisionCourse;
}*/