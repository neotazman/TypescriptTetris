"use strict";
///// Typescript tetris
const theBoard = document.createElement('table');
theBoard.id = 'gameBoard';
function isOnBoard(board, piece) {
    let cellPositions = piece ? piece.cells : null;
    return (board.currentXPos >= 0 && board.currentXPos <= board.gameBoard[0].length - 5 && board.currentYPos >= 0 && board.currentYPos <= board.gameBoard.length - 5);
}
//IT TOOK A WHILE FOR ME TO REALIZE, BUT I NEED THIS FOR THE GAME TO WORK
class GameModel {
    constructor() {
        this.gameBoard = [
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
        ];
        this.gameOver = false;
        this.level = 1;
        this.score = 0;
        this.xCells = this.gameBoard[0].length;
        this.gamePieceDroppingPosition = Math.floor(this.xCells / 2);
        this.currentXPos = this.gamePieceDroppingPosition;
        this.movingPiece = false;
        // this.currentPiece if the property is optional i shouldn't instantiate it until the update function is called
        this.yCells = this.gameBoard.length;
        this.currentYPos = 0;
        this.interval = 1000;
    }
    newGameBoard(x, y) {
        theBoard.innerHTML = '';
        this.gameBoard = [];
        for (let i = 0; i < y; i++) {
            let currentLine = [];
            for (let j = 0; j < x; j++) {
                currentLine.push(0);
            }
            this.gameBoard.push(currentLine);
        }
    }
    buildGameBoard() {
        theBoard.innerHTML = ''; // clear the board
        for (let row = 0; row < this.gameBoard.length; row++) { // makes the board match the game model
            let currentRow = this.gameBoard[row];
            let thisRow = document.createElement('tr');
            thisRow.className = `row ${row}`;
            for (let col = 0; col < currentRow.length; col++) {
                let falling = '';
                let fallen = '';
                if (currentRow[col] === 1) { // adds the className falling when it's falling
                    falling += ' filled';
                }
                else if (currentRow[col] === 2) { // adds the className falling when it's falling'}
                    fallen += ' fallen';
                }
                let currentCell = document.createElement('td');
                currentCell.className = `cell ${col}${falling}${fallen}`; // if the cell is empty the "filled" value is an empty string
                thisRow.append(currentCell);
            }
            theBoard.append(thisRow);
        }
        document.body.append(theBoard);
    }
    levelInterval() {
        this.interval = this.interval * 0.9 ^ this.level;
        // console.log(this.interval)
    }
    randomGamePiece() {
        let random = Math.ceil(Math.random() * 7);
        if (random === 1) {
            return new GamePiece1(this);
        }
        if (random === 2) {
            return new GamePiece2(this);
        }
        if (random === 3) {
            return new GamePiece3(this);
        }
        if (random === 4) {
            return new GamePiece4(this);
        }
        if (random === 5) {
            return new GamePiece5(this);
        }
        if (random === 6) {
            return new GamePiece6(this);
        }
        else {
            return new GamePiece7(this);
        }
    }
    addGamePiece(gamepiece) {
        this.currentPiece = gamepiece;
        this.movingPiece = true;
        this.currentPiece.draw();
    }
    update() {
        if (!this.currentPiece) {
            this.addGamePiece(this.randomGamePiece());
            this.update(); // is this working?
        }
        else {
            this.newGameBoard(this.xCells, this.yCells);
            if (GameBoard.currentPiece) {
                window.addEventListener("keydown", this.currentPiece.control);
            }
            this.currentPiece.draw();
            this.levelInterval();
            // this.currentPiece!.currentPosition[0]++ // i want to call update on the keydown event listener and i don't want the piece to fall when i do that
        }
        this.buildGameBoard();
    }
}
const StartingGameModel = new GameModel();
// THE GAMEPIECES
class GamePiece {
    constructor(piece, gamestate) {
        this.fullGamePiece = piece;
        this.gameState = gamestate || StartingGameModel;
        this.velocity = this.gameState.level;
        this.rotation = 1;
        this.bluePrint = this.fullGamePiece[this.rotation];
        this.cells = this.findCellPositions(this.bluePrint);
        this.currentPosition = {
            x: this.gameState.currentXPos,
            y: this.gameState.currentYPos,
        };
        this.isFalling = this.gameState.movingPiece;
    }
    findCellPositions(piece) {
        let fourCells = [];
        for (let i = 0; i < piece.length; i++) { // decided to make the starting position on the first line for every tetronimo, but this loop should still work
            let currentRow = piece[i];
            let foundArr = currentRow.map(x => x === 1);
            for (let j = 0; j < foundArr.length; j++) {
                if (currentRow[j]) {
                    fourCells.push([i, j]);
                }
            }
        }
        return fourCells;
    }
    draw(x, y) {
        if (this.gameState.currentPiece === this) {
            this.currentPosition = {
                x: this.gameState.currentXPos,
                y: this.gameState.currentYPos,
            };
            for (let cell of this.cells) {
                let dy = cell[0];
                let dx = cell[1];
                let exactY = this.currentPosition.y + dy;
                let exactX = this.currentPosition.x + dx;
                if (this.gameState.gameBoard[exactY][exactX] !== 2) {
                    this.gameState.gameBoard[exactY][exactX] = 1;
                }
            }
        }
    }
    control(event) {
        if (event.key === "w" || event.key === "s" || event.key === "a" || event.key === "d") {
            // console.log(event)
            // ROTATE
            if (event.key === "w") { // "W" counter-clockwise increase rotation
                if (this.rotation === 4) {
                    this.rotation = 1;
                }
                else {
                    this.rotation++;
                }
                console.log(this);
            }
            else if (event.key === "s") { // "S" clockwise decrease rotation
                if (this.rotation === 1) {
                    this.rotation = 4;
                }
                else {
                    this.rotation--;
                }
                console.log(this);
            }
            else 
            // MOVE
            if (event.key === "a") { // "A" move left
                //this.currentPosition.x--
                console.log(this.document.all.gameBoard);
            }
            else if (event.key === "d") { // "D" move right
                //this.currentPosition.x++
                console.log(this);
            }
            this.gameState.currentXPos = this.currentPosition.x;
            this.bluePrint = this.fullGamePiece[this.rotation];
            this.draw();
            return;
        }
    }
    thisControl() {
        return this.control.bind(this);
    }
}
// TETRIS SHAPES -- takes one argument "gamestate", the rest of the subclass is the argument for the superclass
// STRAIGHT LINE
class GamePiece1 extends GamePiece {
    constructor(gamestate) {
        super({
            1: [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            2: [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            3: [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            4: [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        }, gamestate);
    }
}
//"L"
class GamePiece2 extends GamePiece {
    constructor(gamestate) {
        super({
            1: [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            2: [
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            3: [
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ],
            4: [
                [1, 1, 1, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        }, gamestate);
    }
}
class GamePiece3 extends GamePiece {
    constructor(gamestate) {
        super({
            1: [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            2: [
                [1, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            3: [
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            4: [
                [1, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        }, gamestate);
    }
}
// "S"
class GamePiece4 extends GamePiece {
    constructor(gamestate) {
        super({
            1: [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ],
            2: [
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            3: [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ],
            4: [
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        }, gamestate);
    }
}
class GamePiece5 extends GamePiece {
    constructor(gamestate) {
        super({
            1: [
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            2: [
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            3: [
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            4: [
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        }, gamestate);
    }
}
//SQUARE
class GamePiece6 extends GamePiece {
    constructor(gamestate) {
        super({
            1: [
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            2: [
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            3: [
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            4: [
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        }, gamestate);
    }
}
//"T"
class GamePiece7 extends GamePiece {
    constructor(gamestate) {
        super({
            1: [
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            2: [
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            3: [
                [1, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            4: [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
        }, gamestate);
    }
}
let GameBoard = new GameModel(); // even though i create a new game model in DOMLoaded i need GameBoard to be a global variable so other functions can read it
window.addEventListener('DOMLoaded', () => {
    GameBoard = new GameModel();
    GameBoard.update();
    console.log(GameBoard.currentPiece);
    if (GameBoard.currentPiece) {
        window.addEventListener("keydown", GameBoard.currentPiece.control.bind(GameBoard.currentPiece));
    }
});
GameBoard.update();
let runGame = setInterval(() => {
    if (GameBoard.gameOver) {
        clearInterval(runGame);
        console.log(GameBoard);
    }
    else {
        GameBoard.update();
        if (GameBoard.movingPiece) {
            GameBoard.currentYPos++;
        }
        GameBoard.level++;
        if (GameBoard.level >= GameBoard.yCells - 2) {
            GameBoard.gameOver = true;
        }
    }
}, GameBoard.interval);
// GameBoard.update()
