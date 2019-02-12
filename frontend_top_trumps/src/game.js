const cardsUrl = ('http://localhost:3000/cards')
const usersUrl = ('http://localhost:3000/users')
const gamersUrl = ('http://localhost:3000/games')


const cardElDiv = document.querySelector('.card')
const containerDiv = document.querySelector('.container')


const getCards = () => {
    return fetch(cardsUrl)
    .then(resp => resp.json())
    .then(cardData => state.cards = cardData)
}

card = [{
    id: 1,
    name: "Theresa May",
    description: "Chuck Norris's first program was kill -9.",
    url: "https://timedotcom.files.wordpress.com/2019/02/theresa-may-brexit.jpg",
            attribute_1: 87,
            attribute_2: 70,
            attribute_3: 95,
            attribute_4: 91,
            attribute_5: 6
    },
    {
        id: 2,
        name: "Donald Trump",
        description: "Chuck Norris rewrote the Google search engine from scratch.",
        url: "https://shawglobalnews.files.wordpress.com/2019/02/20508990.jpg",
            attribute_1: 20,
            attribute_2: 53,
            attribute_3: 55,
            attribute_4: 8,
            attribute_5: 24
    }
]


state = {
    pOneCards: [],
    sCard: null,
    sCardAtP1: null
}


const player1Card = (card) => {
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


const selectAttributeAndRevealCardTwo = (event) => {
    // const chosenAttP1 = 
    const selectedAt = event.target.dataset.id
    console.log(selectedAt)
    state.sCardAtP1 = selectedAt
    player2Card(card[1])
    sendCardAndAtToServer(state.sCard, selectedAt)
} 


const sendCardAndAtToServer = (sCard, selectedAt) => {
    console.log(sCard, selectedAt)
    return fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({selectedCard: sCard, selectedAttribute: selectedAt})
    }).then(resp => resp.json())
}


const player2Card = (card) => {
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




getCards()
player1Card(card[0])
sendCardAndAtToServer(state.sCard, state.sCardAtP1)