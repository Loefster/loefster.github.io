var numSquares = 9;
var tile = [1,2,3,4,5,6,7,8];
var sqr =  [
    [0,0,0],
    [0,0,0],
    [0,0,0]];

var tileNum = document.querySelectorAll("td");
var resetButton = document.querySelector("#reset");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var table = document.getElementsByTagName("table")[0];
var cells = table.getElementsByTagName("td");

//initialize space position in array
var spaceRow = 2;
var spaceCol = 2;

init();

resetButton.addEventListener("click", function () {
    reset();
});

function setUpArray() {
    shuffle(tile);
    tile.push(0);
    var tileIndex = 0;
    for(let i = 0; i < numSquares / 3; i++) {
        for(let j = 0; j < numSquares / 3; j++) {
            sqr[i][j] = tile[tileIndex++];
        }
    }
    drawArray(); 
}
function drawArray() {
    var tileIndex = 0;
    for(let i = 0; i < numSquares / 3; i++) {
        for(let j = 0; j < numSquares / 3; j++) {
            tileNum[tileIndex++].textContent = sqr[i][j];
        }
    }
    // for(let i = 0; i < numSquares - 1; i++) {
    //     tileNum[i].textContent = tile[i];
    // }
}

//https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

for(var i = 0; i < cells.length; i++){
    // Cell Object
    var cell = cells[i];
    // Track with onclick
    cell.onclick = function(){
        var temp;
        var swap = false;
        var col = this.cellIndex;  
        var row = this.parentNode.rowIndex;
        if(col == spaceCol) {
            if(row == spaceRow - 1 || row == spaceRow + 1) {
                temp = sqr[row][col];
                sqr[row][col] = sqr[spaceRow][spaceCol];
                sqr[spaceRow][spaceCol] = temp;
                swap = true;
            }    
        }
        else if(row == spaceRow){
            //check if tile is to the left or right of space
            if(col == spaceCol + 1 || col == spaceCol -1) {
                //swap tile with space
                temp = sqr[row][col];
                sqr[row][col] = sqr[spaceRow][spaceCol];
                sqr[spaceRow][spaceCol] = temp;
                swap = true;
            }
        }
        if(swap) {
            spaceRow = row;
            spaceCol = col;
            document.getElementById("empty").id = "tile";
            this.id = "empty";
            drawArray();
            won();
        }
    }
}

function won() {   
    var checkNum = 1;
    for(let i = 0; i < numSquares / 3; i ++) {
        for(let j = 0; j < numSquares / 3; j ++) {
            //last element is space tile skip it
            if(i == 3 - 1 && j == 3 - 1)
                break;
            //if values don't match board is not yet ordered
            if(sqr[i][j] != checkNum)
                return false;
            checkNum++;
        }
    }
    message.messageDisplay.textContend = "Puzzle Solved!";
    resetButton.textContent = "Play again?";
    return true;
}

function reset() {
    // tile.pop();
    // setUpArray();
    window.location.reload();
}

function init() {
    setUpArray();
    drawArray();
}


