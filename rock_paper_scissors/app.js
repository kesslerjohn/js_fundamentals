const computer_choice_display = document.getElementById('computer-choice')
const user_choice_display = document.getElementById('user-choice')
const result_display = document.getElementById('result')

const possibleChoices = document.querySelectorAll('button')
let userChoice 
let computerChoice
let result

possibleChoices.forEach(choice => choice.addEventListener('click', (e) => {
    userChoice = e.target.id
    user_choice_display.innerHTML = userChoice
    generateComputerChoice()
    computer_choice_display.innerHTML = computerChoice
    getResult()
}))

function generateComputerChoice() {
    const randNum = Math.floor(Math.random() * possibleChoices.length)
    computerChoice = possibleChoices[randNum].id
}

function getResult() {
    const beats = {"rock": "scissors",
                   "paper": "rock",
                   "scissors": "paper"
    }
    if (computerChoice === userChoice) {
        result = "draw!"
    } else {
        if (beats[computerChoice] === userChoice) {
            result = "you lose!"
        } else {
            result = "you win!"
        }
    }
    result_display.innerHTML = result
}