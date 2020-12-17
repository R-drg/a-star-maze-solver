const tiles = 12;
const tileSize=55;
const gridSize=tiles*tileSize;

let grid = [];
let setStart=null;
let setEnd=null;
let tileType='start';
let dragging=false;

function setup() {
  cursor('cursors/pencil.cur');
  const canvas=createCanvas(gridSize, gridSize);
  canvas.mousePressed(changeTiles);
  
  startBtn=createButton('Maze Start');
  startBtn.addClass('button');
  startBtn.mouseClicked(()=>{tileType='start'; cursor('cursors/pencil.cur')})

  endBtn=createButton('Maze End');
  endBtn.addClass('button');
  endBtn.mouseClicked(()=>{tileType='end'; cursor('cursors/pencil.cur')});

  wallBtn=createButton('Maze Walls');
  wallBtn.addClass('button');
  wallBtn.mouseClicked(()=>{tileType='wall'; cursor('cursors/pencil.cur')});

  wallBtn=createButton('Eraser');
  wallBtn.addClass('button');
  wallBtn.mouseClicked(()=>{tileType='erase'; cursor('cursors/eraser.cur')});

  intiateGrid();
}

function draw() {
  background(220);
  drawGrid();
}


function intiateGrid(){
  for(let i=0;i<tiles;i++){
    let row = [];
    for(let j=0;j<tiles;j++){
      row.push(new Tile(i,j,tileSize));
    }
    grid.push(row);
  }
}

function drawGrid(){
  grid.forEach(row=>row.forEach(tile=>tile.show()));
}

function changeTiles(){
  const X = floor(mouseX/tileSize);
  const Y = floor(mouseY/tileSize);

  switch(tileType){
    case 'start':
      handleStart(X,Y);
      break;
    case 'end':
      handleEnd(X,Y);
      break;
    case 'wall':
      handleWall(X,Y);
      break;
    case 'erase':
      handleErase(X,Y);
      break;
  }
}


function handleErase(X,Y){
  if(grid[Y][X] instanceof EndPoint){
    setEnd=null;
  }
  else if(grid[Y][X] instanceof StartPoint){
    setStart=null;
  }
  grid[Y][X]=new Tile(Y,X,tileSize);
}

function handleStart(X,Y){
  if(setStart===null){
    if(grid[Y][X] instanceof EndPoint){
      setEnd=null;
    }
    grid[Y][X]= new StartPoint(Y,X,tileSize);
    setStart = {X:X,Y:Y};
  }
}

function handleEnd(X,Y){
  if(setEnd===null){
    if(grid[Y][X] instanceof StartPoint){
      setStart=null;
    }
    grid[Y][X]= new EndPoint(Y,X,tileSize);
    setEnd = {X:X,Y:Y};
  }
}


function handleWall(X,Y){
  if(grid[Y][X] instanceof StartPoint){
    setStart=null;
  }
  else if(grid[Y][X] instanceof EndPoint){
    setEnd=null;
  }
  grid[Y][X]=new Wall(Y,X,tileSize);
}


function mouseDragged() {
  const X = floor(mouseX/tileSize);
  const Y = floor(mouseY/tileSize);
  if(tileType==='wall'){
    handleWall(X,Y);
  }
  else if(tileType==='erase'){
    handleErase(X,Y);
  }
}