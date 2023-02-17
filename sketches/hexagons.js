function hexagon(sx,sy,size) {
    let side = (size/2) * 1.1547005;
      let angle = TWO_PI / 6;
    let x = sx + side * cos(0);
    let y = sy + side * sin(0);
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      x = sx + side * cos(a);
      y = sy + side * sin(a);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
  

function isClose(pos1,pos2,gap) {

        x1 = pos1[0];
        y1 = pos1[1];
        x2 = pos2[0];
        y2 = pos2[1];

        r1 = (pos1[2] / 2) / cos(TWO_PI/12);
        r2 = (pos2[2] / 2) / cos(TWO_PI/12);

        d = sqrt( sq(x2-x1) + sq(y2-y1) )
        
        if (d < r1 + r2 + gap) {
            return true
        }
        return false
    }

function isOff(pos) {
    x = pos[0];
    y = pos[1];
    if (x > width + 20 || y > height + 20 || x < -20 || y < -20) {
        return true
    }
    else {
        return false;
    }
}

function setup(){
    canvas = createCanvas(800,800);

    objs = [[random(width),random(height),random(0,height/2)]];

    noLoop();

    background(255)
}

function draw() {
    
    for (let i = 0; i < 9999; i++) {

        good = true;

        pos1 = [random(width),random(height),random(20,height/2)]

        for (let j = 0; j < objs.length; j++) {
             
            console.log(objs.length);

            if ( isClose(pos1, objs[j],0) || isOff(pos1) ) {
                good = false;
            }


        }


        if ( good ) {
            fill(255);
            hexagon(pos1[0],pos1[1],pos1[2]);
            
            noFill()
            circle(pos1[0],pos1[1],pos1[2] / cos(TWO_PI/12));

            objs.push(pos1);
        }
        else {
            console.log("nope");
        }

    }


}