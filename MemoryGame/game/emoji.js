const tilesContainer = document.querySelector(".tiles");
let level = 1;

function startGame(level) {
  let tileCount;
  let additionalBlocks;
  let additionalColors = []; // Menyimpan emoji tambahan untuk blok tambahan

  if (level === 1) {
    tileCount = 16;
    additionalBlocks = 0; // Tidak ada blok tambahan di level 1
  } else if (level === 2) {
    tileCount = 18;
    additionalBlocks = 2; // Dua blok tambahan di level 2
    additionalColors = ["🍎", "🥦"]; // Emoji tambahan untuk level 2
  } else if (level === 3) {
    tileCount = 20;
    additionalBlocks = 4; // Empat blok tambahan di level 3
    additionalColors = ["🍋", "🍊", "🍇", "💖"]; // Emoji tambahan untuk level 3
  } else if (level === 4) {
    tileCount = 25;
    additionalBlocks = 9; // Sembilan blok tambahan di level 4
    additionalColors = [
      "🍎",
      "🌑",
      "🏖️",
      "⚓",
      "🍋",
      "⚪",
      "🍊",
      "🥦",
      "🍇"
    ]; // Emoji tambahan untuk level 4
  } else if (level === 5) {
    tileCount = 30;
    additionalBlocks = 15; // Empat belas blok tambahan di level 5
    additionalColors = [
        "🔵",
        "🟣",
        "🟢",
        "🟦",
        "🧡",
        "🔶",
        "🟤",
        "🟡",
        "🟪",
        "🟨",
        "🌈",
        "🟫",
        "🐟",
        "🦩"
    ];
} else if(level === 6){
    alert('Selamat! Anda menyelesaikan level 6!');
    // Kembali ke halaman utama setelah menyelesaikan level 5
    window.location.href = '../index.html'; // Ganti 'home.html' dengan URL halaman utama Anda
    return; // Menghentikan eksekusi fungsi startGame setelah menyelesaikan level 5
} else {
  tileCount = 25;
  additionalBlocks = 0; // Default to no additional blocks for levels beyond 4
}
    
  const emojis = [
    "😀",
    "😂",
    "😎",
    "😍",
    "🥳",
    "😜",
    "🤑",
    "🤩",
  ];
  let emojisPicklist = [...emojis, ...emojis];

  // Tambahkan emoji tambahan untuk blok tambahan
  for (let i = 0; i < additionalColors.length; i++) {
    emojisPicklist.push(additionalColors[i]);
  }

  // Game state
  let revealedCount = 0;
  let activeTile = null;
  let awaitingEndOfMove = false;

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

      // Reveal this emoji
      element.innerHTML = emoji;

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
        activeTile.innerHTML = '';
        element.innerHTML = '';

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

  // Fungsi blok baru
  function newBlockFunction() {
    // Kode untuk fungsi blok baru
  }

  // Panggil fungsi blok baru
  newBlockFunction();
}

// Mulai permainan dengan level 1-6
startGame(level);
