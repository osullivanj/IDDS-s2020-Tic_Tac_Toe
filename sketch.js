/*
 * Tic tac toe game for AI/ML
 *
 * by Jamie O'Sullivan & Mickey Barron Summer 2020
 *
 * Based On:
 *
 * Daniel Shiffman
 * https://thecodingtrain.com/CodingChallenges/149-tic-tac-toe.html
 * https://youtu.be/GTWrWM1UsnA
 * https://editor.p5js.org/codingtrain/sketches/5JngATm3c
 *
 *           INSTRUCTIONS
 *
 * - Write your AI in the ai.js file
 * - Don't edit this file.
 * - You may refer to this file to see how the game wssorks,
 *    but you don't have to worry about it.
 * - The AI takes one turn at a time.
 * - The AI is invoked when the game calls the aiSelect() function.
 * - The aiSelect() function returns the number of which cell to mark, 0-8:
 *
 *     0 | 1 | 2
 *    -----------
 *     3 | 4 | 5
 *    -----------
 *     6 | 7 | 8
 *
 * - The AI may NOT edit the game state in any way.
 * - The AI MUST return 0-8 from aiSelect (that is the only way to play the
 * game)
 * - The AI may look at the game state variables: board, gridSize, etc, but not
 * change them.
 *
 * - The game is 2-dimensional, but the board is stored a 1-dimensional array,
 * using the cell numbers above.
 * - If you want to think about the board as 2D, we provided a function board2d
 * to provide a 2d interface to it.
 * - Each cell of the board is either 'X', 'O', or '', where empty string means
 * the cell is empty.
 */

var board = [];
var players = ['X', 'O'];
var gridSize = 3;
var canvasWidth = 500;
var canvasHeight = canvasWidth;
var columnWidth = canvasWidth / gridSize;
var rowHeight = canvasHeight / gridSize;
var winStatus = '';
var player;

// Whenever the Spacebar is pressed, the AI takes a turn
function keyPressed() {
  if (keyCode === 32) {
    gameCycle(aiSelect());
  }
}

function generateBoard() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      board.push('');
    }
  }
}

function checkWin(direction) {
  let pathResult;
  let headerCell;
  let comparisonCell;
  if (direction === 'diagonal') {
    for (let i = -1; i <= 1; i = i + 2) {
      const yCoord = (gridSize - 1) / 2 * (1 + i);
      headerCell = board2d(yCoord, 0);
      if (headerCell !== '') {
        pathResult = true;
        for (let j = 1; j < gridSize; j++) {
          const compY = yCoord + j * -i;
          comparisonCell = board2d(compY, j);
          if (comparisonCell !== headerCell) {
            pathResult = false;
          }
        }
        if (pathResult === true) {
          return headerCell;
        }
      }
    }
  } else {
    for (let i = 0; i < gridSize; i++) {
      if (direction === 'vertical') {
        headerCell = board2d(0, i);
      } else if (direction === 'horizontal') {
        headerCell = board2d(i, 0);
      }
      if (headerCell !== '') {
        pathResult = true;
        for (let j = 1; j < gridSize; j++) {
          if (direction === 'vertical') {
            comparisonCell = board2d(j, i);
          } else if (direction === 'horizontal') {
            comparisonCell = board2d(i, j);
          }
          if (comparisonCell !== headerCell) {
            pathResult = false;
          }
        }
        if (pathResult === true) {
          return headerCell;
        }
      }
    }
  }
  return '';
}

// returns a string representing the winner, or an empty string if nobody has
// won
function checkWins() {
  const winResults = [
    checkWin('horizontal'),
    checkWin('vertical'),
    checkWin('diagonal')
  ];

  const reducer = function(total, num) {
    if (num === '' && total === '') {
      return '';
    } else if (total === '') {
      return num;
    } else {
      return total;
    }
  };

  return winResults.reduce(reducer);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  generateBoard(gridSize);
  player = players[0];
  noLoop(); // noLoop should be the last line in the block
}

function drawGrid() {
  background(255, 255, 255);
  let columnWidth = canvasWidth / gridSize;
  let rowHeight = canvasHeight / gridSize;
  strokeWeight(4);
  for (let i = 0; i < gridSize - 1; i++) {
    const xCoord = columnWidth * (i + 1);
    line(xCoord, 0, xCoord, canvasHeight);
  }
  for (let j = 0; j < gridSize - 1; j++) {
    const yCoord = rowHeight * (j + 1);
    line(0, yCoord, canvasWidth, yCoord);
  }
}

function drawMarks() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (board2d(j, i) !== '') {
        var xPos = columnWidth * i + columnWidth / 2;
        var yPos = rowHeight * j + rowHeight / 2;
      }
      if (board2d(j, i) === players[1]) {
        noFill();
        ellipse(xPos, yPos, columnWidth / 2, rowHeight / 2);
      } else if (board2d(j, i) === players[0]) {
        const xLength = columnWidth / 4;
        const yLength = rowHeight / 4;
        line(xPos - xLength, yPos - yLength, xPos + xLength, yPos + yLength);
        line(xPos + xLength, yPos - yLength, xPos - xLength, yPos + yLength);
      }
    }
  }
}

function pushText(message) {
  textSize(48);
  fill('red');
  stroke('white');
  textAlign(CENTER);
  if (message !== '') {
    text(message, canvasWidth / 2, canvasHeight / 2);
    print(message);
  }
}

function gameCycle(cell) {
  let outputText = '';
  if (board[cell] === '') {
    board[cell] = player;
  } else {
    outputText = `Cell ${cell} is already taken!`;
    return;
  }
  const turnResult = checkWins();
  if (turnResult !== '') {
    winStatus = turnResult + ' has won!';
    outputText = winStatus;
  } else if (emptyCells(board).length === 0) {
    outputText = 'Tie!';
  }
  if (player === 'X') {
    player = 'O';
  } else {
    player = 'X';
  }
  redraw();
  pushText(outputText);
}

function draw() {
  drawGrid();
  drawMarks();
}

/* Utility Functions  */

// Returns an array of which cells are empty.
// Examples:
//  A brand-new game with an empty board would return [0, 1, 2, 3, 4, 5, 6, 7,
//  8] If the only empty cell is the center, it will return [4] If every cell is
//  occupied, returns an empty list, []
function emptyCells(board) {
  const b = board.map((value, index) => {
    if (value === '') {
      return index;
    } else {
      return '';
    }
  });

  return b.filter(value => value !== '');
}

// 2D interface to the board. Using this, you can think of the board as a 2d
// array, like this: board[i][j]. takes two or three arguments: i, j, newValue
// i: row
// j: column
// newValue: (optional) If given, will SET the cell to that value.
// Returns the value of the board at [i][j], after the set if a set was done.
//
// Examples:
//  to get the value at row 2, column 1:
//      board2d(2, 1)
//  to set the value at row 2, column 1 to 'X':
//      board2d(2, 1, 'X')
//  both return the value of that cell.
const board2d = function(i, j, newValue) {
  const iOffset = i * gridSize;
  if (newValue !== undefined) {
    board[iOffset + j] = newValue;
  }
  return board[iOffset + j];
};

// Comparing arrays in javascript is not easy.
// Just in case you need to, here is a "deep" compare function.
// This function will test if two arrays are identical by looking at every
// element,
//  including sub-elements, and will return true only if every single value is
//  the same.
function compareArrays(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (arr1 == null || arr2 == null) return false;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; ++i) {
    return compareArrays(arr1[i], arr2[i]);
  }
  return true;
}
