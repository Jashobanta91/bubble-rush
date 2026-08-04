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
