function isClose(pos1,pos2,gap,dot_size) {

        x1 = pos1[0];
        y1 = pos1[1];
        x2 = pos2[0];
        y2 = pos2[1];

        r1 = pos1[2];
        r2 = pos2[2];

        d = sqrt( sq(x2-x1) + sq(y2-y1) )
        
        if (i == 0 ) {
            //console.log(d)
        }

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
    noLoop();
}

function draw() {
    
    


}