const symbols = ["😀", "😂", "😊", "😎", "😍", "🥰", "😘", "😜", "😇", "😉"];
const cards = [...symbols, ...symbols];
let flippedCards = [];
let matches = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const gameBoard = document.getElementById("game-board");
  shuffle(cards).forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", index);

    const frontFace = document.createElement("div");
    frontFace.classList.add("front-face");

    const backFace = document.createElement("div");
    backFace.classList.add("back-face");

    const img = document.createElement("img");
    img.src = "cherries.png"; // Menyembunyikan emoji
    img.style.width = "100px"; // Atur lebar gambar
    img.style.height = "100px"; // Atur tinggi gambar
    backFace.appendChild(img);

    card.appendChild(frontFace);
    card.appendChild(backFace);

    card.addEventListener("click", flipCard);

    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flip")) {
    this.classList.add("flip");
    flippedCards.push(this);
  }

  if (flippedCards.length === 2) {
    setTimeout(checkForMatch, 1000);
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const index1 = parseInt(card1.getAttribute("data-index"));
  const index2 = parseInt(card2.getAttribute("data-index"));

  if (cards[index1] === cards[index2]) {
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    matches++;
    if (matches === symbols.length) {
      alert("Congratulations! You have won the game!");
    }
  } else {
    card1.classList.remove("flip");
    card2.classList.remove("flip");
  }

  flippedCards = [];
}

createBoard();
