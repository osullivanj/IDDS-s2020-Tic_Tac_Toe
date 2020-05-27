//IDDS Summer 2020 Research
//Tic tac toe game for AI/ML
//Jamie O'Sullivan & Mickey Barron 2020-05-26

var devMode = true;
var board = [];
var players = ['X', 'O'];
var currentPlayer = null;
var availableCells = [];
var gridSize = 3;
var canvasWidth = 500;
var canvasHeight = canvasWidth;
var columnWidth = canvasWidth / gridSize;
var rowHeight = canvasHeight / gridSize;
var winStatus = '';
var player;

function generateBoard(){
    for (let i = 0; i < gridSize; i++){
        let templateRow = [];
        for (let j = 0; j < gridSize; j++){
            templateRow.push('');
        }
        board.push(templateRow);
    }
    for (let j = 0; j < gridSize; j++){
        for (let i = 0; i < gridSize; i++){
            availableCells.push([i,j]);
        }
    }
}

function checkWin(direction){
    let pathResult;
    let headerCell;
    let comparisonCell;
    if (direction == "diagonal"){
        for (let i = -1; i <= 1; i = i + 2){
            let yCoord = (((gridSize-1)/2)*(1+i));
            headerCell = board[yCoord][0];
            if (headerCell != ""){
                pathResult = true;
                for (let j = 1; j < gridSize; j++){
                    let compY = yCoord + j*-i;
                    comparisonCell = board[compY][j];
                    if (comparisonCell != headerCell){
                        pathResult = false;
                    }
                }
                if (pathResult == true){return headerCell;}
            }
        }
    } else {
        for (let i = 0; i < gridSize; i++){
            if (direction == "vertical"){
                headerCell = board[0][i];
            } else if (direction == "horizontal"){
                headerCell = board[i][0];
            }
            if (headerCell != ""){
                pathResult = true;
                for (let j = 1; j < gridSize; j++){
                    if (direction == "vertical"){
                        comparisonCell = board[j][i];
                    } else if (direction == "horizontal"){
                        comparisonCell = board[i][j];
                    }
                    if (comparisonCell != headerCell){pathResult = false;}
                }
                if (pathResult == true){return headerCell;}
                
            }  
        }
    }
   return false;
}


function checkWins(){
    let winResult = ('').concat(checkWin("horizontal"), checkWin("vertical"), checkWin("diagonal")).replace(/false/g,'');
    return winResult;
}

function devDisplay(){
    if (devMode == true){
        print(board);
        print(availableCells);
    }
}

function setup(){
    createCanvas(canvasWidth, canvasHeight);
    frameRate(20);
    generateBoard(gridSize);
    devDisplay();
    player = random(players);
}

function drawGrid(){
    background(255,255,255);
    let columnWidth = canvasWidth / gridSize;
    let rowHeight = canvasHeight / gridSize;
    strokeWeight(4);
    for (let i = 0; i < gridSize - 1; i++){
        let xCoord = columnWidth * (i + 1);
        line(xCoord, 0, xCoord, canvasHeight);
    }
    for (let j = 0; j < gridSize - 1; j++){
        let yCoord = rowHeight * (j + 1);
        line(0, yCoord, canvasWidth, yCoord);
    }
}

function drawMarks(){
    for (let i = 0; i < gridSize; i++){
        for (let j = 0; j < gridSize; j++){
            if (board[j][i] != ""){
                var xPos = (columnWidth * i + columnWidth / 2);
                var yPos =  (rowHeight * j + rowHeight / 2);
            }
            if (board[j][i] == players[1]){
                noFill();
                ellipse(xPos, yPos, columnWidth / 2, rowHeight / 2);

            } else if (board[j][i] == players[0]){
                let xLength = columnWidth / 4;
                let yLength = rowHeight / 4
                line(xPos - xLength, yPos - yLength, xPos + xLength, yPos + yLength);
                line(xPos + xLength, yPos - yLength, xPos - xLength, yPos + yLength);
            }
        }
    }
}

function pushText(message){
    textSize(48);
        fill("red");
        textAlign(CENTER);
        text(message, (canvasWidth/2), (canvasHeight/2));
}

function gameCycle(){
    let cell;
    let initValue;
    do {
        alert((player + "'s Turn"));
        let xCoord = prompt("x Coord");
        let yCoord = prompt("y Coord");
        cell = [xCoord, yCoord];
        initValue = board[cell[1]][cell[0]];
        if (initValue == ''){
            board[cell[1]][cell[0]] = player;
            availableCells.splice(availableCells.indexOf(cell), 1);
        } else {
            alert("Sorry, that space is already taken :(");
        }
    } while (initValue != '');
    turnResult = checkWins();
    if (turnResult != ''){
        winStatus = turnResult + " has won!";
        pushText(winStatus);
        noLoop();    
    }
    if (availableCells.length == 0){
        pushText("Tie!");
        noLoop();
    }
    if (player == "X"){player = "O"} else {player = "X"};
}


function draw(){
    drawGrid();
    gameCycle();
    drawMarks();
}

