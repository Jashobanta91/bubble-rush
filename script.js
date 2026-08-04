const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let level = 1;

const shooter = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    radius: 18,
    color: "#3498db"
};

function updateUI() {
    scoreEl.textContent = score;
    levelEl.textContent = level;
}

function drawBackground() {
    ctx.fillStyle = "#101820";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawShooter() {
    ctx.beginPath();
    ctx.arc(shooter.x, shooter.y, shooter.radius, 0, Math.PI * 2);
    ctx.fillStyle = shooter.color;
    ctx.fill();
    ctx.closePath();
}

function gameLoop() {
    drawBackground();
    updateBubble();
    drawBubble(currentBubble);
    drawShooter();
    requestAnimationFrame(gameLoop);
}

restartBtn.addEventListener("click", () => {
    score = 0;
    level = 1;
    updateUI();
});

updateUI();
gameLoop();
const colors = [
    "#ff3b30",
    "#34c759",
    "#007aff",
    "#ffcc00",
    "#af52de",
    "#ff9500"
];

let currentBubble = createBubble();

function createBubble() {
    return {
        x: shooter.x,
        y: shooter.y,
        radius: 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: 0,
        dy: 0,
        moving: false
    };
}

function drawBubble(bubble) {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color;
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}
function updateBubble() {
    if (!currentBubble.moving) return;

    currentBubble.x += currentBubble.dx;
    currentBubble.y += currentBubble.dy;

    // Left & Right Wall Bounce
    if (
        currentBubble.x <= currentBubble.radius ||
        currentBubble.x >= canvas.width - currentBubble.radius
    ) {
        currentBubble.dx *= -1;
    }

    // Top Hit
    if (currentBubble.y <= currentBubble.radius) {
        currentBubble = createBubble();
    }
}
canvas.addEventListener("click", (e) => {
    if (currentBubble.moving) return;

    const rect = canvas.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const angle = Math.atan2(
        mouseY - shooter.y,
        mouseX - shooter.x
    );

    const speed = 8;

    currentBubble.dx = Math.cos(angle) * speed;
    currentBubble.dy = Math.sin(angle) * speed;
    currentBubble.moving = true;
});
