const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define game states
const GameState = {
    START: "START",
    PLAYING: "PLAYING",
    GAME_OVER: "GAME_OVER"
};
let gameState = GameState.START;

// Play button click event
document.getElementById("playButton").addEventListener("click", () => {
    if (gameState === GameState.START || gameState === GameState.GAME_OVER) {
        startGame();
    }
});

// Function to start the game
function startGame() {
    gameState = GameState.PLAYING;
    document.getElementById("overlay").style.display = "none";
    // Additional initialization or setup code for starting the game
}

// Game loop
function gameLoop() {
    // Only update and render game elements if in playing state
    if (gameState === GameState.PLAYING) {
        // Update game logic
        // Render game elements
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

// Define canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Bird properties
let birdX = 50;
let birdY = canvas.height / 2;
const birdRadius = 20;
const gravity = 0.5;
let velocity = 0;

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update bird position
    velocity += gravity;
    birdY += velocity;

    // Draw bird
    ctx.beginPath();
    ctx.arc(birdX, birdY, birdRadius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();

    requestAnimationFrame(gameLoop);
}

gameLoop();
// Event listeners for user input
document.addEventListener("keydown", flap);
document.addEventListener("mousedown", flap);
document.addEventListener("touchstart", flap);

// Function to handle bird flap
function flap() {
    velocity = -10; // Adjust flap power as needed
}
// Pipe properties
const pipeWidth = 50;
const pipeGap = 200;
let pipeX = canvas.width;
let pipeY = 0;

// Draw pipes
function drawPipes() {
    ctx.fillStyle = "green";
    ctx.fillRect(pipeX, pipeY, pipeWidth, canvas.height);
    ctx.fillRect(pipeX, pipeY + pipeGap + birdRadius * 3, pipeWidth, canvas.height);
}

// Update pipe position
function updatePipes() {
    pipeX -= 2; // Adjust pipe speed as needed

    if (pipeX <= -pipeWidth) {
        pipeX = canvas.width;
        pipeY = Math.floor(Math.random() * (canvas.height - pipeGap - birdRadius * 6));
    }
}

// Game loop with pipes
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePipes();
    drawPipes();

    // Update bird position
    velocity += gravity;
    birdY += velocity;

    // Draw bird
    ctx.beginPath();
    ctx.arc(birdX, birdY, birdRadius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();

    requestAnimationFrame(gameLoop);
}

gameLoop();
// Collision detection
function checkCollisions() {
    if (
        birdY - birdRadius <= 0 || // Bird hits top
        birdY + birdRadius >= canvas.height || // Bird hits bottom
        (birdX + birdRadius >= pipeX && birdX - birdRadius <= pipeX + pipeWidth && (birdY - birdRadius <= pipeY + canvas.height || birdY + birdRadius >= pipeY + pipeGap + birdRadius * 3)) // Bird hits pipe
    ) {
        // Game over
        alert("Game Over!");
        location.reload(); // Restart the game
    }
}

// Game loop with collision detection
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePipes();
    drawPipes();

    // Update bird position
    velocity += gravity;
    birdY += velocity;

    // Draw bird
    ctx.beginPath();
    ctx.arc(birdX, birdY, birdRadius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();

    checkCollisions(); // Check for collisions

    requestAnimationFrame(gameLoop);
}

gameLoop();
