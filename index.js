let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");

let computerCards = [];
let computerSum = 0;

let player = {
  name: "Razvan",
  chips: 100,
};

let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  isAlive = true;
  hasBlackJack = false;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;

  let computerFirstCard = getRandomCard();
  let computerSecondCard = getRandomCard();
  computerCards = [computerFirstCard, computerSecondCard];
  computerSum = computerFirstCard + computerSecondCard;

  renderGame();
}

function renderGame() {
  cardsEl.textContent = "Your Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
  sumEl.textContent = "Your Sum: " + sum;

  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "Wohoo! You've got Blackjack!";
    hasBlackJack = true;
  } else {
    message = "You're out of the game!";
    isAlive = false;
  }
  messageEl.textContent = message;
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}

function stand() {
  if (isAlive === true && hasBlackJack === false) {
    message = "You chose to stand!";
    isAlive = false;
    messageEl.textContent = message;
    computerPlay();
  }
}

function computerPlay() {
  while (computerSum < 17) { // Computer hits until it reaches 17 or higher
    let card = getRandomCard();
    computerSum += card;
    computerCards.push(card);
  }

  determineWinner();
}

function determineWinner() {
  if (sum > 21) {
    message = "You're out of the game! Computer wins.";
  } else if (computerSum > 21) {
    message = "Computer is out of the game! You win.";
  } else if (sum > computerSum) {
    message = "You win!";
  } else if (sum < computerSum) {
    message = "Computer wins!";
  } else {
    message = "It's a tie!";
  }

  messageEl.textContent = message;

  // Display computer's cards and sum
  let computerCardsEl = document.getElementById("computer-cards-el");
  let computerSumEl = document.getElementById("computer-sum-el");

  if (!computerCardsEl) {
    computerCardsEl = document.createElement("div");
    computerCardsEl.id = "computer-cards-el";
    document.body.appendChild(computerCardsEl);
  }
  computerCardsEl.textContent = "Computer Cards: " + computerCards.join(" ");

  if (!computerSumEl) {
    computerSumEl = document.createElement("div");
    computerSumEl.id = "computer-sum-el";
    document.body.appendChild(computerSumEl);
  }
  computerSumEl.textContent = "Computer Sum: " + computerSum;
}
