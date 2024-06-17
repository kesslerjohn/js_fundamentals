const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')

const timeLeft = document.querySelector('#time-left')

const score = document.querySelector("#score")

let result = 0
let hitPosition
let currentTime = 20
let timerId = null

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
        square.classList.remove('toby')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    let tobyChance = Math.floor(Math.random()*5)
    if (tobyChance == 3){
        randomSquare.classList.add('toby')
    } else {
        randomSquare.classList.add('mole')
    }
    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            if (square.classList.contains('toby')) {
                score.innerHTML = "-1,000,000"
                alert("You bopped Toby :( You lose!")
                clearInterval(countDownTimerId)
                clearInterval(timerId)
            } else {
                result++
                score.innerHTML = result
                hitPosition = null
            }
            
        } 
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 1000)
}

function countDown(){
    currentTime--

    if (currentTime == 0){
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert("GAME OVER! Final score: " + result)
    }
    timeLeft.innerHTML = currentTime
}

moveMole()

let countDownTimerId = setInterval(countDown, 1000)