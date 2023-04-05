let deck = []
let hiddenCard
let playerSum = 0
let dealerSum = 0
let aceTallyPlayer
let aceTallyDealer
let bankrollAmount = 1000
let betSize

const startBtn = document.getElementById("startGameBtn")
const startBtnEl = document.getElementById("startGameBtn").addEventListener("click", init);

const playerCardsContainer = document.getElementById("playerCardsContainer")
const dealerCardsContainer = document.getElementById("dealerCardsContainer")

const playerSumEl = document.getElementById("playerSum")
const dealerSumEl = document.getElementById("dealerStatsContainer")

const messagingEl = document.querySelector(".messaging")

const hitBtn = document.getElementById("hit")
const standBtn = document.getElementById("stand")

const hitBtnEl = document.getElementById("hit").addEventListener("click", hit)
const standBtnEl = document.getElementById("stand").addEventListener("click", stand)

const bankrollEl = document.getElementById("bankroll")

function init(){
    startBtn.disabled = true
    bankrollEl.innerHTML = `Bank = $${bankrollAmount}`
    shuffle()
    start()
}

function start(){
    aceTallyPlayer = 0
    aceTallyDealer = 0
    bankrollAmount = bankrollAmount
    betSize = 50
    hitBtn.disabled = false
    standBtn.disabled = false
    firstCard()
}


function createDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let suits = ["S", "D", "H"] //, "C", "S", "D", "H", "C", "S", "D", "H", "C"

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
    debugger
    let dealtCardImg = document.createElement("img")
    let dealtCard = deck.shift()
    dealtCardImg.setAttribute("src", `/Resources/cards/${dealtCard}.png`)
    playerCardsContainer.append(dealtCardImg)

    //determine card value 
    let cardValueArray = dealtCard.split("-")
    if (cardValueArray[0]=== "A"){
        aceTallyPlayer++;
        cardValueArray[0] = "11"    
    } else if (cardValueArray[0] === "J" || cardValueArray[0] === "Q" || cardValueArray[0] === "K"){
        cardValueArray[0] = "10"
    }
    let cardValue = parseInt(cardValueArray[0])
    //update stats
    playerSum = cardValue;
    if (aceTallyPlayer>=1 && playerSum >21){
        playerSum -= 10
        aceTallyPlayer--
    }
    playerSumEl.innerHTML = `${playerSum}`
    //timer to simulate lag in dealing cards
    setTimeout(secondCard, 1000)
}

function secondCard(){
    let dealtCardImg = document.createElement("img")
    let dealtCard = deck.shift()
    hiddenCard = dealtCard
    dealtCardImg.setAttribute("id", "hiddenCard")
    dealtCardImg.setAttribute("src", `/Resources/cards/BACK.png`)
    dealerCardsContainer.append(dealtCardImg)

    //determine card value
    let cardValueArray = dealtCard.split("-")
    if (cardValueArray[0]=== "A"){
        aceTallyDealer++;
        cardValueArray[0] = "11"    
    } else if (cardValueArray[0] === "J" || cardValueArray[0] === "Q" || cardValueArray[0] === "K"){
        cardValueArray[0] = "10"
    }
    //update stats
    let cardValue = parseInt(cardValueArray[0])
    dealerSum = cardValue;
    //timer to simulate lag in dealing cards
    setTimeout(thirdCard, 1000)
}

function thirdCard(){
    let dealtCardImg = document.createElement("img")
    let dealtCard = deck.shift()
    dealtCardImg.setAttribute("src", `/Resources/cards/${dealtCard}.png`)
    playerCardsContainer.append(dealtCardImg)
    
    //determine card value
    let cardValueArray = dealtCard.split("-")
    if (cardValueArray[0]=== "A"){
        aceTallyPlayer++;
        cardValueArray[0] = "11"    
    } else if (cardValueArray[0] === "J" || cardValueArray[0] === "Q" || cardValueArray[0] === "K"){
        cardValueArray[0] = "10"
    }
    //update stats
    let cardValue = parseInt(cardValueArray[0])
    playerSum = playerSum + cardValue;
    //track aces to determine ideal value of 1 or 11
    if (aceTallyPlayer>=1 && playerSum >21){
        playerSum -= 10
        aceTallyPlayer--
    }
    playerSumEl.innerHTML = `${playerSum}`
    //timer to simulate lag in dealing cards
    setTimeout(fourthCard, 1000)
}

