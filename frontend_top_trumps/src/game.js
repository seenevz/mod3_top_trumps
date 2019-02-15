const mainUrl = ('https://localhost/3000')
const cardsUrl = (`${mainUrl}/random`)
const usersUrl = (`${mainUrl}/users`)
const gamersUrl = (`${mainUrl}/games`)
const stateUrl = `${mainUrl}/state`
const stateUpdateUrl = `${mainUrl}/state/update`
const player1Url = (`${mainUrl}/player/1`)
const player2Url = (`${mainUrl}/player/2`)


const cardElDiv = document.querySelector('.card')
const containerDiv = document.querySelector('.container')
const formEL = document.querySelector('.add-player')
const formElement = document.createElement('form')
const opponentEl = document.createElement('div')
const cardTwoEL = document.querySelector('cardTwo')
const cardTwoDiv = document.createElement('div')
const player1Div = document.createElement('div')

//1. get request for cards
const getCards = () => {
    return fetch(`http://localhost:3000/random`)
    .then(resp => resp.json())
    .then(cardData => state.pOneCards = cardData)
}

//2. send card back to server to start game
const initGame = (card) => {
    return fetch(gamersUrl, {
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({p1_card_id: state.pOneCards[0].id,
                                round_id: state.round})
    })
}


// // const getplayer2Cards = () => {
// //     return fetch(player2Url)
// //     .then(resp => resp.json())
// //     .then(cardData => state.pTwoCards = cardData)
// // }


state = {
    pOneCards: null,
    pTwoCards: null,
    sCard: null,
    sCardAtP1: null,
    Player1: null,
    Player2: null,
    game: null,
    round: 1
}

// 6. render first player card and event listener for clicked attribute
const renderFirstPlayerCard = (card) => {
    cardTwoDiv.className = 'cardTwo'
    cardTwoDiv.innerHTML = `
    <h3> ??? </h3>`
    opponentEl.className = ''
    opponentEl.innerHTML = ''
    player1Div.className = 'cardOne'
    player1Div.innerHTML = `
  <img src='${card.url}'</img>
  <h3>${card.name}</h3>
    <p>Ridiculousness: ${card.attribute_1} <button data-id="attribute_1">Select</button></p>
    <p>Cup Size: ${card.attribute_2} <button data-id="attribute_2">Select</button></p>
    <p>Dancing: ${card.attribute_3} <button data-id="attribute_3">Select</button></p>
    <p>HairStyle: ${card.attribute_4} <button data-id="attribute_4">Select</button></p>
    <p>Start Nuclear War: ${card.attribute_5} <button data-id="attribute_5">Select</button></p>
    `
  containerDiv.append(player1Div)
  containerDiv.append(cardTwoDiv)
  player1Div.addEventListener("click", selectAttributeAndRevealCardTwo)
  state.sCard = card
}

//7. It renders the second players card and passes the server the whole card object and the card attribute value.
const selectAttributeAndRevealCardTwo = (event) => {
    // const chosenAttP1 = 
    const selectedAt = event.target.dataset.id
    state.sCardAtP1 = selectedAt
    renderSecondPlayerCard(state.pTwoCards[0])
    sendCardAndAtToServer(state.sCard, selectedAt)
    whichOneWins()
} 

//9. the selected card and the chosen attribute are passed to the server
const sendCardAndAtToServer = (sCard, selectedAt) => {
    console.log(sCard, selectedAt)
    return fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({selectedCard: sCard, selectedAttribute: selectedAt})
    }).then(resp => resp.json())
}


const whichOneWins = () => {
    // console.log(state.sCardAtP1)
    // vsPlayerOne = cards2[0].attributes.find(attribute => attribute.sCardAtP1)
    // console.log(vsPlayerOne)

}

