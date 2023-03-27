
// globals
let canvas;
let capture;
let p_index;
let z = 0;


let sound, amplitude;
let t = 0;

let cscale = 0.5;

// runs once
function setup() {


  // canvas variable 

  canvas = createCanvas(900 *  cscale, 1600 * cscale);
  canvas.id("canvas");
  // for capture
  capture = new CCapture({
    format: "png",
    name: "frames"
  });

  // settings

  fr = 60
  seconds = 30
  num_f = fr * seconds;
  recording = false;
  sliders = false;
  gap = width / 50;
  colorMode(HSB);
  frameRate(fr)
  noStroke();
  //noLoop();

  // sliders

  if (sliders) {
    param1 = createSlider(-1000, 1000, 100);
    param1.position(10, height + 10);
    param1.style('width', '80px');
   
    speed = createSlider(5, 30, 1);
    speed.position(10, height + 30);
    speed.style('width', '80px');
  
    zoom = createSlider(20000, 100000, 1000);
    zoom.position(10, height + 50);
    zoom.style('width', '80px');
  }

  // color functions

  start = [random(360),100,100];
  palette = shades(start,4,10);
  palette = split_compliment(start,20);
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
      //noLoop();
      capture.stop();
      capture.save();
      return;
    }

  }


    // draw background every frame
  background(0);
  
  
  // moves y positions
  for (j = 0; j < height; j += gap) {
    
    // moves x positions
    for (i = 0; i < width; i += gap){
      
      // makes 0,0 the middle for the equation
      x = i - width/2;
      y = j - height/2;
      
      // equations for color value - signals
      val1 = sin(sq(y+z)/140 * sq(x + z)/2) + 1 / 2 
      val2 = cos(sq(y+z)/140 * sq(x + z)/2) + 1 / 2 
      val = sin(sq(y+z + val2 /100)/600 + sq(x + z + val1/1000)/20000 + val1/100) + 1 / 2 
      //val = sin(sq(y+z)/640 + sq(x + z)/3000) + 1 / 2 
      //val = sin(y/100 * x /100 + z) + 1 / 2 
      
      
      //equation for color value - noise
      //val = noise(x,y) + t 
      
      // fill 0-1 to 0-255
      fill(255 * val)
      // draw
      square(i,j,gap);
       
    }
    
  }
  
  // speed
  z += 0.05//speed.value() / 100;

  // for capture
  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
}