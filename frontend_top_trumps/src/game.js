const cardsUrl = ('http://localhost:3000/cards')
const usersUrl = ('http://localhost:3000/users')
const gamersUrl = ('http://localhost:3000/games')
const player1Url = ('http://localhost:3000/player/1')
const player2Url = ('http://localhost:3000/player/2')


const cardElDiv = document.querySelector('.card')
const containerDiv = document.querySelector('.container')
const formEL = document.querySelector('.add-player')

//1. get request for cards
const getCards = () => {
    return fetch(cardsUrl)
    .then(resp => resp.json())
    .then(cardData => state.pOneCards = cardData)
}

//2. send card back to server to start game
const initGame = (card) => {
    return fetch(`http://localhost:3000/games`, {
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({card: state.pOneCards[0].id})
    })
}


// // const getplayer2Cards = () => {
// //     return fetch(player2Url)
// //     .then(resp => resp.json())
// //     .then(cardData => state.pTwoCards = cardData)
// // }

state = {
    pOneCards: [],
    pTwoCards: [],
    sCard: null,
    sCardAtP1: null,
    Player1: null,
    Player2: null,
    game: null, 
}

// 6. render first player card and event listener for clicked attribute
const renderFirstPlayerCard = (card) => {
  const player1Div = document.createElement('div')
  player1Div.className = 'cardOne'
  player1Div.innerHTML = `
  <img src='${card.url}'</img>
  <h3>${card.name}</h3>
  <p>${card.description}</p>
    <p>attribute: ${card.attribute_1} <button data-id="attribute_1">Select</button></p>
    <p>attribute: ${card.attribute_2} <button data-id="attribute_2">Select</button></p>
    <p>attribute: ${card.attribute_3} <button data-id="attribute_3">Select</button></p>
    <p>attribute: ${card.attribute_4} <button data-id="attribute_4">Select</button></p>
    <p>attribute: ${card.attribute_5} <button data-id="attribute_5">Select</button></p>
    `
  containerDiv.append(player1Div)
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
    containerDiv.innerHTML = ''
    const winnerDiv = document.createElement('div')
    winnerDiv.className = 'cardOne'
    winnerDiv.innerHTML = `
    <img src='${card.url}'</img>
    <h3>${card.name}</h3>
    <p>${card.description}<p>
    <p data-id=${card.attribute_1}><strong>attribute:</strong> ${card.attribute_1}</p>
    <p data-id=${card.attribute_2}><strong>attribute:</strong> ${card.attribute_2}</p>
    <p data-id=${card.attribute_3}><strong>attribute:</strong> ${card.attribute_3}</p>
    <p data-id=${card.attribute_4}><strong>attribute:</strong> ${card.attribute_4}</p>
    <p data-id=${card.attribute_5}><strong>attribute:</strong> ${card.attribute_5}</p>
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
    playerOne = formEL.name.value
    formEL.name.value = ""
    formEL.innerHTML = ""
    passUserNameToDB(playerOne)
}
//3 add Event listener to form for player name
if(formEL){
formEL.addEventListener('submit', collectUserName)
}

else {
    renderFirstPlayerCard(state.pOneCards[0])
}


//5. send player to database and call for cards to render
const passUserNameToDB = (playerOne) => {
        console.log(playerOne)
        return fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName: playerOne})
        }).then(() => getCardsAndRender())
}

//6. call for cards to render and render first player 1st card 
const getCardsAndRender = () => {
    getCards().then(() => renderFirstPlayerCard(state.pOneCards[0]))
}


const renderForm = () => {
if(state.pOneCards.length == 0 || state.pTwoCards.length == 0){

formEL.innerHTML = `
<form class="add-player" style="">
<h3>Enter Player One Name</h3>
<input required id='name-input' type="text" name="name" value="" placeholder="In Here..." class="input-text">
<br>
<input type="submit" name="submit" value="Hit me" class="submit">
</form>
`
}

}

// player1Card(state.pOneCards[0])
// sendCardAndAtToServer(state.sCard, state.sCardAtP1)
// addCardWinner(card[1])