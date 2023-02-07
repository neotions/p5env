function setup() {
    canvas = createCanvas(400,400);
    gap = width/10;
    ff = new flowfield(width,height,gap);

    ff.noise_field()

}

function draw() {
    background(255);
}