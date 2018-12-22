let size;
let len = 5;
let grid = [];
let numberOfScables = 25;
let colorindex = [{r:255,g:0,b:39},{r:204,g:0,b:70},{r:139,g:0,b:129},{r:76,g:0,b:180},
                  {r:47,g:0,b:251},{r:255,g:64,b:36},{r:205,g:77,b:66},{r:134,g:86,b:126},
                  {r:67,g:93,b:188},{r:0,g:98,b:253},{r:254,g:130,b:34},{r:198,g:141,b:74},
                  {r:122,g:153,b:128},{r:25,g:164,b:197},{r:5,g:167,b:255},{r:253,g:194,b:40},
                  {r:185,g:208,b:75},{r:90,g:227,b:128},{r:0,g:232,b:186},{r:0,g:241,b:255},
                  {r:253,g:254,b:54},{r:174,g:255,b:69},{r:77,g:255,b:121},{r:0,g:255,b:192},
                  {r:2,g:253,b:255}];
let selector;
let timer;
function setup() {
    createCanvas(640,640);
  timer = new Stopwatch();
  size = (width-200)/len;
  selector = {left:2*size,top:2*size};

  for(let i = 0;i < 5;i++)
  {
    grid[i] = [];
  }
  let ascii = 65;
  let index = 0;
  for(let i = 0;i < 5;i++)
  {
    for(let j = 0;j < 5;j++)
    {
      let color = 50+10*(i+j);
      let b = new Box(j,i,String.fromCharCode(ascii),colorindex[index]);
      grid[i].push(b);
      ascii++;
      index++;
    }

  }
  background(51);
  textSize(32);
}

function draw() {
  for(let i = 0;i < grid.length ;i++)
  {
    let row = grid[i];
    for(let j = 0;j < row.length;j++)
    {
      row[j].show();
    }
  }
  noFill();
  stroke(0,255,0);
  strokeWeight(4);
  rect(selector.left,selector.top,size,size);
  strokeWeight(1);
  stroke(255);
  fill(125);
  let left = 5*size+12;
  let top = 12;
  let bottom = 5*size + 150;
  let right = 150;
  rect(left,top,size*2,size);
  fill(255);
  text('Scramble',left+20,top+50);
  textSize(64);
  noStroke();
  fill(51);
  rect(0,5*size,width,height);
  fill(255);
  text(timer.print(),right,bottom);
  textSize(32);
}

function mousePressed() {
  for(let i = 0;i < grid.length ;i++)
  {
    let row = grid[i];
    for(let j = 0;j < row.length;j++)
    {
      if(row[j].hit(mouseX,mouseY))
      {
        selector.left = row[j].left;
        selector.top = row[j].top;
      }
    }
  }
  let left = 5*size+12;
  let right = left +size*2;
  let top = 12;
  let bottom = top + size;
  if(mouseX > left &&  mouseX < right && mouseY > top &&  mouseY < bottom)
  {
    for(let i = 0;i < numberOfScables;i++)
    {
      scramble();
      timer.start();
    }
  }
}

function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    let index = selector.top / size;
    rightToleftIndex(index);
    if(selector.left > 0)
    selector.left -= size;
  } else if (keyCode === RIGHT_ARROW) {
    let index = selector.top / size;
    leftTorightIndex(index);
    if(selector.left < 4*size)
    selector.left += size;
  } else if(keyCode === UP_ARROW){
    let index = selector.left / size;
    selector.top -= size;
    bottomTotopIndex(index);
  } else if(keyCode === DOWN_ARROW){
    let index = selector.left / size;
    topTobottomIndex(index);
    if(selector.top > 0)
    selector.top += size;
  }
}
class Box{
  constructor(row,col,letter,color){
    this.col = col;
    this.row = row;
    this.left = row*size;
    this.right = (row+1)*size;
    this.top = col*size;
    this.bottom = (col+1)*size;
    this.letter = letter;
    this.color = color;
  }
  show(){
      fill(this.color.r,this.color.g,this.color.b);
      stroke(255);
      rect(this.left,this.top,size,size);
      noStroke();
      fill(0);
      text(this.letter,this.left + (size/2-10),this.top + (size/2+10));
  }
  hit(px,py)
  {
    let nothit = px < this.left || px > this.right || py > this.bottom || py < this.top;
    return !nothit;
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

  let temp = grid[4][col].letter;
  let c = grid[4][col].color;
  for(let i = 4; i > 0;i--)
  {
    grid[i][col].letter = grid[i-1][col].letter;
    grid[i][col].color = grid[i-1][col].color;
  }
  grid[0][col].letter = temp;
  grid[0][col].color = c;
}
function bottomTotop(){
  let col = floor(random(5));

  let temp = grid[0][col].letter;
  let c = grid[0][col].color;
  for(let i = 0; i < 4;i++)
  {
    grid[i][col].letter = grid[i+1][col].letter;
    grid[i][col].color = grid[i+1][col].color;
  }
  grid[4][col].letter = temp;
  grid[4][col].color = c;
}
function leftToright(){
  let row = floor(random(5));

  let temp = grid[row][4].letter;
  let c = grid[row][4].color;
  for(let i = 4; i > 0;i--)
  {
    grid[row][i].letter = grid[row][i-1].letter;
    grid[row][i].color = grid[row][i-1].color;
  }
  grid[row][0].letter = temp;
  grid[row][0].color = c;
}
function rightToleft(){
  let row = floor(random(5));

  let temp = grid[row][0].letter;
  let c = grid[row][0].color;
  for(let i = 0; i < 4;i++)
  {
    grid[row][i].letter = grid[row][i+1].letter;
    grid[row][i].color = grid[row][i+1].color;
  }
  grid[row][4].letter = temp;
  grid[row][4].color = c;
}
function topTobottomIndex(cl){
  let col = cl;

  let temp = grid[4][col].letter;
  let c = grid[4][col].color;
  for(let i = 4; i > 0;i--)
  {
    grid[i][col].letter = grid[i-1][col].letter;
    grid[i][col].color = grid[i-1][col].color;
  }
  grid[0][col].letter = temp;
  grid[0][col].color = c;
}
function bottomTotopIndex(cl){
  let col = cl;

  let temp = grid[0][col].letter;
  let c = grid[0][col].color;
  for(let i = 0; i < 4;i++)
  {
    grid[i][col].letter = grid[i+1][col].letter;
    grid[i][col].color = grid[i+1][col].color;
  }
  grid[4][col].letter = temp;
  grid[4][col].color = c;
}
function leftTorightIndex(r){
  let row = r;

  let temp = grid[row][4].letter;
  let c = grid[row][4].color;
  for(let i = 4; i > 0;i--)
  {
    grid[row][i].letter = grid[row][i-1].letter;
    grid[row][i].color = grid[row][i-1].color;
  }
  grid[row][0].letter = temp;
  grid[row][0].color = c;
}
function rightToleftIndex(r){
  let row = r;

  let temp = grid[row][0].letter;
  let c = grid[row][0].color;
  for(let i = 0; i < 4;i++)
  {
    grid[row][i].letter = grid[row][i+1].letter;
    grid[row][i].color = grid[row][i+1].color;
  }
  grid[row][4].letter = temp;
  grid[row][4].color = c;
}
