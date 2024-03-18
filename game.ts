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
type AllRotations = {// instead of making functions to rotate the gamepieces, I've decided to put all possible rotations into the class for each gamepiece
    1: Tetromino,
    2: Tetromino,
    3: Tetromino,
    4: Tetromino,
}
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

// THE GAMEPIECES
class GamePiece {
    gameState: GameState | undefined
    velocity: number
    cells: CellPosition[] // [number, number]
    currentPosition: CellPosition
    bluePrint: Tetromino
    rotation: 1 | 2 | 3 | 4 
    height: any // will change later, but i have to stop now
    width: any // will change later, but i have to stop now
    constructor(piece: AllRotations, gamestate?: GameState) {
        this.gameState = gamestate
        this.velocity = 1 
        this.rotation = 1
        this.bluePrint = piece[this.rotation]
        this.cells = this.findCellPositions(this.bluePrint)
        this.currentPosition = [0, 1]
        // width and height define how many cell positions will be taken up with the tetrominos
        this.height 
        this.width
    }
    rotate(event: any): void {
        if(event.key !== "W" || "S" || "A" || "D"){
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
            if(event.key === "A") { // "A" move left
                this.currentPosition[1]--
                console.log(this.currentPosition)
            } else 
            if(event.key === "D") { // "D" move right
                this.currentPosition[1]++
                console.log(this.currentPosition)
            } else return
        }
    }
    findCellPositions(piece: Tetromino) : CellPosition[] {
        let fourCells: CellPosition[] = []
        let result! : CellPosition
        for(let i = 0; i < piece.length; i++) { // decided to make the starting position on the first line for every tetronimo, but this loop should still work
            let currentRow = piece[i]
            let found = currentRow.findIndex((cell) => cell === 1)
            if(found === -1) continue
            else {
                result = [i, found]
                fourCells.push(result)
            }
        }
        return fourCells
    }
    draw(x?: number, y?: number) : void {
        this.currentPosition[0]++
    }
}

// STRAIGHT LINE
class GamePiece1 extends GamePiece {
    constructor(){
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
        })
    }
}
//"L"
class GamePiece2 extends GamePiece {
    constructor(){
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
        })
    }
}
class GamePiece3 extends GamePiece {
    constructor(){
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
        })
    }
}
// "S"
class GamePiece4 extends GamePiece {
    constructor(){
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
        })
    }
}
class GamePiece5 extends GamePiece {
    constructor(){
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
        })
    }
}
//SQUARE
class GamePiece6 extends GamePiece {
    constructor(){
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
        })
    }
}
//"T"
class GamePiece7 extends GamePiece {
    constructor(){
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
        })
    }
}


class GameModel {
    gameState: GameState
    gamePieceDroppingPosition: number
    movingPiece: boolean
    currentPiece: GamePiece | undefined
    constructor(gamestate?: GameState) {
        this.gameState = gamestate || StartingGameModel
        this.gamePieceDroppingPosition = Math.floor(this.gameState.gameBoard[0].length / 2)
        // since currentPiece can return undefined, i could just remove movingPiece and check the boolean value for currentPiece, but i think this way is a better practice
        this.movingPiece = false
        this.currentPiece
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
    randomGamePiece(): GamePiece | undefined { // this function will always return a random GamePiece, but since all the return statements are inside if statements, typescript thinks it could return nothing
        let random: number = Math.ceil(Math.random() * 7)
        if(random === 1) {
            return new GamePiece1()
        }
        if(random === 2) {
            return new GamePiece2()
        }
        if(random === 3) {
            return new GamePiece3()
        }
        if(random === 4) {
            return new GamePiece4()
        }
        if(random === 5) {
            return new GamePiece5()
        }
        if(random === 6) {
            return new GamePiece6()
        }
        if(random === 7) {
            return new GamePiece7()
        }
    }
    addGamePiece(gamepiece?: GamePiece): void {
        this.currentPiece = gamepiece
        for(let row of this.gameState.gameBoard) {
            row[this.gamePieceDroppingPosition] = 1
        }
        this.movingPiece = true
    }
    update(): void {
        if(!this.movingPiece) {
            this.addGamePiece(this.randomGamePiece())
        } else {
            // this.currentPiece!.currentPosition[0]++ // i want to call update on the keydown event listener and i don't want the piece to fall when i do that
        }
        this.buildGameBoard()
    }
}


let GameBoard = new GameModel()

window.addEventListener("keydown", GameBoard.currentPiece!.rotate)

let runGame = setInterval(() => {
    if(GameBoard.gameState.gameOver) {
        clearInterval(runGame)
        console.log(GameBoard)
    } else {
        GameBoard.update()
        if(GameBoard.movingPiece && typeof GameBoard.currentPiece === "number") {
            GameBoard.currentPiece[0]++
        }
        console.log(GameBoard.gameState.level)
        GameBoard.gameState.level++
        if(GameBoard.gameState.level >= 10) {
            GameBoard.gameState.gameOver = true
        }
    }
}, GameBoard.levelInterval())

GameBoard.update()