// ffmpeg -r 60 -f image2 -s 800x800 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

// globals
let canvas;
let capture;
let p_index;
let z = 0;
vec = p5.Vector;

// runs once
function setup() {

  // canvas variable 
  canvas = createCanvas(800, 800);
  canvas.id("canvas");

  t = 0;
  scale(-1.0, -1.0); // flip x-axis backwards

  //noStroke();
  
  colorMode(HSB);
  start_hue = random(360);
  size = 50;
  pris = new iso_prism(size, size, 60, 200, 50,start_hue);

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


  sliders = true;
  strokeWeight(0.5)
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
  palette = shades(start,4,10);
  palette = split_compliment(start,20);
  palette = gradient(start,4,25,true);
  //palette = tetradic(start,4,10);
  
}

// runs forever if noLoop() is called
function draw() {

  // for capture
  if (recording) {
    if (frameCount === 1) {
      capture.start();
      console.log("starting recording");
    }
  
    if (frameCount === seconds * fr) {
      console.log("done!")
      noLoop();
      capture.stop();
      capture.save();
      return;
    }

  }

background(0);

  // random peter shit
  translate(0, height); // move to far corner
  scale(1.0, -1); // flip x-axis backwards
  
  
  for (j = -800; j < 1200; j+= size) {
    
    for(i = 1400; i > -100; i-= size) {
      
      
      
      pris.move(i,j);
      k = i / 2 - 300;
      m = j + 100;
      r = sin( sqrt( sq(k) + sq(m) ) / 500 + (t/48) ) * 1000;
      s1 = (sin((k * r / 10000) + (t/64))+1) /2 ;

      //s1 = (sin((k * m / 10000) + (t/8))+1) /2 ;
    
      
      pris.h = s1 * 75;
      pris.render();

    }

  }

  t++;
  


  // for capture
  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
}