function fourthCard(){
    let dealtCardImg = document.createElement("img")
    let dealtCard = deck.shift()
    dealtCardImg.setAttribute("src", `/Resources/cards/${dealtCard}.png`)
    dealerCardsContainer.append(dealtCardImg)

    //determine card value
    let cardValueArray = dealtCard.split("-")
    if (cardValueArray[0]=== "A"){
        aceTallyDealer++;
        cardValueArray[0] = "11"    
    } else if (cardValueArray[0] === "J" || cardValueArray[0] === "Q" || cardValueArray[0] === "K"){
        cardValueArray[0] = "10"
    }
    //update stats
    let cardValue = parseInt(cardValueArray[0])
    dealerSum = dealerSum + cardValue;
    //track aces to determine ideal value of 1 or 11
    if (aceTallyDealer>=1 && dealerSum >21){
        dealerSum -= 10
        aceTallyDealer--
    }

    checkForBlackjack()
}

function checkForBlackjack(){
    if (dealerSum === 21 && playerSum !==21){
        let mysteryCard = document.getElementById("hiddenCard")
        mysteryCard.setAttribute("src",  `/Resources/cards/${hiddenCard}.png` )
        dealerSumEl.innerHTML = `${dealerSum}`
        messagingEl.innerHTML = "Dealer - Blackjack"
        let winning = -betSize
        bankrollAmount += winning
        bankrollEl.innerHTML = `Bank = $${bankrollAmount}`
        setTimeout(continuePlay, 2000)
    } else if (dealerSum !== 21 && playerSum ===21){
        messagingEl.innerHTML = "WINNER - Blackjack!!!"
        let mysteryCard = document.getElementById("hiddenCard")
        mysteryCard.setAttribute("src",  `/Resources/cards/${hiddenCard}.png` )
        dealerSumEl.innerHTML = `${dealerSum}`
        let winning = 1.5*betSize
        bankrollAmount += winning
        bankrollEl.innerHTML = `Bank = $${bankrollAmount}`
        setTimeout(continuePlay, 2000)
        } else if(dealerSum === 21 && playerSum ===21){
        let mysteryCard = document.getElementById("hiddenCard")
        mysteryCard.setAttribute("src",  `/Resources/cards/${hiddenCard}.png` )
        dealerSumEl.innerHTML = `${dealerSum}`
        messagingEl.innerHTML = "PUSH"
        setTimeout(continuePlay, 2000)
    } else{
        setTimeout(function(){
            hitBtn.style.visibility = "visible"
            standBtn.style.visibility = "visible"
        },1000)       
    }  
}

function hit(){
    let dealtCardImg = document.createElement("img")
    let dealtCard = deck.shift()
    dealtCardImg.setAttribute("src", `/Resources/cards/${dealtCard}.png`)
    playerCardsContainer.append(dealtCardImg)

    //determine card value
    let cardValueArray = dealtCard.split("-")
    if (cardValueArray[0]=== "A"){
        aceTally++;
        cardValueArray[0] = "11"    
    } else if (cardValueArray[0] === "J" || cardValueArray[0] === "Q" || cardValueArray[0] === "K"){
        cardValueArray[0] = "10"
    }
    //update stats
    let cardValue = parseInt(cardValueArray[0])
    playerSum = playerSum + cardValue;
    //track aces to determine ideal value of 1 or 11
    if (aceTallyPlayer>=1 && playerSum >21){
        playerSum -= 10
        aceTallyPlayer--
    }
    //update stats
    playerSumEl.innerHTML = `${playerSum}` 
    //checks to see if player sum is greater than 21
    checkForPlayerBust()
}
function checkForPlayerBust (){
    if(playerSum > 21){
        let mysteryCard = document.getElementById("hiddenCard")
        mysteryCard.setAttribute("src",  `/Resources/cards/${hiddenCard}.png` )
        dealerSumEl.innerHTML = `${dealerSum}` 
        messagingEl.innerHTML = "Dealer win, you bust"
        let winning = -betSize
        bankrollAmount += winning
        bankrollEl.innerHTML = `Bank = $${bankrollAmount}`
        hitBtn.disabled = true;
        standBtn.disabled = true;
        setTimeout(continuePlay, 2000)
    }
}

