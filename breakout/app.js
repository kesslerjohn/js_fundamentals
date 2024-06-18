const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const userStart = [230, 10]
const ballStart = [270, 40]
let currentPosition = userStart
let ballPosition = ballStart
let timerId
const startButton = document.querySelector('.button')

const scoreDisplay = document.querySelector('#score')
let score = 0

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight] 
    }
}

// all blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
]

// draw all blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] +'px'
        grid.appendChild(block)
    }
}

function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

function drawBall() {
    ball.style.left = ballPosition[0] + 'px'
    ball.style.bottom = ballPosition[1] + 'px'
}

// move user
function moveUser(e){
    switch (e.key) {
        case 'ArrowLeft': 
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0]+blockWidth < boardWidth) {
                currentPosition[0] += 10
            drawUser()
            }
            break;
    }
}

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

addBlocks()

document.addEventListener('keydown', moveUser)

// add ball

const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

let xStep = 2
let yStep = 2
// move ball

function hitBoxY(target) {
    // you can hit the bottom of a block
    // if your top is equal to its bottom
    let hitBottom = (ballPosition[1] + 20 == target.bottomLeft[1])
    let hitTop = (ballPosition[1] == target.topLeft[1])
    return (hitBottom || hitTop)
}

function hitBoxX(target) {
    let hitLeft = (ballPosition[0] + 10 >= target.bottomLeft[0])
    let hitRight = (ballPosition[0] + 10 <= target.bottomRight[0])
    return (hitLeft && hitRight)
}

function checkCollisions() {
    // board collisions

    if (ballPosition[1] <= 0) {
        document.removeEventListener('keydown', moveUser)
        clearInterval(timerId)
        alert("Game over! Your score: " + score)
    }

    if ((ballPosition[0] <= 0) || (ballPosition[0] >= boardWidth - 20)) {
        xStep = -1*xStep
    }
    if (ballPosition[1] >= boardHeight - 20) {
        yStep = -1*yStep
    }

    // block collisions
    const allBlocks = Array.from(document.querySelectorAll('.block'))
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i]
        if (hitBoxX(block) && hitBoxY(block)) {
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            yStep = -1*yStep
            score++
            scoreDisplay.innerHTML = "Score: " + score.toString()
        }
        if (blocks.length == 0) {
            document.removeEventListener('keydown', moveUser)
            clearInterval(timerId)
            alert("You win! Final score: " + score)
        }
    }
    // user collision
    if (ballPosition[0] + 10 > currentPosition[0] && ballPosition[0] + 10 < (currentPosition[0] + blockWidth)) {
        if (ballPosition[1] <= currentPosition[1] + blockHeight) {
            yStep = -1*yStep
        }
    }
}

function moveBall() {
    checkCollisions()
    ballPosition[0] += xStep
    ballPosition[1] += yStep
    drawBall()
}

startButton.addEventListener('mousedown', () => {timerId = setInterval(moveBall, 20)})