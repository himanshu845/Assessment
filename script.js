const phrases = [
    "We design and develop applications",
    "that run the world and",
    "showcase the future"
];

let currentPhraseIndex = 0;
let score = 0;
let gameGrid = Array(20).fill().map(() => Array(10).fill(null));
let currentBlock = generateRandomBlock();

function generateRandomBlock() {
    const phrase = phrases[currentPhraseIndex];
    const words = phrase.split(" ");
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return randomWord;
}

function updateGameBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    gameGrid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const block = document.createElement("div");
            block.className = "game-cell";
            block.innerText = cell || "";
            gameBoard.appendChild(block);
        });
    });

    for (let i = 0; i < currentBlock.length; i++) {
        gameGrid[19][i + 3] = currentBlock[i];
    }
}

function clearCompletedPhrases() {
    const phrase = phrases[currentPhraseIndex];
    const completedBlocks = gameGrid[19].join(" ");
    
    if (phrase === completedBlocks) {
        score++;
        document.getElementById("score-value").innerText = score;
        currentPhraseIndex++;
        gameGrid = Array(20).fill().map(() => Array(10).fill(null));
        currentBlock = generateRandomBlock();
    }
}

function moveBlockDown() {
    for (let row = 18; row >= 0; row--) {
        for (let col = 0; col < 10; col++) {
            if (gameGrid[row][col] && !gameGrid[row + 1][col]) {
                gameGrid[row + 1][col] = gameGrid[row][col];
                gameGrid[row][col] = null;
            }
        }
    }
}

function startGame() {
    setInterval(() => {
        clearCompletedPhrases();
        moveBlockDown();
        updateGameBoard();
    }, 1000);

    setInterval(() => {
        moveBlockDown();
        updateGameBoard();
    }, 500);

    setInterval(() => {
        currentBlock = generateRandomBlock();
        updateGameBoard();
    }, 2000);
}

startGame();