function stand(){
    hitBtn.disabled = true;
    standBtn.disabled = true;

    let mysteryCard = document.getElementById("hiddenCard")
    mysteryCard.setAttribute("src",  `/Resources/cards/${hiddenCard}.png` )
    document.querySelector("img").style.visibility = "visible"
    dealerSumEl.innerHTML = `${dealerSum}` 

    setTimeout(function (){
        dealerTakeACard()
        compareScores()
    }, 1500)
}

function dealerTakeACard(){
    while (dealerSum < 17){
        let dealtCardImg = document.createElement("img")
        let dealtCard = deck.shift()
        dealtCardImg.setAttribute("src", `/Resources/cards/${dealtCard}.png`)
        dealerCardsContainer.append(dealtCardImg)
        
        //determine card value   
        let cardValueArray = dealtCard.split("-")
        if (cardValueArray[0]=== "A"){
            aceTallyDealer++;
            cardValueArray[0] = "11"    
        } else if (cardValueArray[0] === "J" || cardValueArray[0] === "Q" || cardValueArray[0] === "K"){
            cardValueArray[0] = "10"
        }
        //update stats
        let cardValue = parseInt(cardValueArray[0])
        dealerSum = dealerSum + cardValue;
        //track aces to determine ideal value of 1 or 11
        if (aceTallyDealer>=1 && dealerSum >21){
            dealerSum -= 10
            aceTallyDealer--
        }
        //update stats
        dealerSumEl.innerHTML = `${dealerSum}`  
    }
}

function compareScores(){
    if(playerSum <21 && dealerSum > playerSum && dealerSum < 22){
        messagingEl.innerHTML = "Dealer win"
        let winning = -betSize
        bankrollAmount += winning
        bankrollEl.innerHTML = `Bank = $${bankrollAmount}`
        setTimeout(continuePlay, 2000)
    } else if (playerSum <=21 && dealerSum < playerSum){
        messagingEl.innerHTML = "YOU WIN"
        let winning = betSize
        bankrollAmount += winning
        bankrollEl.innerHTML = `Bank = $${bankrollAmount}`
        setTimeout(continuePlay, 2000)
    } else if (dealerSum>21) {
        messagingEl.innerHTML = "Dealer BUST! YOU WIN"
        let winning = betSize
        bankrollAmount += winning
        bankrollEl.innerHTML = `Bank = $${bankrollAmount}`
        setTimeout(continuePlay, 2000)
    } else{
        messagingEl.innerHTML = "PUSH"
        setTimeout(continuePlay, 2000)
    }
}

function continuePlay(){
    if (hitBtn.disabled = true && deck.length <=20){
        setTimeout(function (){
            dealerCardsContainer.innerHTML = ""
            playerCardsContainer.innerHTML = ""
            dealerSumEl.innerHTML = "" 
            playerSumEl.innerHTML = ""
            hitBtn.style.visibility = "hidden"
            standBtn.style.visibility = "hidden"
        }, 5000)
        setTimeout(function (){
            messagingEl.innerHTML = "End of shoot! Press Play Again button to continue play"
            startBtn.innerHTML = "Play Again"
            startBtn.disabled = false;
        }, 5000)
    } else {
        setTimeout(function(){
            dealerCardsContainer.innerHTML = ""
            playerCardsContainer.innerHTML = ""
            messagingEl.innerHTML = ""
            dealerSumEl.innerHTML = "" 
            playerSumEl.innerHTML = ""
            hitBtn.style.visibility = "hidden"
            standBtn.style.visibility = "hidden"
        }, 2000)
        setTimeout(start, 3000)
    }
    
}