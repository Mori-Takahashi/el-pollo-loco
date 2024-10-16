let canvas;
let world;
let keyboard = new Keyboard();
let startScreenImage = new Image();
startScreenImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
let audio = true;
let backgroundMusic = new Audio('audio/bg_music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;
let inDevelopment = true;

function startBackgroundMusic() {
        if (audio) backgroundMusic.play();
}

function setVolume(volume) {
    backgroundMusic.volume = volume;
}

function stopBackgroundMusic() {
    backgroundMusic.pause();
}

function initStartScreen() {
    canvas = document.getElementById('canvasField');
    ctx = canvas.getContext('2d');
    drawStartScreen();
}

function checkDevelopment() {
    if (inDevelopment) {
        alert('Info: This game is still in development and may not work properly');
    }
}

function checkBrowser() {
    const userAgent = navigator.userAgent;
    const lastUpdated = document.lastModified;

    console.log(`Last updated: ${lastUpdated}`);
    console.log(`Browser: ${userAgent}`);

    if (userAgent.includes('OPR') || userAgent.includes('Opera')) {
        alert('Info: An opera browser has been detected that may cause the game to not work properly');
    }
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

function drawRestartButton() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(canvas.width / 2 - 75, 50, 150, 50);
    ctx.fillStyle = '#FFDA07';
    ctx.font = '20px Mexicana-Regular';
    ctx.fillText('Restart Game 🔄', canvas.width / 2 - 70, 85);
    canvas.addEventListener('click', onCanvasClick);
}

function onCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (canvas.width / 2 - 75 <= x && x <= canvas.width / 2 + 75 && 50 <= y && y <= 100) {
        initStart();
        startBackgroundMusic();
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

function bindBitsPressEvent() {
    function addTouchEventListener(buttonId, key) {
        document.getElementById(buttonId).addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard[key] = true;
        });

        document.getElementById(buttonId).addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard[key] = false;
        });
    }

    addTouchEventListener('btnLeft', 'LEFT');
    addTouchEventListener('btnRight', 'RIGHT');
    addTouchEventListener('btnJump', 'SPACE');
    addTouchEventListener('btnThrow', 'D');
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

function showHelp() {
    let helpWindow = document.getElementById('alertWindow');
    helpWindow.classList.remove('d-none');
    helpWindow.classList.add('d-flex');
}

function closeHelpWindow() {
    let helpWindow = document.getElementById('alertWindow');
    helpWindow.classList.remove('d-flex');
    helpWindow.classList.add('d-none');
}

function changeAudio() {
    let audioButton = document.getElementById('audioButton');
    let audioButtonMobile = document.getElementById('audioButtonMobile');
    if (audio) {
        audio = false;
        backgroundMusic.loop = false;
        stopBackgroundMusic();
        audioButton.src = 'img/controll-icons/audio_off.svg';
        audioButtonMobile.src = 'img/controll-icons/audio_off.svg';
    } else {
        audio = true;
        backgroundMusic.loop = true;
        startBackgroundMusic();
        audioButton.src = 'img/controll-icons/audio_on.svg';
        audioButtonMobile.src = 'img/controll-icons/audio_on.svg';
    }
}

function restartGame() {
    location.reload();
}