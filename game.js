"use strict";
///// Typescript tetris
const theBoard = document.createElement('table');
theBoard.id = 'gameBoard';
const StartingGameModel = {
    gameBoard: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    gameOver: false,
    level: 1,
    score: 0,
};
class GameModel {
    constructor(gamestate) {
        this.gameState = gamestate || StartingGameModel;
    }
    newGameBoard(x, y) {
        theBoard.innerHTML = '';
        this.gameState.gameBoard = [];
        for (let i = 0; i < y; i++) {
            let currentLine = [];
            for (let j = 0; j < x; j++) {
                currentLine.push(0);
            }
            this.gameState.gameBoard.push(currentLine);
        }
        console.table(this.gameState.gameBoard);
    }
    buildGameBoard() {
        theBoard.innerHTML = ''; // clear the board
        for (let row = 0; row < this.gameState.gameBoard.length; row++) { // makes the board match the game model
            let currentRow = this.gameState.gameBoard[row];
            let thisRow = document.createElement('tr');
            thisRow.className = `row ${row}`;
            for (let col = 0; col < currentRow.length; col++) {
                let filled = '';
                if (currentRow[col] === (1 || 2)) { // adds the className filled when it's filled
                    filled += ' filled';
                }
                let currentCell = document.createElement('td');
                currentCell.className = `cell ${col}${filled}`; // if the cell is empty the "filled" value is an empty string
                thisRow.append(currentCell);
            }
            theBoard.append(thisRow);
        }
        document.body.append(theBoard);
    }
    levelInterval() {
        let interval = 2000;
        for (let i = 0; i < this.gameState.level; i++) {
            interval = interval * 0.9;
        }
        return interval;
    }
}
function findStartingPosition(piece) {
    let result;
    for (let i = 0; i < piece.length; i++) { // decided to make the starting position on the first line for every tetronimo, but this loop should still work
        let currentRow = piece[i];
        let found = currentRow.findIndex((cell) => cell === 1);
        if (found === -1)
            continue;
        else
            result = [i, found];
    }
    return result;
}
// THE GAMEPIECES
class GamePiece {
    constructor(square) {
        this.velocity = 1;
        this.bluePrint = square;
        this.startingPosition = findStartingPosition(this.bluePrint);
    }
    draw() {
    }
}
// STRAIGHT LINE
class GamePiece1 extends GamePiece {
    constructor() {
        super([
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ]);
    }
}
//"L"
class GamePiece2 extends GamePiece {
    constructor() {
        super([
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ]);
    }
}
class GamePiece3 extends GamePiece {
    constructor() {
        super([
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ]);
    }
}
// "S"
class GamePiece4 extends GamePiece {
    constructor() {
        super([
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
        ]);
    }
}
//SQUARE
class GamePiece5 extends GamePiece {
    constructor() {
        super([
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ]);
    }
}
class GamePiece6 extends GamePiece {
    constructor() {
        super([
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]);
    }
}
let GameBoard = new GameModel();
let runGame = setInterval(() => {
    if (GameBoard.gameState.gameOver) {
        clearInterval(runGame);
        console.log(GameBoard);
    }
    else {
        GameBoard.buildGameBoard();
        console.log(GameBoard.gameState.level);
        GameBoard.gameState.level++;
        if (GameBoard.gameState.level >= 10) {
            GameBoard.gameState.gameOver = true;
        }
    }
}, GameBoard.levelInterval());
GameBoard.buildGameBoard();
