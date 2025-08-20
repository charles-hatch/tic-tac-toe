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
  // function to set a mark -- change array at index i, to "marker"

  const checkCell = (i) => {
    if (gameboard[i] === "") {
      return true;
    } else return false;
  }
  // function to check if a cell is empty 

  return { gameboard, setMarker, checkCell};
}

// Players
function createPlayer(marker) {
  let score = 0;
  const getScore = () => score;
  const increaseScore = () => score++;
  return { marker, getScore, increaseScore };
}
player1 = createPlayer("O");
player2 = createPlayer("X");


function gameController(){

}

const gameController = (function () {
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const div = (a, b) => a / b;
  return { add, sub, mul, div };
})();
// Game controller:
// track current player
// function to play a turn
// function to check win
// function to switch players
//a game processor, which counts the turns, checks for reset game, etc - control game flow!




//how to use our factory function objects
player1.increaseScore();
console.log(player1.getScore())
console.log(player2.getScore())





// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! 
// Your players are also going to be stored in objects, and you’re 
// probably going to want an object to control the flow of the game itself.

// Your main goal here is to have as little global code as possible. 
// Try tucking as much as you can inside factories.
//  If you only need a single instance of something (e.g. the gameboard, the displayController etc.)
//  then wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.

// In this project, think carefully about where each bit of logic should reside. 
// Each little piece of functionality should be able to fit in the game, player or gameboard objects. 
// Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!
// If you’re having trouble,
//  Building a house from the inside out is a great article that lays out a highly applicable example both of
//  how you might approach tackling this project as well as how you might organize and structure your code.