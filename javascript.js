const container = document.querySelector("#container");
const resetGameBtn = document.querySelector("#reset-game-btn");

// Gameboard
function createGameboard() {
  let gameboard = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  const setMarker = (i, marker) => {
    gameboard.splice(i, 1, marker)
    console.log(marker + " player placed a marker at " + i)
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
    console.log("switching players...")
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };


  const checkWin = (i) => {


    const b = board.gameboard;
    const m = currentPlayer.marker;
    console.log("checking winner...")
    if (b[0] === m && b[1] === m && b[2] === m ||
      b[3] === m && b[4] === m && b[5] === m ||
      b[6] === m && b[7] === m && b[8] === m ||

      b[0] === m && b[3] === m && b[6] === m ||
      b[1] === m && b[4] === m && b[7] === m ||
      b[2] === m && b[5] === m && b[8] === m ||

      b[0] === m && b[4] === m && b[8] === m ||
      b[2] === m && b[4] === m && b[6] === m) {
      alert("The Winner is " + m)
      gameOver = true;
    }

  };

  const resetGame = () => {
    board.resetBoard();
    turns = 0;
    gameOver = false;
    renderBoard();
    // reset DOM, board and turns
  };

  const playTurn = (i) => {
    if (gameOver) return;
    console.log("playing a turn...")
    if (board.checkCell(i)) {
      board.setMarker(i, currentPlayer.marker);
      turns++;
      checkWin(i);
      switchPlayer();
    } else {
      console.log("Cell is already taken!");
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

    container.appendChild(tile)
  }
}

renderBoard();

resetGameBtn.addEventListener("click", () => {
  gameController.resetGame();
});


//to do list:
//WHEN THE GAME IS FINISHED, PAUSE ALL INPUT UNTIL GAME IS RESET

//fix the concept of scores
//create a win condition that breaks out of all looping
// FIX LOGIC, IF THE SPOT IS ALREADY TAKEN - DONT SWITCH PLAYER


//DUMMY CODE

// gameController.playTurn(0);
// console.log(gameController.board)
// console.log(gameController.currentPlayer().marker); // "X"