class Tile{

    neighbors=[];
    f=0;
    g=0;
    h=0;
    constructor(i,j,tileSize){
        this.tileSize=tileSize;
        this.j=j;
        this.i=i
    }

    show(){
        square(this.j*this.tileSize,this.i*this.tileSize,this.tileSize);
        strokeWeight(1);
        stroke('gray');
        fill('white');
    }

    addNeighbors(){
        if(this.j>0){
            this.neighbors.push(grid[this.i][this.j-1]);
        }
        if(this.j<tiles-1){
            this.neighbors.push(grid[this.i][this.j+1]);
        }
        if(this.i>0){
            this.neighbors.push(grid[this.i-1][this.j]);
        }
        if(this.i<tiles-1){
            this.neighbors.push(grid[this.i+1][this.j]);
        }
    }

}

class StartPoint extends Tile{
    constructor(i,j,tileSize){
        super(i,j,tileSize);
    }

    show(){
        fill('lime');
        super.show();
    }

    addNeighbors(){
        super.addNeighbors();
    }
}

class EndPoint extends Tile{
    constructor(i,j,tileSize){
        super(i,j,tileSize);
    }

    show(){
        fill('red');
        super.show();
    }

    addNeighbors(){
        super.addNeighbors();
    }
}

class Wall extends Tile{
    constructor(i,j,tileSize){
        super(i,j,tileSize);
    }

    show(){
        fill('blue');
        super.show();
    }

    addNeighbors(){
        super.addNeighbors();
    }
}

class Path extends Tile{
    constructor(i,j,tileSize){
        super(i,j,tileSize);
    }

    show(){
        fill('yellow');
        super.show();
    }
}