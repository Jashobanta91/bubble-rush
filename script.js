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

    drawGame();
}

function drawGame(){
    ctx.fillStyle="#87CEEB";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    requestAnimationFrame(drawGame);
}
