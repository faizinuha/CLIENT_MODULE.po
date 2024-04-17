const tilesContainer = document.querySelector(".tiles");
let level = 1;
let timer;

function startGame(level) {
  let tileCount;
  let additionalBlocks;
  let additionalColors = []; // Menyimpan warna tambahan untuk blok tambahan

  if (level === 1) {
    tileCount = 16;
    additionalBlocks = 0; // Tidak ada blok tambahan di level 1
  } else if (level === 2) {
    tileCount = 18;
    additionalBlocks = 2; // Dua blok tambahan di level 2
    additionalColors = ["red", "green"]; // Warna tambahan untuk level 2
  } else if (level === 3) {
    tileCount = 20;
    additionalBlocks = 4; // Empat blok tambahan di level 3
    additionalColors = ["yellow", "orange", "purple", "pink"]; // Warna tambahan untuk level 3
  } else if (level === 4) {
    tileCount = 25;
    additionalBlocks = 9; // Sembilan blok tambahan di level 4
    additionalColors = [
      "red",
      "grey",
      "turquoise",
      "navy",
      "yellow",
      "white",
      "orange",
      "green",
      "purple",
    ]; // Warna tambahan untuk level 4
  } else if (level === 5) {
    tileCount = 30;
    additionalBlocks = 15; // Empat belas blok tambahan di level 5
    additionalColors = [
      "cyan",
      "magenta",
      "lime",
      "indigo",
      "coral",
      "silver",
      "maroon",
      "olive",
      "orchid",
      "sienna",
      "skyblue",
      "peru",
      "salmon",
      "slateblue",
    ];
  } else if (level === 6) {
    alert("Selamat! Anda menyelesaikan level 6!");
    // Kembali ke halaman utama setelah menyelesaikan level 5
    window.location.href = "../index.html"; // Ganti 'home.html' dengan URL halaman utama Anda
    return; // Menghentikan eksekusi fungsi startGame setelah menyelesaikan level 5
  } else {
    tileCount = 25;
    additionalBlocks = 0; // Default to no additional blocks for levels beyond 4
  }

  const colors = [
    "aqua",
    "aquamarine",
    "crimson",
    "blue",
    "dodgerblue",
    "gold",
    "greenyellow",
    "teal",
  ];
  let colorsPicklist = [...colors, ...colors];

  // Tambahkan warna tambahan untuk blok tambahan
  for (let i = 0; i < additionalColors.length; i++) {
    colorsPicklist.push(additionalColors[i]);
  }

  // Game state
  let revealedCount = 0;
  let activeTile = null;
  let awaitingEndOfMove = false;

  function buildTile(color) {
    const element = document.createElement("div");

    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {
      const revealed = element.getAttribute("data-revealed");

      if (awaitingEndOfMove || revealed === "true" || element == activeTile) {
        return;
      }

      // Reveal this color
      element.style.backgroundColor = color;

      if (!activeTile) {
        activeTile = element;

        return;
      }

      const colorToMatch = activeTile.getAttribute("data-color");

      if (colorToMatch === color) {
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
        activeTile.style.backgroundColor = null;
        element.style.backgroundColor = null;

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
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
    const color = colorsPicklist[randomIndex];
    const tile = buildTile(color);

    colorsPicklist.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);
  }

  // Fungsi blok baru
  function newBlockFunction() {
    // Kode untuk fungsi blok baru
  }

  // Panggil fungsi blok baru
  newBlockFunction();
}
// Mulai permainan dengan level 4
startGame(level);
