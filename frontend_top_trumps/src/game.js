const mainUrl = "http://localhost:3000";
const cardsUrl = `${mainUrl}/random`;
const usersUrl = `${mainUrl}/users`;
const gamersUrl = `${mainUrl}/games`;
const stateUrl = `${mainUrl}/state`;
const stateUpdateUrl = `${mainUrl}/state/update`;
const randomUrl = `${mainUrl}/random`;
const player1Url = `${mainUrl}/player/1`;
const player2Url = `${mainUrl}/player/2`;
let interval = null;

const cardElDiv = document.querySelector(".card");
const containerDiv = document.querySelector(".container");
const formEL = document.querySelector(".add-player");
const formElement = document.createElement("form");
const opponentEl = document.createElement("div");
const cardTwoEL = document.querySelector("cardTwo");
const cardTwoDiv = document.createElement("div");
const player1Div = document.createElement("div");

//action cable websocket var definition
// const ActionCable = require("actioncable");

const cable = ActionCable.createConsumer("ws://localhost:3000/acgame");

const gameRoom = cable.subscriptions.create("GameChannel", {
   received: function(data) {
      const alert = document.createElement("h1");
      alert.innerText = data;
      containerDiv.appendChild(alert);
      console.log(data);
   },
   connected: () => {
      console.log("we're connected!");
   },
});

// const socket = new WebSocket("ws://localhost:3000/acgame");
// socket.onopen = () => {
//    const msg = {
//       command: "subscribe",
//       identifier: JSON.stringify({
//          channel: "GameChannel",
//       }),
//    };

//    socket.send(JSON.stringify(msg));
// };
// socket.onmessage = evnt => {
//    const msg = JSON.parse(evnt.data);
//    if (msg.type === "ping") {
//       return;
//    }
//    console.log(msg);
// };

//1. get request for cards
const getCards = () => {
   return fetch(randomUrl)
      .then(resp => resp.json())
      .then(cardData => (state.pOneCards = cardData));
};

//2. send card back to server to start game
const initGame = card => {
   return fetch(gamersUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         p1_card_id: state.pOneCards[0].id,
         round_id: state.round,
      }),
   });
};

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
   playerOne: null,
   playerTwo: null,
   game: null,
   round: 1,
   turn: null,
   winnerCardId: null,
};
// 6. render first player card and event listener for clicked attribute
const renderFirstPlayerCard = card => {
   cardTwoDiv.className = "cardTwo";
   cardTwoDiv.innerHTML = `
    <h3> ??? </h3>`;
   opponentEl.className = "";
   opponentEl.innerHTML = "";
   player1Div.className = "cardOne";
   player1Div.innerHTML = `
  <img src='${card.url}'</img>
  <h3>${card.name}</h3>
    <p>Ridiculousness: ${card.attribute_1} ${
      state.turn == true ? '<button data-id="attribute_1">Select</button>' : ""
   } </p>
    <p>Cup Size: ${card.attribute_2} ${
      state.turn == true ? '<button data-id="attribute_2">Select</button>' : ""
   } </p>
    <p>Dancing: ${card.attribute_3} ${
      state.turn == true ? '<button data-id="attribute_3">Select</button>' : ""
   } </p>
    <p>HairStyle: ${card.attribute_4} ${
      state.turn == true ? '<button data-id="attribute_4">Select</button>' : ""
   } </p>
    <p>Start Nuclear War: ${card.attribute_5} ${
      state.turn == true ? '<button data-id="attribute_5">Select</button>' : ""
   } </p>
    `;
   containerDiv.append(player1Div);
   containerDiv.append(cardTwoDiv);
   player1Div.addEventListener("click", sendAttributeToServer);
   state.sCard = card;
   if (state.turn === false) {
      waitForResponse();
   }
};
// wait for response
const waitForResponse = () => {
   interval = window.setInterval(checkForChanges, 500);
};

const checkForChanges = () => {
   return fetch(stateUrl)
      .then(resp => resp.json())
      .then(jso => {
         if (jso.winner_card_id) {
            clearInterval(interval);
            state.winnerCardId = jso.winner_card_id;
         }
      });
};
//7. It renders the second players card and passes the server the whole card object and the card attribute value.
const sendAttributeToServer = event => {
   // const chosenAttP1 =
   const selectedAt = event.target.dataset.id;
   state.sCardAtP1 = selectedAt;
   sendCardAndAtToServer(state.sCard, selectedAt);
};
//9. the selected card and the chosen attribute are passed to the server
const sendCardAndAtToServer = (sCard, selectedAt) => {
   console.log(sCard, selectedAt);
   return fetch(stateUpdateUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         selectedCard: sCard.id,
         attr_name: selectedAt,
         round_id: state.round,
      }),
   }).then(resp => resp.json());
};

