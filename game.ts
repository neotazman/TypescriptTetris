///// Typescript tetris

const theBoard = document.createElement('table')
theBoard.id = 'gameBoard'

///// custom types. primarily for values and/or parameters
type CellValue = 0 | 1 | 2 //  this is just to show that the cells are either filled or empty
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
    xCells: number
    currentXPos: number
    yCells: number
    currentYPos: number
    previousYPos: number
    frozenCells: CellPosition[]
    interval: number
}


function isOnBoard(board: GameState, piece: GamePiece): boolean {
    let cellPositions = piece ? piece.cells : null
    return (
        piece.currentPosition.x >= 0 && piece.currentPosition.x <= board.gameBoard[0].length - 5 && piece.currentPosition.y >= 0 && piece.currentPosition.y <= board.gameBoard.length - 5
    )
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
    xCells: number
    currentXPos: number
    yCells: number
    currentYPos: number
    previousYPos: number
    frozenCells: CellPosition[]
    interval: number
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
        this.xCells = this.gameBoard[0].length
        this.gamePieceDroppingPosition = Math.floor(this.xCells / 2)
        this.currentXPos = this.gamePieceDroppingPosition
        this.movingPiece = false
        // this.currentPiece if the property is optional i shouldn't instantiate it until the update function is called
        this.yCells = this.gameBoard.length
        this.currentYPos = 0
        this.previousYPos = 0
        this.frozenCells = [[2, this.yCells - 2]]
        this.interval = 1000
    }
    newGameBoard(x: number, y: number): void {
        theBoard.innerHTML = ''
        this.gameBoard = []
        for(let i = 0; i < y; i++) {
            let currentLine = []
            for(let j = 0; j < x; j++) {
                let cellValue = 0
                for(let cell of this.frozenCells) {
                    let currentCell = [j, i]
                    if(cell === currentCell) {
                        cellValue = 2
                    }
                }
                currentLine.push(cellValue)
            }
            this.gameBoard.push(currentLine)
        }
    }
    buildGameBoard(): void {// rebuilds the game board with the current gamestate
        theBoard.innerHTML = '' // clear the board
        for(let row = 0; row < this.gameBoard.length; row++) { // makes the board match the game model
            let currentRow = this.gameBoard[row]
            let thisRow = document.createElement('tr')
            thisRow.className = `row ${row}`
            for(let col = 0; col < currentRow.length; col++) {
                let falling = ''
                let filled = ''
                if(currentRow[col] === 1) { // adds the className falling when it's falling
                    falling+= ' falling'
                } else if(currentRow[col] === 2) { // adds the className falling when it's falling'}
                    filled+= ' filled'
                }
                let currentCell = document.createElement('td')
                currentCell.className = `cell ${col}${falling}${filled}` // if the cell is empty the "filled" value is an empty string
                thisRow.append(currentCell)
            }
            theBoard.append(thisRow)
        }
        document.body.append(theBoard)
    }
    levelInterval(): void {
        this.interval = 1000 * (0.9 ^ this.level) 
        // console.log(this.interval)
    }
    randomGamePiece(): GamePiece { // this function will always return a random GamePiece, but since all the return statements are inside if statements, typescript thinks it could not return anything
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
        this.movingPiece = true
        this.currentPiece.draw()
    }
    update(): void {
        if(!this.currentPiece) {
            this.addGamePiece(this.randomGamePiece())
            this.update()// is this working?
        } else {
            this.newGameBoard(this.xCells, this.yCells)
            if(GameBoard.currentPiece) {
                window.addEventListener("keydown", controlGame)
            }
            this.currentPiece.draw()
            this.levelInterval()
            // this.currentPiece!.currentPosition[0]++ // i want to call update on the keydown event listener and i don't want the piece to fall when i do that
        }
        this.buildGameBoard()
    }
}

const StartingGameModel : GameState = new GameModel()



// THE GAMEPIECES

