let grid = [];
let len = 5;
let numberOfScables = 2;
let board = [];
function setup() {
  initGrid();
  createCanvas(400,400);
  background(51);
  // console.table(grid);
  for(let i = 0;i < numberOfScables;i++)
  {
    scramble();
  }
  // console.table(grid);
  for(let i = 0;i < len;i++)
  {
    for(let j = 0;j < len;j++)
    {
      let b = new Box(i,j,grid[i][j]);
      board.push(b);
    }
  }
}

function mousePressed() {
  if(board[7].hit(mouseX,mouseY))
  {
    console.log("hit");
  }
  else
  {
    console.log("miss");
  }
}

function draw() {

  //let size = width/len;
  for(let i = 0;i < board.length;i++)
  {
    board[i].show();
  }

}

class Box{
  constructor(row,col,prop){
    this.row = row;
    this.col = col;
    this.block = prop;
    this.size = width/len;
  }
  show(){
      fill(this.block.color);
      stroke(255);
      // console.log(this.block.color);
      rect(this.row*size,this.col*this.size,this.size,this.size);
      noStroke();
      fill(0);
      text(this.block.letter,this.row*(  this.size)+32,this.col*(this.size)+32);
  }
  hit(px,py)
  {

  }

}


function scramble(){
  if(random(1) <= 0.5)
  {
    //row
    if(random(1) <= 0.5)
    {
      //top to bottom
      topTobottom();
    }
    else
    {
      //bottom to top
      bottomTotop();
    }
  }
  else
  {
    //col
    if(random(1) <= 0.5)
    {
      //left to right
      leftToright();
    }
    else
    {
      //right to left
      rightToleft();
    }
  }
}

function topTobottom(){
  let col = floor(random(5));

  let temp = grid[4][col];
  for(let i = 4; i > 0;i--)
  {
    grid[i][col] = grid[i-1][col];
  }
  grid[0][col] = temp;
}
function bottomTotop(){
  let col = floor(random(5));

  let temp = grid[0][col];
  for(let i = 0; i < 4;i++)
  {
    grid[i][col].letter = grid[i+1][col].letter;
  }
  grid[4][col] = temp;
}
function leftToright(){
  let row = floor(random(5));

  let temp = grid[row][4];
  for(let i = 4; i > 0;i--)
  {
    grid[row][i].letter = grid[row][i-1].letter;
  }
  grid[row][0] = temp;
}
function rightToleft(){
  let row = floor(random(5));

  let temp = grid[row][0];
  for(let i = 0; i < 4;i++)
  {
    grid[row][i].letter = grid[row][i+1].letter;
  }
  grid[row][4] = temp;
}
