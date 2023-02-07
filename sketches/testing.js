function setup() {
    canvas = createCanvas(800,800);
    gap = width/40;
    field = new noise_field(width,height,gap,100,1);
    noLoop();
    //console.log(field.field);

}

function draw() {
    background(255);
    field.render();
}