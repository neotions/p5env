
let sound, amplitude;
let t = 0;

function preload(){
  sound = loadSound('test.mp3');
}
function setup() {
  let cnv = createCanvas(400,400);

  sound.loop();
  amplitude = new p5.Amplitude();
  amplitude.setInput(sound);
  gap = width / 50;
}

function draw() {
  background(220);

  let level = amplitude.getLevel()/10000;

  for (y = 0; y < height; y += gap) {
    for (x = 0; x < width; x += gap) {
      s1 = (sin((x * y + (t/2) + level)/level)+1)/2;
      
      fill(s1 * 255);
      square(x,y,gap);
    }
  }

  t += 1

}

