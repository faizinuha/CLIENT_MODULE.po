document.addEventListener('DOMContentLoaded', function() {
  // Display welcome screen and hide game screen
  document.getElementById('welcomeScreen').style.display = 'block';
  document.getElementById('gameScreen').style.display = 'none';

  // Add event listener for start game button
  document.getElementById('startGameButton').addEventListener('click', function() {
      // Get player name, opponent type, and level selection
      const playerName = document.getElementById('playerName').value.trim();
      const opponentType = document.getElementById('opponentType').value;
      const level = document.getElementById('level').value;

      // Validate player name
      if (opponentType === 'player' && playerName === '') {
          alert('Please enter your name.');
          return;
      }

      // Start the game
      if (opponentType === 'bot') {
        startGameWithBot(playerName, level);
      } else {
        startGame(playerName, opponentType, level);
      }
  });

  // Event listener for opponent type select
  document.getElementById('opponentType').addEventListener('change', function() {
      const opponentType = this.value;
      const playerNameInput = document.getElementById('playerName');
      const player2NameInput = document.getElementById('player2NameInput');

      if (opponentType === 'bot') {
          // If opponent is bot, disable player name input and hide player 2 name input
          playerNameInput.value = '';
          playerNameInput.disabled = true;
          player2NameInput.style.display = 'none';
      } else {
          // If opponent is player, enable player name input and show player 2 name input
          playerNameInput.disabled = false;
          player2NameInput.style.display = 'block';
      }
  });

  // Event listener for new game button
  document.getElementById('newGameButton').addEventListener('click', function() {
      // Reset scores
      player1Score = 0;
      player2Score = 0;

      // Reset score display
      document.getElementById('player1Score').textContent = player1Score;
      document.getElementById('player2Score').textContent = player2Score;

      // Clear leaderboard
      leaderboard = [];
      displayLeaderboard(); // Update leaderboard display

      // Start new game based on opponent type
      const opponentType = document.getElementById('opponentType').value;
      if (opponentType === 'bot') {
        startGameWithBot('', 'medium');
      } else {
        startGame('', 'player', 'medium');
      }
  });

  // Event listener for sort button
  document.getElementById('sortButton').addEventListener('click', function() {
      // Sort the leaderboard
      leaderboard.sort((a, b) => b.score - a.score);

      // Display the sorted leaderboard
      displayLeaderboard();
  });
});

let player1Score = 0;
let player2Score = 0;
let currentPlayer; // Variable to keep track of the current player
let leaderboard = []; // Array to store leaderboard data

// Function to start the game with a player
function startGame(playerName, opponentType, level) {
  // Hide welcome screen and display game screen
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';

  // Set player names
  document.getElementById('player1Name').textContent = playerName;
  document.getElementById('player2Name').textContent = document.getElementById('player2NameInput').value;

  // Set current player
  currentPlayer = 1; // Player 1 starts the game

  // Generate initial hexagons for the game board
  generateHexagons(10, 8);

  // Add event listener for hexagon clicks
  const hexagons = document.querySelectorAll('.hexagon');
  hexagons.forEach(hexagon => {
      hexagon.addEventListener('click', function() {
          if (this.style.backgroundColor !== 'black') {
              return; // Ignore if hexagon is not black
          }

          // Change color of the clicked hexagon to random color
          const color = getRandomColor();
          this.style.backgroundColor = color;

          // Update player score and turn
          if (currentPlayer === 1) {
              player1Score++;
              document.getElementById('player1Score').textContent = player1Score;
          } else {
              player2Score++;
              document.getElementById('player2Score').textContent = player2Score;
          }

          // Switch to the next player
          currentPlayer = currentPlayer === 1 ? 2 : 1;

          // Update turn display
          document.getElementById('playerTurn').textContent = currentPlayer === 1 ? "Player 1's Turn" : "Player 2's Turn";

          // Check if game is over
          if (isGameOver()) {
              endGame();
          }
      });
  });

  // Additional game initialization logic can be added here
  console.log('Game started with player:', playerName, 'Opponent:', opponentType, 'Level:', level);
}

