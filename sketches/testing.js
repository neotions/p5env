function setup() {
    canvas = createCanvas(800,800);
    
    //noLoop();
    //console.log(field.field);
    fill(255,255,255,255);
    background(25);
    x = random(width);
    y = random(height);
    frameRate(25)
    noStroke();
    dots = [];
    
    current_line = [];
    line_num = 0;
    loop_num = 2000;

    gap = 10;
    dot_size = 2;

    noLoop()

}

function draw() {

    while(line_num < 50 || loop_num < 2000) {

        x = x + noise(x/50);
        y = y + noise(y/50);
        
        pos = [x,y];

        if ( isClose(x,y,gap,dot_size) || isOff(x,y)) {
            x = random(-20,width);
            y = random(-20,height);
            dots = dots.concat(current_line);
            current_line = [];
            line_num += 1;
        }
        else {
            circle(x,y,dot_size);
            current_line.push(pos);
        }
        loop_num +=1
    }

    console.log("done bitch")

}


function isClose(x,y,gap,dot_size) {

    //console.log("this is a dot",dots[0])
    for (i = 0; i < dots.length; i++) {

        x1 = x;
        y1 = y;
        x2 = dots[i][0];
        y2 = dots[i][1];

        d = sqrt( sq(x2-x1) + sq(y2-y1) )
        
        if (i == 0 ) {
            //console.log(d)
        }

        if (d < dot_size + gap) {
            return true
        }
        
    }
    return false
}

function isOff(x,y) {
    if (x > width + 20 || y > height + 20) {
        return true
    }
    else {
        return false;
    }
}