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
const player1NameContainer = document.querySelector('#player-name-1');
const player2NameContainer = document.querySelector('#player-name-2');
const player1ScoreContainer = document.querySelector('#player-1-score');
const player2ScoreContainer = document.querySelector('#player-2-score');

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
  let turns = 0;
  let gameOver = false;

  const board = createGameboard();

  // Private helper functions
  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentPlayerName = player2Name;
    } else {
      currentPlayer = player1;
      currentPlayerName = player1Name;
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
      popUpText.textContent = "The Winner is " + currentPlayerName + "!";

      //INCREASE SCORE
      currentPlayer.increaseScore();
      player1ScoreContainer.textContent = player1.getScore();
      player2ScoreContainer.textContent = player2.getScore();

    }

  };

  const nextRound = () => {
    if (!gameOver) {
      alert("This round isn't over yet!");
      return;
    }
    turns = 0;
    board.resetBoard();
    gameOver = false;
    popUpText.textContent = "";
    popUpBlock.classList.add('hidden')
    renderBoard();
    //resets the board ready for the next round

  };

  const resetGame = () => {
    board.resetBoard();
    turns = 0;
    gameOver = false;
    player1.resetScore();
    player2.resetScore();
    popUpText.textContent = "";
    popUpBlock.classList.add('hidden')
    renderBoard();
    gameScreen.classList.add('hidden')
    startScreen.classList.remove('hidden');

    // resets the entire game and returns to start screen
  };

  const playTurn = (i) => {
    if (gameOver) return;


    if (board.checkCell(i)) {
      board.setMarker(i, currentPlayer.marker);
      turns++;
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

nextRoundBtn.addEventListener("click", () => {
  gameController.nextRound();
});


popUpBtn.addEventListener("click", () => {
  popUpBlock.classList.add('hidden')
});


startBtn.addEventListener("click", () => {
  player1Name = player1Input.value.trim() || "Player 1";
  player2Name = player2Input.value.trim() || "Player 2";

  console.log("Names stored:", player1Name, player2Name);



  startScreen.classList.add('hidden')
  gameScreen.classList.remove('hidden')

  player1NameContainer.textContent = player1Name;
  player2NameContainer.textContent = player2Name;
  player1ScoreContainer.textContent = player1.getScore();
  player2ScoreContainer.textContent = player2.getScore();
});


// Clean up the interface to allow players to put in their names, 
// include a button to start/restart the game and add a display element that shows the results upon game end!

//change reset button to a "next round button"
//add a button that resets to the start screen

//add score elements


//a few things, the score doesnt increase,
//theres no indicator of who is X or O

//BIG PROBLEM, WHEN THE GAME IS "RESET" --- ENSURE THAT THE PLAYER IS SWITCHED TO PLAYER 1 GOING FIRST
//ALSO, each round, whoever won the previous round should GO FIRST

//THE SCORES ARE NOT RESETTING!!