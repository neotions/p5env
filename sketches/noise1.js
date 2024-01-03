


  // ffmpeg command : ffmpeg -r 60 -f image2 -s 800x800 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

// globals
let canvas;
let capture;
let p_index;
let z = 0;
scl = 1000


// runs once
function setup() {

  // canvas variable 
  canvas = createCanvas(1*scl,2*scl);
  canvas.id("canvas");


  // for capture
  capture = new CCapture({
    format: "png",
    name: "frames"
  });

  // settings
  fr = 60
  seconds = 15;
  num_f = fr * seconds;
  recording = true;
  sliders = false;
  gap = width / 10;
  corners = 0;
  strokeWeight(0)
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
  palette[0][2] = 50
  //palette = split_compliment(start,20);
  //palette = gradient(start,4,25,true);
  //palette = tetradic(start,4,10);
  
}

// runs forever unless noLoop() is called
function draw() {
  // for capture
  if (recording) {
    if (frameCount === 1) {
      capture.start();
      console.log("starting recording");
    }

    if (frameCount === seconds * fr) {
      console.log("done!");
      //noLoop();
      capture.stop();
      capture.save();
      return;
    }
  }

    // SKETCH GOES RIGHT HERE 

    for (y = 0; y < height; y += gap) {
      for (x = 0; x < width; x += gap){
        
        s1 = (cos((x * y) + z) + 1 / 2 );
        s2 = (sin((x * y) + s1) + 1 / 2 );
        
        value = noise(x + s1,y + s2)
        fill(343,value*70+10,100)
        square(x,y,gap)
      }
    }
    
    z += 0.08

  // for capture
  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
}