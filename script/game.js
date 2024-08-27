let canvas;
let world;

function init() {
    canvas = document.getElementById('canvasField');
    world = new World(canvas);



    console.log('My Character is', world.character);
    console.log('My enemies', world.enemies);
}