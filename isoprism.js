class iso_prism {
    constructor(length, width, height, x, y, col,col_mode) {
      this.l = length;
      this.w = width;
      this.h = height;
      this.x = x;
      this.y = y;
      this.col = col;
  
      
    }
    move(x,y){
      
      this.x = x*cos(PI/6) + y*cos(PI/6)
      this.y = x*sin(PI/6) - y*sin(PI/6)
      
    }
    render() {
      this.lx = this.l * cos(TWO_PI / 3 / 4);
      this.ly = this.l * sin(TWO_PI / 3 / 4);
      this.wx = this.w * cos(TWO_PI / 3 / 4);
      this.wy = this.w * sin(TWO_PI / 3 / 4);
  
      let x, y;
  
      // top side
      fill(this.col,100,100);
      beginShape(QUADS);
        [x, y] = [this.x, this.y + this.h];
      
        vertex(x, y);
        [x, y] = [x + this.lx, y + this.ly];
        vertex(x, y);
        [x, y] = [x - this.wx, y + this.wy];
        vertex(x, y);
        [x, y] = [x - this.lx, y - this.ly];
        vertex(x, y);
      endShape();
      
  
      // right
      fill(this.col,80,30);
      beginShape(QUADS);
  
      [x, y] = [this.x, this.y+ this.h];
      vertex(x, y);
      [x, y] = [x + this.lx, y + this.ly];
      vertex(x, y);
      [x, y] = [x, y - this.h];
      vertex(x, y);
      [x, y] = [x - this.lx, y - this.ly];
      vertex(x, y);
      endShape();
      
      // left side
      fill(this.col,90,60);
      beginShape(QUADS);
        [x, y] = [this.x, this.y+ this.h];
        vertex(x, y);
        [x, y] = [x - this.wx, y + this.wy];
        vertex(x, y);
        [x, y] = [x, y - this.h];
        vertex(x, y);
        [x, y] = [x + this.wx, y - this.wy];
        vertex(x, y);
      endShape();
    }
  }