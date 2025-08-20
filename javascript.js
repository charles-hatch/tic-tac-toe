


// tic tac toe pseudo idea

//browser opens, load up empty gameboard array
//create two player objects that are stored with some info such as (a score, and their marker X or O)
//a game processor, which counts the turns, checks for reset game, etc - control game flow!


// Gameboard

// array of 9 cells

// function to set a mark

// function to check if a cell is empty

function createPlayer(marker) {
  let score = 0;
  const getScore = () => score;
  const increaseScore = () => score++;
  return { marker, getScore, increaseScore };
}

player1 = createPlayer("O");
player2 = createPlayer("X");

player1.increaseScore();
console.log(player1.getScore())
console.log(player2.getScore())


// One createPlayer(marker) factory.

// Then make two instances: player1 = createPlayer("O"), player2 = createPlayer("X").

// Players

// name

// mark (X or O)

// maybe score

// Game controller

// track current player

// function to play a turn

// function to check win

// function to switch players

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