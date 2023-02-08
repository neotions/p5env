function setup() {
    canvas = createCanvas(800,800);
    gap = width/40;
    field = new test_field(width,height,gap,100,1)
    //noLoop();
    //console.log(field.field);

    background(25);
    x = random(width);
    y = random(height);
    dots = [];
    
    current_line = [];
    line_num = 0;
    loop_num = 0;

    gap = 10;
    dot_size = 2;

    noiseDetail(20)

    noLoop();

    stroke(255);


}

function draw() {


field.render()


}


