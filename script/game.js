let canvas;
let world;
let keyboard = new Keyboard();
let startScreenImage = new Image();
startScreenImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png';

/*TODO edit init function */
function initStartScreen() {
    canvas = document.getElementById('canvasField');
    ctx = canvas.getContext('2d');
    drawStartScreen();
}

function drawStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(startScreenImage, 0, 0, canvas.width, canvas.height);
    drawStartButton();
}

function drawStartButton() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(canvas.width / 2 - 75, 50, 150, 50);
    ctx.fillStyle = '#FFDA07';
    ctx.font = '20px Mexicana-Regular';
    ctx.fillText('Start Game ▶️', canvas.width / 2 - 70, 85);
    canvas.addEventListener('click', onCanvasClick);
}

function onCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (canvas.width / 2 - 75 <= x && x <= canvas.width / 2 + 75 && 50 <= y && y <= 100) {
        initStart();
    }
}

function initStart() {
    canvas.removeEventListener('click', onCanvasClick);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initLevel();
    init();
}

function init() {
    canvas = document.getElementById('canvasField');
    world = new World(canvas, keyboard);
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})

document.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})