const displayWinnerCard = card => {
   const winnerDiv = document.createElement("div");
   cardTwoDiv.className = "";
   cardTwoDiv.innerHTML = "";
   player1Div.innerHTML = "";
   player1Div.className = "";
   winnerDiv.className = "winnerCard";
   winnerDiv.innerHTML = `
    <img src='${card.url}'</img>
    <h3>${card.name}</h3>
    <p data-id=${card.attribute_1}><strong>Ridiculousness:</strong> ${
      card.attribute_1
   }</p>
    <p data-id=${card.attribute_2}><strong>Cup Size:</strong> ${
      card.attribute_2
   }</p>
    <p data-id=${card.attribute_3}><strong>Dancing:</strong> ${
      card.attribute_3
   }</p>
    <p data-id=${card.attribute_4}><strong>HairStyle:</strong> ${
      card.attribute_4
   }</p>
    <p data-id=${card.attribute_5}><strong>Start Nuclear War:</strong> ${
      card.attribute_5
   }</p>
  `;
   containerDiv.append(winnerDiv);
};
const getWinnerCard = attribute => {
   return fetch(`${gamersUrl}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attr: `${attribute}` }),
   })
      .then(resp => resp.json())
      .then((card = displayWinnerCard(card)));
};
const addCardWinner = card => {
   //Loser Card is Given
   id = card.id;
   //Find the losers card in the players deck
   foundCard = state.pOneCards.find(card => card.id == id);
   if (foundCard) {
      //Ptwo is winner
      state.pTwoCards.unshift(card);
      state.pOneCards.shift();
      state.pTwoCards.push(state.pTwoCards.splice(0, 1)[0]);
      state.pTwoCards.push(state.pTwoCards.splice(0, 1)[0]);
   } else {
      //POne is winner
      state.pOneCards.unshift(state.pTwoCards[0]);
      state.pTwoCards.shift();
      state.pOneCards.push(state.pOneCards.splice(0, 1)[0]);
      state.pOneCards.push(state.pOneCards.splice(0, 1)[0]);
   }
};
//8.
const renderSecondPlayerCard = card => {
   const player2Div = document.createElement("div");
   player2Div.className = "cardOne";
   player2Div.innerHTML = `
    <img src='${card.url}'</img>
    <h3>${card.name}</h3>
    <p>${card.description}<p>
      <p data-id=${card.attribute_1}><strong>attribute:</strong> ${
      card.attribute_1
   }</p>
      <p data-id=${card.attribute_2}><strong>attribute:</strong> ${
      card.attribute_2
   }</p>
      <p data-id=${card.attribute_3}><strong>attribute:</strong> ${
      card.attribute_3
   }</p>
      <p data-id=${card.attribute_4}><strong>attribute:</strong> ${
      card.attribute_4
   }</p>
      <p data-id=${card.attribute_5}><strong>attribute:</strong> ${
      card.attribute_5
   }</p>
    `;
   containerDiv.append(player2Div);
};
// first check of state pre game
const checkState = () => {
   return fetch(stateUrl)
      .then(resp => resp.json())
      .then(jso => {
         if (jso) {
            state.playerOne = jso.p1_id;
         }
      });
};
//4 collect player name and send it to the database
const collectUserName = event => {
   event.preventDefault();
   playerOne = formElement.name.value;
   checkState().then(() => passUserNameToDB(playerOne));
   formElement.name.value = "";
   formElement.innerHTML = "";
};
//5. send player to database and call for cards to render
const passUserNameToDB = player => {
   console.log(player);
   if (state.playerOne) {
      return fetch(gamersUrl, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ player_two_name: player }),
      })
         .then(resp => resp.json())
         .then(jso => {
            state.playerTwo = jso.p2_id;
            state.game = jso.game_id;
            state.turn = !jso.turn;
            state.round = jso.id;
            getCardsAndRender();
         });
   } else {
      return fetch(gamersUrl, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ player_one_name: player }),
      })
         .then(resp => resp.json())
         .then(jso => {
            // debugger
            state.playerOne = jso.p1_id;
            state.round = jso.id;
            waitingForOp();
         });
   }
};
const waitingForOp = () => {
   formEL.className = "";
   opponentEl.className = "wait";
   opponentEl.innerHTML = `
    <h3>Waiting For Opponent...</h3>
    `;
   containerDiv.append(opponentEl);
   pingServer();
};
const pingServer = () => {
   interval = window.setInterval(isPlayerReady, 500);
};
const stopPing = () => {
   clearInterval(interval);
};
const isPlayerReady = () => {
   return fetch(stateUrl)
      .then(resp => resp.json())
      .then(jso => {
         // debugger
         if (jso.p2_id) {
            state.playerTwo = jso.p2_id;
            state.game = jso.game_id;
            state.round = jso.id;
            state.turn = jso.turn;
         }
      })
      .then(() => {
         if (state.game) {
            stopPing();
            getCardsAndRender();
         }
      });
};
//6. call for cards to render and render first player 1st card
const getCardsAndRender = () => {
   getCards().then(() => renderFirstPlayerCard(state.pOneCards[0]));
};
// const checkState
const renderForm = () => {
   formElement.class = "add-player-form";
   formElement.innerHTML = `
<h3>Enter Your Name Loser</h3>
<input required id='name-input' type="text" name="name" value="" placeholder="In here dufus..." class="input-text">
<br><br>
<input type="submit" name="submit" value="Hit me to play" class="submit">
`;
   formEL.append(formElement);
   formEL.addEventListener("submit", collectUserName);
};

// player1Card(state.pOneCards[0])
// sendCardAndAtToServer(state.sCard, state.sCardAtP1)
// addCardWinner(card[1])
const init = () => {
   renderForm();
};
init();
