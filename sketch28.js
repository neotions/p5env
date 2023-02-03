// ffmpeg -r 60 -f image2 -s 800x800 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

// globals
let canvas;
let capture;
let p_index;
let z = 0;
vec = p5.Vector;
const rec = document

// runs once
function setup() {

  // canvas variable 
  canvas = createCanvas(800, 800);
  canvas.id("canvas");

  t = 0;
  scale(-1.0, -1.0); // flip x-axis backwards

  noStroke();
  
  colorMode(HSB);
  speed = 1;
  start_hue = random(360);
  size = width / 24;
  pris = new iso_prism(size, size, 60, 200, 50,start_hue,0);

  // for capture
  capture = new CCapture({
    format: "png",
    name: "frames"
  });

  // settings
  fr = 60
  seconds = 15
  num_f = fr * seconds;
  recording = false;


  sliders = false;
  strokeWeight(.25);
  speed = 64;
  colorMode(HSB);
  frameRate(fr)
  //noStroke();
  //noLoop();

    // sliders
  if (sliders) {
    param1 = createSlider(-1000, 1000, 100);
    param1.position(10, height + 10);
    param1.style('width', '80px');
   
    speed = createSlider(1, 30, 1);
    speed.position(10, height + 30);
    speed.style('width', '80px');
  
    zoom = createSlider(88000, 100000, 1000);
    zoom.position(10, height + 50);
    zoom.style('width', '80px');
  }

  // color functions
  start = [random(360),100,100];
  //palette = shades(start,4,10);
  //palette = split_compliment(start,20);
  palette = gradient(start,4,10,true);
  //palette = tetradic(start,4,10);

  
  
}

function gauss(x,u,sig){
  return 1/sqrt(2*PI*sig**2) * exp((-1/2) * (x - u)**2 / sig**2);
}

// runs forever if noLoop() is called
function draw() {

  // for capture
  if (recording) {
    if (frameCount === 1) {
      capture.start();
      console.log("starting recording");
      document.getElementById("rec").classList.toggle("no-show");
    }
  
    if (frameCount === seconds * fr) {
      console.log("done!")
      noLoop();
      capture.stop();
      capture.save();
      return;
    }

  }


fill_hue = palette[0][0];



background(fill_hue,100,15);

  // random peter shit
  translate(0, height); // move to far corner
  scale(1.0, -1); // flip x-axis backwards
  
  
  for (j = -800; j < 1200; j+= size) {
    
    for(i = 1400; i > -120; i-= size) {
      
      pris.move(i,j);

      gaussX = 000;
      gaussY = 600;

      gaussX = 000;
      gaussY = 600;

      dx = j - gaussX;
      dy = i - gaussY;

      r = sqrt ( sq(dx) + sq(dy) );

      s1 = (sin(t / 32)+1) / 2 * 900  + 20;

      n = gauss(r,0,s1) * ((cos(t/16) + 1) /2 * 70000);

      c = gauss(r,0,s1) * 70000;

      color_index = Math.round(c/20) % 5;
      //console.log(color_index)

      pris.col = palette[color_index][0];

      pris.h = n * 5;
      pris.render();

      //text(frameCount,width,height+20);

    }

  }

  t++;
  


  // for capture
  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
}