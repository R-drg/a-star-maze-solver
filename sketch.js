const tiles = 20;
const tileSize=40;
const gridSize=tiles*tileSize;

let grid = [];
let openSet=[];
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

  pathBtn=createButton('Find Path');
  pathBtn.addClass('button');
  pathBtn.mouseClicked(findPath);

  intiateGrid();
}

function draw() {
  background(220);
  drawGrid();
}

function heuristic(a,b){
  dist(a.i,a.j,b.i,b.j);
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

function handleStart(X,Y){
  if(setStart===null){
    if(grid[Y][X] instanceof EndPoint){
      setEnd=null;
    }
    grid[Y][X] = new StartPoint(Y,X,tileSize,grid[Y][X].neighbors);
    setStart = grid[Y][X];
  }
}

function handleEnd(X,Y){
  if(setEnd===null){
    if(grid[Y][X] instanceof StartPoint){
      setStart=null;
    }
    grid[Y][X] = new EndPoint(Y,X,tileSize);
    setEnd = grid[Y][X];
  }
}




function findPath(){
  grid.forEach(row=>row.forEach(
    (tile)=>{
      tile.addNeighbors();
      if(tile instanceof Path){
        grid[tile.i][tile.j]=new Tile(tile.i,tile.j,tileSize);
      }
    }));
  if(setStart!=null && setEnd!=null){
    setStart.previous='none';
    let openSet=[setStart];
    let closedSet=[];
    console.log("START");
    while(openSet.length>0){
      console.log(openSet);
      winner=0;
      
      for(var i=0;i<openSet.length;i++){
        if(openSet[i].f<openSet[winner].f){
          winner=i;
        }
      }
      current = openSet[winner];
      if(current===setEnd){
        console.log('DONE');
        while(current.previous!='none'){
          if((current instanceof EndPoint)===false){
            grid[current.i][current.j]=new Path(current.i,current.j,tileSize);
          }
          current=current.previous;
        }
        foundPath=true;
        break;
      }

      openSet.splice(current,1);
      closedSet.push(current);

      current.neighbors.forEach(
        (neighbor)=>{
          tempG = current.g+heuristic(current,neighbor);

          if(!closedSet.includes(neighbor) && (neighbor instanceof Wall) === false){
            tempG = current.g+ heuristic(current,neighbor);

            if(!openSet.includes(neighbor)){
              neighbor.h=heuristic(neighbor,setEnd);
              neighbor.f=neighbor.g+neighbor.h;
              neighbor.g=tempG;
              openSet.includes(neighbor);
              neighbor.previous = current;
              openSet.push(neighbor);
            }
            else{
              if(tempG<neighbor.g){
                neighbor.h=heuristic(neighbor,setEnd);
                neighbor.f=neighbor.g+neighbor.h;
                neighbor.g=tempG;
                openSet.includes(neighbor);
                neighbor.previous = current;
              }
            }
          }
        }
      )
    }
  }
}