class GamePiece {
    gameState: GameState //| undefined
    // velocity: number // the gamespeed is on the gamestate object so there's no reason to have this in here
    cells: CellPosition[] // [number, number]
    currentPosition: {x: number, y: number}
    fullGamePiece: AllRotations
    bluePrint: Tetromino
    rotation: 1 | 2 | 3 | 4 
    isFalling: boolean
    constructor(piece: AllRotations, gamestate: GameState) {
        this.fullGamePiece = piece
        this.gameState = gamestate || StartingGameModel
        // this.velocity = this.gameState.level
        this.rotation = 1
        this.bluePrint = this.fullGamePiece[this.rotation]
        this.cells = this.findCellPositions(this.bluePrint)
        this.currentPosition = {
            x: this.gameState.currentXPos,
            y: this.gameState.currentYPos,
        }
        this.isFalling = this.gameState.movingPiece
    }
    findCellPositions(piece: Tetromino) : CellPosition[] {
        let fourCells: CellPosition[] = []
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
    control(event: KeyboardEvent): void {
        if(!GameBoard.currentPiece) return
        if(event.key === "w" || event.key === "s" || event.key === "a" || event.key === "d" || event.key === "k" || event.key === "m"){
            // ROTATE
            if(event.key === "w") { // "W" counter-clockwise increase rotation
                if(this.rotation === 4) {
                    this.rotation = 1
                } else {
                    this.rotation++
                }
            } else 
            if(event.key === "s") { // "S" clockwise decrease rotation
                if(this.rotation === 1) {
                    this.rotation = 4
                } else {
                    this.rotation--
                }
            } else 
            // MOVE
            if(event.key === "a") { // "A" move left
                this.currentPosition.x--
            } else 
            if(event.key === "d") { // "D" move right
                this.currentPosition.x++
            } else
            // check the time for debuggin purposes
            if(event.key === "k") {
                console.log(gameTime)
            } else
            if(event.key === "m") {
                this.gameState.currentYPos++
            }
            GameBoard.currentXPos = this.currentPosition.x
            this.bluePrint = this.fullGamePiece[this.rotation]
            this.cells = this.findCellPositions(this.bluePrint)
            this.draw()
            GameBoard.update()
            return
        }
    }
    draw(x?: number, y?: number) : void {
        if (this.gameState.currentPiece === this) {
            this.currentPosition = {
                x: this.gameState.currentXPos,
                y: this.gameState.currentYPos,
            }
            if(!isOnBoard(this.gameState, this)) {

            }
            let stop = false
            for (let cell of this.cells) {
                let dy = cell[0]
                let dx = cell[1]
                let exactY = this.currentPosition.y + dy
                let exactX = this.currentPosition.x + dx
                if(this.gameState.gameBoard[exactY][exactX] !== 2) {
                    this.gameState.gameBoard[exactY][exactX] = 1
                } else if(!this.gameState.gameBoard[exactY][exactX]) {// to add the ones as twos
                    stop = true // will finish later -- only here so we don't break the code
                } else {
                    stop = true
                }
            }
            if(stop) { 
                for(let cell of this.cells) {

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



let GameBoard = new GameModel() // even though i create a new game model in DOMLoaded i need GameBoard to be a global variable so other functions can read it
window.addEventListener('DOMLoaded', () => { // this is my first typescript game. i never understood why you need a DOMLoaded event listener if you instantiate the code after it is created, but now i realize that javascript being loosely typed makes it so it doesn't check if a function works before you call it, so i need to make a new GameModel as soon as the page loads so it doesn't read the code until after it's instantied
    GameBoard = new GameModel()
    GameBoard.update()
    console.log(GameBoard.interval)
    if(GameBoard.currentPiece) {
        window.addEventListener("keydown", controlGame)
    }
})
GameBoard.update()


function controlGame(event: KeyboardEvent): void { // it worked this way
    if(!GameBoard.currentPiece) return
    GameBoard.currentPiece.control(event)
}



let gameTime = 0

let gameInterval = 1000

let runGame = setInterval(() => {
    if(GameBoard.gameOver) {
        clearInterval(runGame)
        console.log(GameBoard)
    } else {
        GameBoard.update()
        gameInterval = GameBoard.interval
        gameTime++
        if(GameBoard.movingPiece) {
            GameBoard.previousYPos = GameBoard.currentYPos
            GameBoard.currentYPos++
        }
        GameBoard.level++
        if(GameBoard.level >= GameBoard.yCells - 2) {
            GameBoard.gameOver = true
        }
    }
}, gameInterval)

// GameBoard.update()