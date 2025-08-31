const container = document.querySelector("#container");
const gameScreen = document.querySelector('#game-screen');
const startScreen = document.querySelector('#start-screen')
const resetGameBtn = document.querySelector("#reset-game-btn");
const nextRoundBtn = document.querySelector('#next-round-btn');
const popUpBtn = document.querySelector('#popup-btn')
const startBtn = document.querySelector('#start-btn')
const popUpBlock = document.querySelector('#popup')
const popUpText = document.querySelector('#popup-text')
const player1Input = document.querySelector('#player1');
const player2Input = document.querySelector('#player2');
const player1ScoreContainer = document.querySelector('#player-1-score');
const player2ScoreContainer = document.querySelector('#player-2-score');
const playerTurnsDisplay = document.querySelector('#turns-counter');
const playerRoundsDisplay = document.querySelector('#rounds-counter');
const player1NameContainer = document.querySelector('#player1-name-container')
const player2NameContainer = document.querySelector('#player2-name-container')
const currentPlayerDisplay = document.querySelector("#current-player-display");
//query seletors

let player1Name = "Player 1";
let player2Name = "Player 2";


// Gameboard
function createGameboard() {
  let gameboard = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  const setMarker = (i, marker) => {
    gameboard.splice(i, 1, marker)
  }
  //Function to splice in our player's marker

  const checkCell = (i) => {
    if (gameboard[i] === "") {
      return true;
    } else return false;
  }
  // function to check if a cell is empty 

  const resetBoard = () => {
    for (let i = 0; i < gameboard.length; i++) {
      gameboard[i] = "";
    }
  }

  return { gameboard, setMarker, checkCell, resetBoard };
}



// Players
function createPlayer(marker) {
  let score = 0;
  const getScore = () => score;
  const increaseScore = () => score++;
  const resetScore = () => { score = 0; };
  return { marker, getScore, increaseScore, resetScore };
}



//Game Controller
const gameController = (function () {
  player1 = createPlayer("O");
  player2 = createPlayer("X");
  let currentPlayer = player1;
  let currentPlayerName = player1Name;
  let turns = 1;
  let rounds = 1;
  let gameOver = false;
  let gameEnd = false;
  const board = createGameboard();

  const showWinnerEffect = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentPlayerName = player2Name;
      currentPlayerDisplay.textContent = currentPlayerName + "'s Turn.";
    } else {
      currentPlayer = player1;
      currentPlayerName = player1Name;
      currentPlayerDisplay.textContent = currentPlayerName + "'s Turn.";
    }
  };
  const checkWin = (i) => {
    const b = board.gameboard;
    const m = currentPlayer.marker;
    if (b[0] === m && b[1] === m && b[2] === m ||
      b[3] === m && b[4] === m && b[5] === m ||
      b[6] === m && b[7] === m && b[8] === m ||

      b[0] === m && b[3] === m && b[6] === m ||
      b[1] === m && b[4] === m && b[7] === m ||
      b[2] === m && b[5] === m && b[8] === m ||

      b[0] === m && b[4] === m && b[8] === m ||
      b[2] === m && b[4] === m && b[6] === m) {
      gameOver = true;
      popUpBlock.classList.remove('hidden')
      popUpText.textContent = "The Winner of this round is " + currentPlayerName + "!";
      showWinnerEffect();
      currentPlayer.increaseScore();
      player1ScoreContainer.textContent = "Score : " + player1.getScore();
      player2ScoreContainer.textContent = "Score : " + player2.getScore();
      //increase score and update display if win
    }
    checkGameWinner();

  };

  const checkGameWinner = () => {
    if (currentPlayer.getScore() >= 5) {
      endGame();
    } else return;
  };

  const endGame = () => {
    gameEnd = true;
    gameOver = true;
    popUpBlock.classList.remove('hidden');
    popUpText.textContent = currentPlayerName + " wins the match!";
    showWinnerEffect();
  };

  const nextRound = () => {
    if (!gameOver) {
      popUpBlock.classList.remove('hidden');
      popUpText.textContent = "Round isn't over yet!";
      return;
    }
    if (gameEnd) return;
    turns = 1;
    rounds++;
    playerRoundsDisplay.textContent = "Round " + rounds;
    playerTurnsDisplay.textContent = "Turn 1";
    board.resetBoard();
    gameOver = false;
    popUpText.textContent = "";
    popUpBlock.classList.add('hidden')
    renderBoard();
    //resets board for the next round

  };

  const resetGame = () => {
    board.resetBoard();
    turns = 1;
    rounds = 1;
    gameOver = false;
    gameEnd = false;
    player1.resetScore();
    player2.resetScore();
    popUpText.textContent = "";
    popUpBlock.classList.add('hidden')
    renderBoard();
    gameScreen.classList.add('hidden')
    startScreen.classList.remove('hidden');
    currentPlayer = player1;
    currentPlayerName = player1Name;
    currentPlayerDisplay.textContent = currentPlayerName + "'s Turn.";
    document.getElementById("player-form").reset();
    // resets game and return to start screen
  };

  const playTurn = (i) => {
    if (gameOver) return;

    if (board.checkCell(i)) {
      board.setMarker(i, currentPlayer.marker);
      turns++;
      playerTurnsDisplay.textContent = "Turn " + turns;
      checkWin(i);
      switchPlayer();
    }
    if (!gameOver && turns === 9) {
      gameOver = true;
      popUpBlock.classList.remove('hidden');
      popUpText.textContent = "It's a draw!";
    }

  };


  // Public methods
  return {
    playTurn,
    resetGame,
    nextRound,
    currentPlayer: () => currentPlayer,
    currentPlayerName: () => currentPlayerName,
    board,
  };

})();

function renderBoard() {
  container.innerHTML = '';
  for (let i = 0; i < gameController.board.gameboard.length; i++) {
    const tile = document.createElement("div");
    tile.classList.add('tile');
    const marker = gameController.board.gameboard[i];
    if (marker !== "") {
      tile.textContent = marker;
    }

    tile.addEventListener("click", () => {
      gameController.playTurn(i)
      renderBoard()
    });
    container.appendChild(tile);
  }
}

renderBoard();


resetGameBtn.addEventListener("click", () => {
  gameController.resetGame();
});

nextRoundBtn.addEventListener("click", () => {
  gameController.nextRound();
});


popUpBtn.addEventListener("click", () => {
  popUpBlock.classList.add('hidden')
});

document.getElementById("player-form").addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload
  if (e.target.checkValidity()) {
    player1Name = player1Input.value.trim() || "Player 1";
    player2Name = player2Input.value.trim() || "Player 2";
    //Store Input Names

    startScreen.classList.add('hidden')
    gameScreen.classList.remove('hidden')
    player1NameContainer.textContent = player1Name;
    player2NameContainer.textContent = player2Name;
    player1ScoreContainer.textContent = "Score : 0";
    player2ScoreContainer.textContent = "Score : 0";
    playerRoundsDisplay.textContent = "Round 1";
    playerTurnsDisplay.textContent = "Turn 1"
    currentPlayerDisplay.textContent = player1Name + "'s Turn.";
    //setup our initial text display

  } else {
    e.target.reportValidity(); // show native validation messages
  }
});



//TO DO POLISH

//Eliminate globals (let player1, player2).

// Remove currentPlayerName duplication.

// Extract renderScores().

// Convert checkWin to loop win patterns.