const player = {
  name: "Razvan",
  chips: 100,
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;

const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");

playerEl.textContent = `${player.name}: $${player.chips}`;

function getRandomCard() {
  const randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10; // Jack, Queen, King are worth 10
  } else if (randomNumber === 1) {
    return 11; // Ace is initially worth 11
  } else {
    return randomNumber;
  }
}

function startGame() {
  isAlive = true;
  hasBlackJack = false;
  const firstCard = getRandomCard();
  const secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
}

function renderGame() {
  cardsEl.textContent = "Cards: " + cards.join(" ");
  sumEl.textContent = "Sum: " + sum;

  if (sum <= 20) {
    messageEl.textContent = "Do you want to draw a new card?";
  } else if (sum === 21) {
    messageEl.textContent = "Wohoo! You've got Blackjack!";
    hasBlackJack = true;
  } else {
    messageEl.textContent = "You're out of the game!";
    isAlive = false;
  }
}

function newCard() {
  if (isAlive && !hasBlackJack) {
    const card = getRandomCard();
    cards.push(card);
    sum += card;

    // Adjust for Ace value if sum exceeds 21
    if (sum > 21) {
      for (let i = 0; i < cards.length; i++) {
        if (cards[i] === 11) {
          cards[i] = 1;
          sum -= 10;
          break;
        }
      }
    }

    renderGame();
  }
}
