// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/149-tic-tac-toe.html
// https://youtu.be/GTWrWM1UsnA
// https://editor.p5js.org/codingtrain/sketches/5JngATm3c

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]; //Define board as an array of arrays; each inner array is a row

let players = ['X', 'O']; //Define players as an array of symbols - this only changes the output labeling - not the symbols

let currentPlayer; //Declare the current player variable (does not assign it)
let available = []; //Declare an empty array for available coordinates

function setup() { //Setup the game 
  createCanvas(400, 400); //Create canvas
  frameRate(30); //Define frame rate for updates
  currentPlayer = floor(random(players.length)); //Set the current player based upon a random number and array index
  for (let j = 0; j < 3; j++) { //Define available coordinates
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }
}

function equals3(a, b, c) { //Function to determine if 3 cells have the same symbol inside
  return (a == b && b == c && a != ''); //a != '' is included so that 3 blanks don't win
}

function checkWinner() {
  let winner = null; //Initialize winner variable

  // horizontal
  for (let i = 0; i < 3; i++) { //Test if any of the three rows have a winner
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) { //Test if any of the three columns have a winner
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  if (winner == null && available.length == 0) {
    return 'tie';
  } else {
    return winner;
  }

}

function nextTurn() {
  let index = floor(random(available.length)); //Randomly select a cell index
  let spot = available.splice(index, 1)[0]; //Extract the cell coordinates
  let i = spot[0]; //Declare the horizontal coordinate
  let j = spot[1]; //Declare the vertical coordinate
  board[i][j] = players[currentPlayer]; //Define the selected cell as the current player's
  currentPlayer = (currentPlayer + 1) % players.length; //Move on to the next player
}

// function mousePressed() {
//   nextTurn(); 
// }

function draw() {
  background(255); //Define background color
  let w = width / 3; //Declare column width
  let h = height / 3; //Declare column height
  strokeWeight(4); //Define stroke weight

  line(w, 0, w, height); //1st vertical line
  line(w * 2, 0, w * 2, height); //2nd vertical line
  line(0, h, width, h); //1st horizontal line
  line(0, h * 2, width, h * 2); //2nd horizontal line

  for (let j = 0; j < 3; j++) { //loops through each row
    for (let i = 0; i < 3; i++) { //loop through each cell
      let x = w * i + w / 2; //define x coordinate in the canvas
      let y = h * j + h / 2; //define y coordinate in the canvas
      let spot = board[i][j]; // define the current cell's value to be tested
      textSize(32); //set the font size to 32
      if (spot == players[1]) { //test if the cell belongs to player 1
        noFill();
        ellipse(x, y, w / 2); //draw a circle in that cell
      } else if (spot == players[0]) { //test if the cell belongs to player 2
        let xr = w / 4; //define the size of the x so it's equal to the circle
        line(x - xr, y - xr, x + xr, y + xr); //draw the positively sloped diagonal
        line(x + xr, y - xr, x - xr, y + xr); //draw the negatively sloped diagonal
      }

    }
  }

  let result = checkWinner(); //Test for a winner
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html("Tie!")
    } else {
      resultP.html(`${result} wins!`);
    }
  } else {
    nextTurn();
  }

}