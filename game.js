const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    speed: 5,
    dx: 0,
    dy: 0
};

let item = {
    x: Math.random() * (canvas.width - 20),
    y: Math.random() * (canvas.height - 20),
    size: 20
};

let score = 0;

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawItem() {
    ctx.fillStyle = 'red';
    ctx.fillRect(item.x, item.y, item.size, item.size);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newItem() {
    item.x = Math.random() * (canvas.width - 20);
    item.y = Math.random() * (canvas.height - 20);
}

function update() {
    clear();
    drawPlayer();
    drawItem();

    player.x += player.dx;
    player.y += player.dy;

    if (player.x < 0) player.x = 0;
    if (player.x + player.size > canvas.width) player.x = canvas.width - player.size;
    if (player.y < 0) player.y = 0;
    if (player.y + player.size > canvas.height) player.y = canvas.height - player.size;

    if (player.x < item.x + item.size &&
        player.x + player.size > item.x &&
        player.y < item.y + item.size &&
        player.y + player.size > item.y) {
        score++;
        newItem();
        console.log('Score: ', score);
    }

    requestAnimationFrame(update);
}

function moveRight() { player.dx = player.speed; }
function moveLeft() { player.dx = -player.speed; }
function moveUp() { player.dy = -player.speed; }
function moveDown() { player.dy = player.speed; }

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        moveLeft();
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        moveUp();
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        moveDown();
    }
}

function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right' ||
        e.key === 'ArrowLeft' || e.key === 'Left' ||
        e.key === 'ArrowUp' || e.key === 'Up' ||
        e.key === 'ArrowDown' || e.key === 'Down') {
        player.dx = 0;
        player.dy = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();
