class Tile{
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

}

class StartPoint extends Tile{
    constructor(i,j,tileSize){
        super(i,j,tileSize);
    }

    show(){
        fill('lime');
        super.show();
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
}

class Wall extends Tile{
    constructor(i,j,tileSize){
        super(i,j,tileSize);
    }

    show(){
        fill('blue');
        super.show();
    }
}