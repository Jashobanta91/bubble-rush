let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let score = 0;
let level = 1;
let highScore = localStorage.getItem("bubbleHighScore") || 0;

document.getElementById("highScore").innerText = highScore;
document.getElementById("score").innerText = score;
document.getElementById("level").innerText = level;

function startGame(){
    document.getElementById("menu").style.display="none";
    document.getElementById("game").style.display="block";
    document.getElementById("bgMusic").play();

    initGame();
}

function restartGame(){
    score = 0;
    level = 1;

    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;

    initGame();
}

function initGame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    loadLevel();
    drawGame();
}

function drawGame(){
    ctx.fillStyle="#87CEEB";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawBubbles();
    drawShooter();
    requestAnimationFrame(drawGame);
}
// ===== Bubble System =====

const colors = ["red", "blue", "green", "yellow", "purple"];

let bubbles = [];

function createBubble(x, y, color) {
    return {
        x: x,
        y: y,
        radius: 20,
        color: color
    };
}

function loadLevel() {

    bubbles = [];

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 10; col++) {

            bubbles.push(
                createBubble(
                    40 + col * 40,
                    40 + row * 40,
                    colors[Math.floor(Math.random() * colors.length)]
                )
            );

        }

    }

}

function drawBubbles() {

    bubbles.forEach(bubble => {

        ctx.beginPath();
        ctx.arc(
            bubble.x,
            bubble.y,
            bubble.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = bubble.color;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        ctx.closePath();

    });

}
// ===== Shooter =====

let shooter = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    angle: -90
};

function drawShooter() {
    ctx.save();

    ctx.translate(shooter.x, shooter.y);
    ctx.rotate(shooter.angle * Math.PI / 180);

    ctx.fillStyle = "#333";
    ctx.fillRect(-6, -35, 12, 35);

    ctx.restore();

    ctx.beginPath();
    ctx.arc(shooter.x, shooter.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = "#666";
    ctx.fill();
}

canvas.addEventListener("mousemove", function(e) {
    let rect = canvas.getBoundingClientRect();

    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;

    shooter.angle = Math.atan2(my - shooter.y, mx - shooter.x) + Math.PI / 2;
});

let shooter = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    radius: 20,
    color: colors[Math.floor(Math.random() * colors.length)]
};

let currentBubble = null;

function drawShooter() {
    ctx.beginPath();
    ctx.arc(shooter.x, shooter.y, shooter.radius, 0, Math.PI * 2);
    ctx.fillStyle = shooter.color;
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

