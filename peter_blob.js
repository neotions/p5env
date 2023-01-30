// ffmpeg -r 60 -f image2 -s 800x800 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

// globals
let canvas;
let capture;
let p_index;
let z = 0;
vec = p5.Vector;
const rec = document



eSize = 4
t = 0

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
  size = width / 20;
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
  palette = shades(start,4,10);
  //palette = split_compliment(start,20);
  //palette = gradient(start,4,30,true);
  palette = tetradic(start,4,10);
  palette[0][2] = 10; 
  palette[1][2] = 100; 
  palette[2][2] = 100; 
  palette[3][2] = 100; 
  
  
}

function gauss(x,u,sig){
  return 1/sqrt(2*PI*sig**2) * exp((-1/2) * (x - u)**2 / sig**2)
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

  background(220);
  for (i = 0; i < width; i += eSize){
    for (j = 0; j < height; j += eSize){
      x = i - width/2
      y = j - height/2
      
      gx = 100*sin(t/16)
      gy = 50*cos(t/7)
      
      fx = 50*sin(t/8 + PI)
      fy = 150*cos(t/15)
            
      rg = sqrt((x - gx)**2 + (y - gy)**2)
      rf = sqrt((x - fx)**2 + (y - fy)**2)
      p = gauss(rg, 0, 50) + gauss(rf, 0, 50)
      col = p*25500
      col = min(max(abs(128 - col)**1.5,0), 40)*25 - 128
      circle(eSize/2+i, eSize/2+j, eSize)
      fill(p*9999)
    }
  }
  t++
  


  // for capture
  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
}