let deck = []

const startBtn = document.getElementById("startGameBtn")
const startBtnEl = document.getElementById("startGameBtn").addEventListener("click", init);

const playerCardsContainer = document.getElementById("playerCardsContainer")
const dealerCardsContainer = document.getElementById("dealerCardsContainer")

function init(){
    startBtn.disabled = true
    shuffle()
    firstCard()
}


function createDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let suits = ["S", "D", "H", "C", "S", "D", "H", "C", "S", "D", "H", "C"]

    suits.forEach ((suit) => {
        values.forEach((card) => {
            deck.push(card + "-" + suit)
        })
    })
}

function shuffle(){
    createDeck()
    for (let i=0; i<deck.length; i++){
        let topCard = deck[i]
        let ranIdx = Math.floor(Math.random()*deck.length)
        deck[i] = deck[ranIdx]
        deck[ranIdx]=topCard
    }
}

function firstCard(){
    let dealtCardImg = document.createElement("img")
    let dealtCard = deck.shift()
    dealtCardImg.setAttribute("src", `../Resources/cards/${dealtCard}.png`)
    playerCardsContainer.append(dealtCardImg)

    setTimeout(secondCard, 1000)
}
function secondCard(){
    let dealtCardImg = document.createElement("img")
    let dealtCard = deck.shift()
    dealtCardImg.setAttribute("src", `../Resources/cards/${dealtCard}.png`)
    dealerCardsContainer.append(dealtCardImg)

    setTimeout(thirdCard, 1000)
}
function thirdCard(){
    let dealtCardImg = document.createElement("img")
    let dealtCard = deck.shift()
    dealtCardImg.setAttribute("src", `../Resources/cards/${dealtCard}.png`)
    playerCardsContainer.append(dealtCardImg)
    
    setTimeout(fourthCard, 1000)
}

function fourthCard(){
    let dealtCardImg = document.createElement("img")
    let dealtCard = deck.shift()
    dealtCardImg.setAttribute("src", `../Resources/cards/${dealtCard}.png`)
    dealerCardsContainer.append(dealtCardImg)
}
