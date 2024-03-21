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
interface AllRotations {// instead of making functions to rotate the gamepieces, I've decided to put all possible rotations into the class for each gamepiece
    1: Tetromino,
    2: Tetromino,
    3: Tetromino,
    4: Tetromino,
}
type CellPosition = [number, number]

type CurrentPiece = GamePiece | false
interface GameState { // so the gamestate doesn't get fucked up
    gameBoard: BoardRect, // this is the reason i made a BoardRect type instead of just Tetromino
    gameOver: boolean,
    level: number,
    score: number,
    gamePieceDroppingPosition: number
    movingPiece: boolean
    currentPiece?: GamePiece
    currentXPos: number
    stages: number
    currentYPos: number
}


//IT TOOK A WHILE FOR ME TO REALIZE, BUT I NEED THIS FOR THE GAME TO WORK
class GameModel {
    gameBoard: BoardRect
    gameOver: boolean 
    level: number
    score: number
    gamePieceDroppingPosition: number
    movingPiece: boolean
    currentPiece?: GamePiece
    currentXPos: number
    stages: number
    currentYPos: number
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
        ]
        this.gameOver = false
        this.level = 1
        this.score = 0
        this.gamePieceDroppingPosition = Math.floor(this.gameBoard[0].length / 2)
        this.currentXPos = this.gamePieceDroppingPosition
        this.movingPiece = false
        // this.currentPiece if the property is optional i shouldn't instantiate it until the update function is called
        this.stages = this.gameBoard.length
        this.currentYPos = 0
    }
    newGameBoard(x: number, y: number): void {
        theBoard.innerHTML = ''
        this.gameBoard = []
        for(let i = 0; i < y; i++) {
            let currentLine = []
            for(let j = 0; j < x; j++) {
                currentLine.push(0)
            }
            this.gameBoard.push(currentLine)
        }
        console.table(this.gameBoard)
    }
    buildGameBoard(): void {// rebuilds the game board with the current gamestate
        theBoard.innerHTML = '' // clear the board
        for(let row = 0; row < this.gameBoard.length; row++) { // makes the board match the game model
            let currentRow = this.gameBoard[row]
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
        interval * 0.9 ^ this.level
        return interval
    }
    randomGamePiece(): GamePiece { // this function will always return a random GamePiece, but since all the return statements are inside if statements, typescript thinks it could return nothing
        let random: number = Math.ceil(Math.random() * 7)
        if(random === 1) {
            return new GamePiece1(this)
        }
        if(random === 2) {
            return new GamePiece2(this)
        }
        if(random === 3) {
            return new GamePiece3(this)
        }
        if(random === 4) {
            return new GamePiece4(this)
        }
        if(random === 5) {
            return new GamePiece5(this)
        }
        if(random === 6) {
            return new GamePiece6(this)
        }
        else {
            return new GamePiece7(this)
        }
    }
    addGamePiece(gamepiece: GamePiece): void {
        this.currentPiece = gamepiece
        for(let row of this.gameBoard) {
            row[this.gamePieceDroppingPosition] = 1
        }
        this.movingPiece = true
    }
    update(): void {
        if(!this.movingPiece) {
            this.addGamePiece(this.randomGamePiece())
            this.movingPiece = true
            console.log(this.currentPiece)
        } else {
            // this.currentPiece!.currentPosition[0]++ // i want to call update on the keydown event listener and i don't want the piece to fall when i do that
        }
        this.buildGameBoard()
    }
}

const StartingGameModel : GameState = new GameModel()



// THE GAMEPIECES
class GamePiece {
    gameState: GameState //| undefined
    velocity: number
    cells: CellPosition[] // [number, number]
    currentPosition: {x: number, y: number}
    bluePrint: Tetromino
    rotation: 1 | 2 | 3 | 4 
    isFalling: boolean
    constructor(piece: AllRotations, gamestate: GameState) {
        this.gameState = gamestate || StartingGameModel
        this.velocity = 1 
        this.rotation = 1
        this.bluePrint = piece[this.rotation]
        this.cells = this.findCellPositions(this.bluePrint)
        this.currentPosition = {
            x: this.gameState.currentXPos,
            y: this.gameState.currentYPos,
        };
        this.isFalling = this.gameState.movingPiece
    }
    control(event: any): void {
        if(event.key !== "W" || "S" || "A" || "D"){
            // ROTATE
            if(event.key === "W") { // "W" counter-clockwise increase rotation
                if(this.rotation === 4) {
                    this.rotation = 1
                } else {
                    this.rotation++
                }
                console.log(this.rotation)
            } else 
            if(event.key === "S") { // "S" clockwise decrease rotation
                if(this.rotation === 1) {
                    this.rotation = 4
                } else {
                    this.rotation--
                }
                console.log(this.rotation)
            } else 
            // MOVE
            if(event.key === "A") { // "A" move left
                this.currentPosition.x--
                console.log(this.currentPosition)
            } else 
            if(event.key === "D") { // "D" move right
                this.currentPosition.x++
                console.log(this.currentPosition)
            } else return
        }
    }
    findCellPositions(piece: Tetromino) : CellPosition[] {
        let fourCells: CellPosition[] = []
        let result! : CellPosition
        let allIndices: number[] = []
        for(let i = 0; i < piece.length; i++) { // decided to make the starting position on the first line for every tetronimo, but this loop should still work

            let currentRow = piece[i]
            let foundArr = currentRow.map(x => x === 1)
            for(let j = 0; j < foundArr.length; j++) { 
                if(currentRow[j]) {
                    fourCells.push([i, j])
                }
            }
        }
        return fourCells
    }
    draw(x?: number, y?: number) : void {
        if (this.isFalling && this.gameState.currentPiece === this) {
            for (let cell of this.cells) {
                let dy = cell[0]
                let dx = cell[1]
                if(this.gameState.gameBoard[this.currentPosition.x + dx, this.currentPosition.y + dy]) {

                }
            }
        }
    }
}

// TETRIS SHAPES -- takes one argument "gamestate", the rest of the subclass is the argument for the superclass
// STRAIGHT LINE
class GamePiece1 extends GamePiece {
    constructor(gamestate: GameState){
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
        }, gamestate)
    }
}
//"L"
class GamePiece2 extends GamePiece {
    constructor(gamestate: GameState){
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
        }, gamestate)
    }
}
class GamePiece3 extends GamePiece {
    constructor(gamestate: GameState){
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
        }, gamestate)
    }
}
// "S"
class GamePiece4 extends GamePiece {
    constructor(gamestate: GameState){
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
        }, gamestate)
    }
}
class GamePiece5 extends GamePiece {
    constructor(gamestate: GameState){
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
        }, gamestate)
    }
}
//SQUARE
class GamePiece6 extends GamePiece {
    constructor(gamestate: GameState){
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
        }, gamestate)
    }
}
//"T"
class GamePiece7 extends GamePiece {
    constructor(gamestate: GameState){
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
        }, gamestate)
    }
}


let GameBoard = new GameModel()

if(GameBoard.currentPiece) {
    window.addEventListener("keydown", GameBoard.currentPiece.control)
}
let runGame = setInterval(() => {
    if(GameBoard.gameOver) {
        clearInterval(runGame)
        console.log(GameBoard)
    } else {
        GameBoard.update()
        if(GameBoard.movingPiece) {
            GameBoard.currentYPos++
        }
        console.log(GameBoard.level)
        GameBoard.level++
        if(GameBoard.level >= 10) {
            GameBoard.gameOver = true
        }
    }
}, GameBoard.levelInterval())

GameBoard.update()