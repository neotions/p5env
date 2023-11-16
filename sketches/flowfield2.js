function setup() {
    canvas = createCanvas(600,600);
    
    //noLoop();
    //console.log(field.field);
    x = random(width);
    y = random(height);
    noStroke();
    dots = [];
    
    current_line = [];
    line_num = 0;
    loop_num = 0;

    gap = 5;
    dot_size = 10;

    noiseDetail(2)

    //colorMode(RGB)
    colorMode(HSB)
    background(225)

    /* custom hard coded 

    palette = [
        color("#F2A0CE"),
        color("#482A74"),
        color("#382159"),
        color("#659DBE"),
        color("#F3EBC4")
    ]

    */

    start = [random(360),100,100];
    //palette = shades(start,4,10);
    //palette = split_compliment(start,10);
    //palette = gradient(start,4,15,true);
    //palette = tetradic(start,4,10);

    palette = gradient_analogous(start,4,10)

    background(palette[0][0],20,20)

    stop_button = document.getElementById('stop-button');

}

function draw() {
    
    stop_button.addEventListener('click', () => {
        noLoop();
        stop_button.classList.toggle('no-show');
    })

    for (let f = 0; f < 1000; f++ ) {

        n = noise(x,y);

        //x = x + noise(x/200 * noise(cos(x/50)));
        //y = y + noise(y/200 * noise(sin(y/50)));
        
        s1 = (cos(f) +1 /1);
        
        //dx = sin(y/256 * sin(y/128) + s1)
        //dy = sin(x/256 * sin(x/256) - s1)


        dx = noise(x/200 * noise(cos(x/500)));
        dy = noise(y/200 * noise(sin(y/500)));

        x = x + dx;
        y = y + dy;
        
        pos = [x,y];

        if ( isClose(x,y,gap,dot_size) || isOff(x,y) || current_line.length > 400) {
            col = palette[Math.round(random(4))];
            //fill(col[0],col[1],col[2])
            fill(col)
            x = random(-20,width);
            y = random(-20,height);
            dots = dots.concat(current_line);
            for (c = 0; c < current_line.length; c++) {
                coords = current_line[c];
                circle(coords[0],coords[1],cos(f) * dot_size);
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