const tiles = 12;
const tileSize=55;
const gridSize=tiles*tileSize;

let grid = [];
let setStart=null;
let setEnd=null;
let tileType='start';

function setup() {
  canvas=createCanvas(gridSize, gridSize);
  canvas.mousePressed(changeTiles);
  
  startBtn=createButton('Maze Start');
  startBtn.addClass('button');
  startBtn.mouseClicked(()=>tileType='start')

  endBtn=createButton('Maze End');
  endBtn.addClass('button');
  endBtn.mouseClicked(()=>tileType='end');

  wallBtn=createButton('Maze Walls');
  wallBtn.addClass('button');
  wallBtn.mouseClicked(()=>tileType='wall');

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
  }
}


function handleStart(X,Y){
  if(grid[Y][X] instanceof StartPoint){
    setStart=null;
    grid[Y][X]=new Tile(Y,X,tileSize);
  }
  else if(setStart===null){
    if(grid[Y][X] instanceof EndPoint){
      setEnd=null;
    }
    grid[Y][X]= new StartPoint(Y,X,tileSize);
    setStart = {X:X,Y:Y};
  }
}

function handleEnd(X,Y){
  if(grid[Y][X] instanceof EndPoint){
    setEnd=null;
    grid[Y][X]=new Tile(Y,X,tileSize);
  }
  else if(setEnd===null){
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
    grid[Y][X]=new Wall(Y,X,tileSize);
  }
  else if(grid[Y][X] instanceof EndPoint){
    setEnd=null;
    grid[Y][X]=new Wall(Y,X,tileSize);
  }
  else if(grid[Y][X]instanceof Wall){
    grid[Y][X]=new Tile(Y,X,tileSize);
  }
  else{
    grid[Y][X]=new Wall(Y,X,tileSize);
  }
}
