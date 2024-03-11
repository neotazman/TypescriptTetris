///// Typescript tetris

const theBoard = document.createElement('table')
theBoard.id = 'gameBoard'

///// custom types. primarily for values and/or parameters
type CellValue = 0 | 1 | 2// CHANGE THIS WHEN TETROMINOS ARE CREATED this is just to show that the cells are either filled or empty
type BoardRect = number[][] // not a cell but a square of any number of cells
type Tetromino = [ // the rectangle that the game piece can take up
    [CellValue, CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue, CellValue],
]
type CellPosition = [number, number]

interface GameState { // so the gamestate doesn't get fucked up
    gameBoard: BoardRect, // this is the reason i made a BoardRect type instead of just Tetromino
    gameOver: boolean,
    level: number,
    score: number,
}

const StartingGameModel : GameState = {  // where the game state is stored
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
}

class GameModel {
    gameState: GameState;
    constructor(gamestate?: GameState) {
        this.gameState = gamestate || StartingGameModel
    }
    newGameBoard(x: number, y: number): void {
        theBoard.innerHTML = ''
        this.gameState.gameBoard = []
        for(let i = 0; i < y; i++) {
            let currentLine = []
            for(let j = 0; j < x; j++) {
                currentLine.push(0)
            }
            this.gameState.gameBoard.push(currentLine)
        }
        console.table(this.gameState.gameBoard)
    }
    buildGameBoard(): void {// rebuilds the game board with the current gamestate
        theBoard.innerHTML = '' // clear the board
        for(let row = 0; row < this.gameState.gameBoard.length; row++) { // makes the board match the game model
            let currentRow = this.gameState.gameBoard[row]
            let thisRow = document.createElement('tr')
            thisRow.className = `row ${row}`
            for(let col = 0; col < currentRow.length; col++) {
                let filled = ''
                if(currentRow[col] === (1 || 2)) { // adds the className filled when it's filled
                    filled+= ' filled'
                }
                let currentCell = document.createElement('td')
                currentCell.className = `cell ${col}${filled}` // if the cell is empty the "filled" value is an empty string
                thisRow.append(currentCell)
            }
            theBoard.append(thisRow)
        }
        document.body.append(theBoard)
    }
    levelInterval(): number {
        let interval = 2000
        for(let i = 0; i < this.gameState.level; i++) {
            interval = interval * 0.9
        }
        return interval
    }
}

function findStartingPosition(piece: Tetromino) : CellPosition {
    let result! : CellPosition
    for(let i = 0; i < piece.length; i++) { // decided to make the starting position on the first line for every tetronimo, but this loop should still work
        let currentRow = piece[i]
        let found = currentRow.findIndex((cell) => cell === 1)
        if(found === -1) continue
        else result = [i, found]
    }
    return result
}

// THE GAMEPIECES
class GamePiece {
    velocity: number
    startingPosition: CellPosition // [number, number]
    bluePrint: Tetromino
    constructor(square: Tetromino) {
        this.velocity = 1 
        this.bluePrint = square
        this.startingPosition = findStartingPosition(this.bluePrint)
    }
    draw() : void {
        
    }
}

// STRAIGHT LINE
class GamePiece1 extends GamePiece {
    constructor(){
        super(
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ]
        )
    }
}
//"L"
class GamePiece2 extends GamePiece {
    constructor(){
        super(
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ]
        )
    }
}
class GamePiece3 extends GamePiece {
    constructor(){
        super(
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ]
        )
    }
}
// "S"
class GamePiece4 extends GamePiece {
    constructor(){
        super(
            [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ]
        )
    }
}
//SQUARE
class GamePiece5 extends GamePiece {
    constructor(){
        super(
            [
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ]
        )
    }
}
class GamePiece6 extends GamePiece {
    constructor(){
        super(
            [
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
        )
    }
}


let GameBoard = new GameModel()

let runGame = setInterval(() => {
    if(GameBoard.gameState.gameOver) {
        clearInterval(runGame)
        console.log(GameBoard)
    } else {
        GameBoard.buildGameBoard()
        console.log(GameBoard.gameState.level)
        GameBoard.gameState.level++
        if(GameBoard.gameState.level >= 10) {
            GameBoard.gameState.gameOver = true
        }
    }
}, GameBoard.levelInterval())

GameBoard.buildGameBoard()