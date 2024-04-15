const tilesContainer = document.querySelector(".tiles");
let level = 1;

function startGame(level) {
  let tileCount;
  let additionalBlocks;
  let additionalEmojis = []; 

  // Menentukan jumlah blok dan emoji tambahan berdasarkan level
  if (level === 1) {
    tileCount = 16;
    additionalBlocks = 0;
  } else if (level === 2) {
    tileCount = 18;
    additionalBlocks = 2;
    additionalEmojis = ["🍎", "🥦"];
  } else if (level === 3) {
    tileCount = 20;
    additionalBlocks = 4;
    additionalEmojis = ["🍋", "🍊", "🍇", "💖"];
  } else if (level === 4) {
    tileCount = 25;
    additionalBlocks = 9;
    additionalEmojis = ["🍎", "🌑", "🏖️", "⚓", "🍋", "⚪", "🍊", "🥦", "🍇"];
  } else if (level === 5) {
    tileCount = 30;
    additionalBlocks = 15;
    additionalEmojis = ["🔵", "🟣", "🟢", "🟦", "🧡", "🔶", "🟤", "🟡", "🟪", "🟨", "🌈", "🟫", "🐟", "🦩"];
  } else if (level === 6) {
    alert('Selamat! Anda menyelesaikan level 6!');
    window.location.href = '../index.html'; // Mengarahkan kembali ke halaman utama setelah menyelesaikan level 6
    return;
  } else {
    tileCount = 25;
    additionalBlocks = 0;
  }
  
  const emojis = ["😀", "😂", "😎", "😍", "🥳", "😜", "🤑", "🤩"];
  let emojisPicklist = [...emojis, ...emojis, ...additionalEmojis];

  // Game state
  let revealedCount = 0;
  let activeTile = null;
  let awaitingEndOfMove = false;

  // Fungsi untuk membangun tile
  function buildTile(emoji) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-emoji", emoji);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {
      const revealed = element.getAttribute("data-revealed");

      if (awaitingEndOfMove || revealed === "true" || element == activeTile) {
        return;
      }

      // Reveal emoji
      element.textContent = emoji;

      if (!activeTile) {
        activeTile = element;
        return;
      }

      const emojiToMatch = activeTile.getAttribute("data-emoji");

      if (emojiToMatch === emoji) {
        element.setAttribute("data-revealed", "true");
        activeTile.setAttribute("data-revealed", "true");

        activeTile = null;
        awaitingEndOfMove = false;
        revealedCount += 2;

        if (revealedCount === tileCount) {
          alert(`Level ${level} completed!`);
          level++;
          startGame(level); // Start next level
        }

        return;
      }

      awaitingEndOfMove = true;

      setTimeout(() => {
        activeTile.textContent = '';
        element.textContent = '';

        awaitingEndOfMove = false;
        activeTile = null;
      }, 1000);
    });

    return element;
  }

  // Clear previous tiles
  tilesContainer.innerHTML = "";

  // Bangun tiles
  for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * emojisPicklist.length);
    const emoji = emojisPicklist[randomIndex];
    const tile = buildTile(emoji);

    emojisPicklist.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);
  }
}

// Mulai permainan dengan level 1
startGame(level);
