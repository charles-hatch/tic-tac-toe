const container = document.querySelector("#container");
const resetGameBtn = document.querySelector("#reset-game-btn");
const popUpBlock = document.querySelector('#popup')

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
  return { marker, getScore, increaseScore };
}



//Game Controller
const gameController = (function () {
  player1 = createPlayer("O");
  player2 = createPlayer("X");
  let currentPlayer = player1;
  let turns = 0;
  let gameOver = false;

  const board = createGameboard();

  // Private helper functions
  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
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
      popUpBlock.textContent = "The Winner is " + m + "!";

    }

  };

  const resetGame = () => {
    board.resetBoard();
    turns = 0;
    gameOver = false;
    popUpBlock.textContent = "";
    popUpBlock.classList.add('hidden')
    renderBoard();
    // reset DOM, board and turns
  };

  const playTurn = (i) => {
    if (gameOver) return;
    if (board.checkCell(i)) {
      board.setMarker(i, currentPlayer.marker);
      turns++;
      checkWin(i);
      switchPlayer();
    } else {
    }
  };

  // Public methods
  return {
    playTurn,
    resetGame,
    currentPlayer: () => currentPlayer,
    board
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


// Clean up the interface to allow players to put in their names, 
// include a button to start/restart the game and add a display element that shows the results upon game end!