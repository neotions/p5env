function setup() {
    canvas = createCanvas(800,1600);
    
    //noLoop();
    //console.log(field.field);
    x = random(width);
    y = random(height);
    noStroke();
    dots = [];
    
    current_line = [];
    line_num = 0;
    loop_num = 0;

    gap = 10;
    dot_size = 20;

    noiseDetail(20)

    colorMode(RGB)
    background(225)

    palette = [
        [217,59,146],
        [171,5,242],
        [104,5,242],
        [29,28,64],
        [242,100,68]
    ]

    start = [random(360),100,100];
    //palette = shades(start,4,10);
    //palette = split_compliment(start,10);
    //palette = gradient(start,4,15,true);
    //palette = tetradic(start,4,10);

    

}

function draw() {

    for (let f = 0; f < 1000; f++ ) {

        n = noise(x,y);

        //x = x + noise(x/200 * noise(cos(x/50)));
        //y = y + noise(y/200 * noise(sin(y/50)));
        
        s1 = (sin(f) +1 /1);
        
        x = x + (sin(x/250 + s1) + 1) / 2;
        y = y + (cos(y/500 + s1) + 1) / 2;
        
        pos = [x,y];

        if ( isClose(x,y,gap,dot_size) || isOff(x,y)) {
            col = palette[Math.round(random(4))];
            fill(col[0],col[1],col[2])
            x = random(-20,width);
            y = random(-20,height);
            dots = dots.concat(current_line);
            for (c = 0; c < current_line.length; c++) {
                coords = current_line[c];
                circle(coords[0],coords[1],dot_size);
            }
            current_line = [];

        }

        else {
            //circle(x,y,dot_size);
            current_line.push(pos);
            
        }

        if ( f % 100 == 0) {
            console.log("f");
        }        
        
    }



}


function isClose(x,y,gap,dot_size) {

    //console.log("this is a dot",dots[0])
    for (i = 0; i < dots.length; i+=1) {

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
    if (x > width + 20 || y > height + 20 || x < -20 || y < -20) {
        return true
    }
    else {
        return false;
    }
}