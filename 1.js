const tilesContainer = document.querySelector(".tiles");
let level = 1;

function startGame(level) {
    const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];
    const colorsPicklist = [...colors, ...colors];
    const tileCount = colorsPicklist.length + (level * 4); // Increase tile count with each level

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

            if (
                awaitingEndOfMove
                || revealed === "true"
                || element == activeTile
            ) {
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

    // Build up tiles
    for (let i = 0; i < tileCount; i++) {
        const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
        const color = colorsPicklist[randomIndex];
        const tile = buildTile(color);

        colorsPicklist.splice(randomIndex, 1);
        tilesContainer.appendChild(tile);
    }
}

// Start the game with level 1
startGame(level);

