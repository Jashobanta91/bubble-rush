const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;

scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let level = 1;
let aimAngle = 0;
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
    ctx.fillStyle = currentBubble.color
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
}


function drawAimLine() {

    const length = 120;

    ctx.beginPath();
    ctx.moveTo(shooter.x, shooter.y);

    ctx.lineTo(
        shooter.x + Math.cos(aimAngle) * length,
        shooter.y + Math.sin(aimAngle) * length
    );

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
}
function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    gameLoop();
}

function restartGame() {
    location.reload();
}

function gameLoop() {
    drawBackground();
    drawGrid();
    updateBubble();
    drawBubble(currentBubble);
    drawShooter();
    drawNextBubble();
    requestAnimationFrame(gameLoop);
}

restartBtn.addEventListener("click", () => {
    score = 0;
    level = 1;
    createGrid();
    currentBubble = createBubble();
    updateUI();
});

const colors = [
    "#ff3b30",
    "#34c759",
    "#007aff",
    "#ffcc00",
    "#af52de",
    "#ff9500"
];
const ROWS = 6;
const COLS = 8;
const SIZE = 32;

const bubbleGrid = [];
    
let currentBubble = createBubble();
let nextBubble = createBubble();

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
    function createGrid() {

    bubbleGrid.length = 0;

    for (let row = 0; row < ROWS; row++) {

        bubbleGrid[row] = [];

        for (let col = 0; col < COLS; col++) {

            bubbleGrid[row][col] = {
                x: col * SIZE + SIZE / 2,
                y: row * SIZE + SIZE / 2,
                radius: 16,
                color: colors[Math.floor(Math.random() * colors.length)]
            };
        }
    }
}

function drawGrid() {

    for (let row = 0; row < ROWS; row++) {

        for (let col = 0; col < COLS; col++) {

            const bubble = bubbleGrid[row][col];

            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            ctx.fillStyle = bubble.color;
            ctx.fill();
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();
        }
    }
}


function checkCollision() {

    for (let row = 0; row < ROWS; row++) {

     for (let col = 0; col < COLS; col++) {

            const bubble = bubbleGrid[row][col];
            if (!bubble) continue;

            const distance = Math.hypot(
                currentBubble.x - bubble.x,
                currentBubble.y - bubble.y
            );

            if (distance < currentBubble.radius + bubble.radius) {

                currentBubble.moving = false;

                bubbleGrid[row][col] = {
                    x: col * SIZE + SIZE / 2,
                    y: row * SIZE + SIZE / 2,
                    radius: 16,
                    color: currentBubble.color
                };

     checkMatch(row, col) ;
     currentBubble = createBubble();
     return;
    }
         
    function checkMatch(row, col) {
    let color = bubbleGrid[row][col].color;
    let matched = [];

    function findBubble(r, c) {
        ...
    }

    ...
}
    let color = bubbleGrid[row][col].color;
    let matched = [];

    function findBubble(r, c) {

        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;

        let bubble = bubbleGrid[r][c];
        if (!bubble) return;
        if (bubble.color !== color) return;

        if (matched.includes(bubble)) return;

        matched.push(bubble);

        findBubble(r + 1, c);
        findBubble(r - 1, c);
        findBubble(r, c + 1);
        findBubble(r, c - 1);
    }

    findBubble(row, col);

    if (matched.length >= 3) {
        
        matched.forEach(bubble => {
            bubbleGrid[bubble.row][bubble.col] = null;
        });
         score += matched.length * 10;
        drawScore();
        dropFloatingBubbles();
    }
     }

        
    }
                
                currentBubble = createBubble();

                return;
            }
        }
    }
}




function updateBubble() {
    if (!currentBubble.moving) return;

    currentBubble.x += currentBubble.dx;
    currentBubble.y += currentBubble.dy;
    
    checkCollision();

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
canvas.addEventListener("mousemove", (e) => {

    const rect = canvas.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    aimAngle = Math.atan2(
        mouseY - shooter.y,
        mouseX - shooter.x
        );

        });
        canvas.addEventListener("touchmove", (e) => {

    const rect = canvas.getBoundingClientRect();

    const touch = e.touches[0];

    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    aimAngle = Math.atan2(
        touchY - shooter.y,
        touchX - shooter.x  
    );

    });
canvas.addEventListener("click", (e)               
=> {
    if (currentBubble.moving) return;
    
    const speed = 8;

    currentBubble.dx = Math.cos(aimAngle) * speed;
    currentBubble.dy = Math.sin(aimAngle) * speed;
    
    currentBubble.moving = true;
    
    });


function dropFloatingBubbles() {

    for (let c = 0; c < COLS; c++) {

        for (let r = ROWS - 1; r > 0; r--) {

            if (bubbleGrid[r][c] === null) {

                for (let above = r - 1; above >= 0; above--) {

                    if (bubbleGrid[above][c]) {

                        bubbleGrid[r][c] = bubbleGrid[above][c];
                        bubbleGrid[above][c] = null;

                        break;
                    }
                }
            }
        }
    }

    draw();
}
// line 332 tak tumhara purana code


function placeBubble(row, col) {

    bubbleGrid[row][col] = currentBubble;

    currentBubble.row = row;
    currentBubble.col = col;

    checkMatch(row, col);

    currentBubble = createBubble();
}

    updateUI();
    createGrid();
    gameLoop();
