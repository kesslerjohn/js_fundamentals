const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]

const gridDisplay = document.querySelector('#grid')
let score = 0;
const cardsChosen = []
const cardsChosenIds = []

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
    score = 0;
    score_display.innerHTML = score
}

function checkMatch() {
    const cards = document.querySelectorAll('#grid img')
    if (cardsChosen[0] == cardsChosen[1]){
        alert('match!')
        score += 1
        score_display.innerHTML = score
        cardsChosenIds.forEach((id) => {
            cards[id].setAttribute('src', 'images/white.png')
            cards[id].removeEventListener('click', flipCard)
        })
        cardsChosen.length = 0
        cardsChosenIds.length = 0
        if (score === 6){
            setTimeout(resetBoard, 1000)
        }
    } else {
        alert('try again.')
        cardsChosenIds.forEach((id) => {
            cards[id].setAttribute('src', 'images/blank.png')
        })
        cardsChosen.length = 0
        cardsChosenIds.length = 0
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id')
    this.setAttribute('src', cardArray[cardId].img)
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

function resetBoard() {
    alert('you win!')
    while (gridDisplay.firstChild){
        gridDisplay.removeChild(gridDisplay.lastChild)
    }
    cardArray.sort(() => 0.5 - Math.random())
    createBoard()
}

cardArray.sort(() => 0.5 - Math.random())
const score_display = document.getElementById('result')
createBoard()