// Function to start the game with a bot
function startGameWithBot(playerName, level) {
  // Hide welcome screen and display game screen
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';

  // Set player names
  document.getElementById('player1Name').textContent = playerName;
  document.getElementById('player2Name').textContent = 'Bot';

  // Set current player
  currentPlayer = 1; // Player 1 starts the game

  // Generate initial hexagons for the game board
  generateHexagons(10, 8);

  // Add event listener for hexagon clicks
  const hexagons = document.querySelectorAll('.hexagon');
  hexagons.forEach(hexagon => {
      hexagon.addEventListener('click', function() {
          if (this.style.backgroundColor !== 'black') {
              return; // Ignore if hexagon is not black
          }

          // Change color of the clicked hexagon to random color
          const color = getRandomColor();
          this.style.backgroundColor = color;

          // Update player score and turn
          player1Score++;
          document.getElementById('player1Score').textContent = player1Score;

          // Switch to the next player
          currentPlayer = 2; // Bot's turn

          // Update turn display
          document.getElementById('playerTurn').textContent = "Bot's Turn";

          // Simulate bot's move after a short delay (simulate thinking time)
          setTimeout(() => {
              makeBotMove(level);
          }, 1000); // Adjust the delay time as needed

          // Check if game is over
          if (isGameOver()) {
              endGame();
          }
      });
  });

  // Additional game initialization logic can be added here
  console.log('Game started with player:', playerName, 'Opponent: Bot', 'Level:', level);
}


// Generate hexagons for the game board
function generateHexagons(rows, cols) {
  const gameBoard = document.querySelector('.game-board');
  gameBoard.innerHTML = '';

  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
          const hexagon = document.createElement('div');
          hexagon.classList.add('hexagon');
          hexagon.style.backgroundColor = 'black'; // Initial color is black
          gameBoard.appendChild(hexagon);
      }
  }
}

// Check if the game is over
function isGameOver() {
  // Define your game over condition here
  return player1Score + player2Score === 80; // For example, if there are 80 hexagons on the board
}

// Function to end the game
// Function to end the game
// Function to end the game
function endGame() {
  // Display game over message or perform any other actions
  if (player1Score > player2Score) {
      alert('Game Over! You Win!');
  } else if (player1Score < player2Score) {
      alert('Game Over! Bot Wins!');
  } else {
      alert('Game Over! It\'s a Tie!');
  }

  // Add players and their scores to the leaderboard
  addToLeaderboard();

  // Display the leaderboard
  displayLeaderboard();
}


// Function to add players and their scores to the leaderboard
function addToLeaderboard() {
  leaderboard.push({ name: document.getElementById('player1Name').textContent, score: player1Score });
  leaderboard.push({ name: document.getElementById('player2Name').textContent, score: player2Score });
}

// Function to display the leaderboard
function displayLeaderboard() {
  const leaderboardList = document.getElementById('leaderboardList');
  leaderboardList.innerHTML = '';

  leaderboard.forEach((player, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. ${player.name} - ${player.score}`;
      leaderboardList.appendChild(listItem);
  });
}

// Function to make a move for the bot
function makeBotMove(level) {
  // Simulate bot move based on the selected level
  // You can implement bot logic based on the chosen level
  // For simplicity, let's just randomly select a black hexagon and change its color
  const blackHexagons = document.querySelectorAll('.hexagon[style="background-color: black;"]');
  const randomHexagonIndex = Math.floor(Math.random() * blackHexagons.length);
  const randomHexagon = blackHexagons[randomHexagonIndex];
  const color = getRandomColor();
  randomHexagon.style.backgroundColor = color;

  // Update bot's score
  player2Score++;
  updateScoreDisplay();
}

// Function to update the score display
function updateScoreDisplay() {
  document.getElementById('player1Score').textContent = player1Score;
  document.getElementById('player2Score').textContent = player2Score;
}

// Function to generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to add hover effect to hexagons
function addHoverEffect() {
  const hexagons = document.querySelectorAll('.hexagon');
  hexagons.forEach(hexagon => {
      hexagon.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.1)';
      });
      hexagon.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
      });
  });
}

// Call the addHoverEffect function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  addHoverEffect();
});

function Lestgo() {
  alert('');
  addHoverEffect();
}