const displayWinnerCard = (card) => {

    const winnerDiv = document.createElement('div')
    cardTwoDiv.className = ""
    cardTwoDiv.innerHTML = ""
    player1Div.innerHTML = ""
    player1Div.className = ""
    winnerDiv.className = 'winnerCard'
    winnerDiv.innerHTML = `
    <img src='${card.url}'</img>
    <h3>${card.name}</h3>
    <p data-id=${card.attribute_1}><strong>Ridiculousness:</strong> ${card.attribute_1}</p>
    <p data-id=${card.attribute_2}><strong>Cup Size:</strong> ${card.attribute_2}</p>
    <p data-id=${card.attribute_3}><strong>Dancing:</strong> ${card.attribute_3}</p>
    <p data-id=${card.attribute_4}><strong>HairStyle:</strong> ${card.attribute_4}</p>
    <p data-id=${card.attribute_5}><strong>Start Nuclear War:</strong> ${card.attribute_5}</p>
  `
  containerDiv.append(winnerDiv)
}

const getWinnerCard = () => {
    return fetch(`http://localhost:3000/specifyEndPoint`)
        .then(resp => resp.json())
        .then(card = displayWinnerCard(card))
}

const addCardWinner = (card) => {
    //Loser Card is Given
    id = card.id
    //Find the losers card in the players deck
    foundCard = state.pOneCards.find(card => card.id == id)
    if(foundCard){
        //Ptwo is winner
        state.pTwoCards.unshift(card)
        state.pOneCards.shift()
        state.pTwoCards.push(state.pTwoCards.splice(0, 1)[0])
        state.pTwoCards.push(state.pTwoCards.splice(0, 1)[0])
    }
    else {
        //POne is winner
        state.pOneCards.unshift(state.pTwoCards[0])
        state.pTwoCards.shift()
        state.pOneCards.push(state.pOneCards.splice(0, 1)[0])
        state.pOneCards.push(state.pOneCards.splice(0, 1)[0])
    }
}

//8. 
const renderSecondPlayerCard = (card) => {
    const player2Div = document.createElement('div')
    player2Div.className = 'cardOne'
    player2Div.innerHTML = `
    <img src='${card.url}'</img>
    <h3>${card.name}</h3>
    <p>${card.description}<p>
      <p data-id=${card.attribute_1}><strong>attribute:</strong> ${card.attribute_1}</p>
      <p data-id=${card.attribute_2}><strong>attribute:</strong> ${card.attribute_2}</p>
      <p data-id=${card.attribute_3}><strong>attribute:</strong> ${card.attribute_3}</p>
      <p data-id=${card.attribute_4}><strong>attribute:</strong> ${card.attribute_4}</p>
      <p data-id=${card.attribute_5}><strong>attribute:</strong> ${card.attribute_5}</p>
    `
    containerDiv.append(player2Div)
  }

//4 collect player name and send it to the database
  const collectUserName = (event) => {
    event.preventDefault()
    playerOne = formElement.name.value
    formElement.name.value = ''
    formElement.innerHTML = ''
    passUserNameToDB(playerOne)
}


//5. send player to database and call for cards to render
// const passUserNameToDB = (playerOne) => {
//         console.log(playerOne)
//         return fetch(gamersUrl, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({player_one: playerOne})
//         }).then(resp => console.log(resp.json())).then(() => waitingForOp())
        
// }

const waitingForOp = () => {
    formEL.className = ""
    opponentEl.className = 'wait'
    opponentEl.innerHTML = `

    <h3>Waiting For Opponent...</h3>
    `
    containerDiv.append(opponentEl)
}

// const interval = window.setInterval(isPlayerReady, 500)

const isPlayerReady = () => {

}

//6. call for cards to render and render first player 1st card 
const getCardsAndRender = () => {
    getCards().then(() => renderFirstPlayerCard(state.pOneCards[0]))
}


const renderForm = () => {
if(state.pOneCards.length == 0 || state.pTwoCards.length == 0){
formElement.class = 'add-player-form'
formElement.innerHTML = `
<h3>Enter Your Name Loser</h3>
<input required id='name-input' type="text" name="name" value="" placeholder="In here dumb ass..." class="input-text">
<br><br>
<input type="submit" name="submit" value="Hit me to play" class="submit">
`
formEL.append(formElement)
formEL.addEventListener('submit', collectUserName)
}
}

renderForm()



// player1Card(state.pOneCards[0])
// sendCardAndAtToServer(state.sCard, state.sCardAtP1)
// addCardWinner(card[1])




