// ffmpeg command : ffmpeg -r 60 -f image2 -s 800x800 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

// globals
let canvas;
let capture;
let p_index;
let z = 0;
let mx = 15


function smoothstep(edge0, edge1, x) {
  let t = constrain((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

// runs once
function setup() {

  // canvas variable 
  canvas = createCanvas(16 * mx, 16 * mx);
  canvas.id("canvas");
  //filter(BLUR, 15);
  // for capture
  capture = new CCapture({
    format: "png",
    name: "frames"
  });



 
  // settings
  fr = 60
  seconds = 60;
  num_f = fr * seconds;
  recording = false;
  sliders = true;
  gap = width / 100;
  corners = 0;
  strokeWeight(0)
  noStroke();
  colorMode(RGB);
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
  //palette = shades(start,4,20);
  //palette[0][2] = 50
  //palette = split_compliment(start,20);
  palette = gradient(start,4,25,true);
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
      console.log("done!")
      //noLoop();
      capture.stop();
      capture.save();
      return;
    }

  }
  loadPixels();

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let y = i - height / 2;
      let x = j - width / 2;
      let z = frameCount * 0.04; // Increase this multiplier to make the animation faster
  
      // Frequency control variables
      let freq1 = 0.04; // Lower the frequencies for a smoother pattern
      let freq2 = 0.002 / 2;
      let freq3 = 0.002;
  
      // Offsets
      let offset1 = 0;
      let offset2 = PI / 3;
      let offset3 = 2 * PI / 4;
  
      // Multiple sine waves with different frequencies and offsets
      let s0 = (sin((x * freq1) * (y * freq1) + z + offset1) + 1) / 2;
      let s1 = (sin((x * freq2) * (y * freq2) + z + offset2) + 1) / 2;
      let s2 = (sin((x * freq3) * (y * freq3) + z + offset3) + 1) / 2;
  
      // Combine signals
      let signal = (s0 + s1 + s2) / 3;
  
      // Threshold value for chromatic aberration flashes
      let threshold = 0.95;
      let col;
  
      if (signal > threshold) {
        // Chromatic aberration offsets based on the signal value
        let offsetR = map(signal, threshold, 1, 0, 5);
        let offsetG = map(signal, threshold, 1, 0, -5);
        let offsetB = map(signal, threshold, 1, 0, 2);
  
        // Calculate signal for Red, Green, and Blue channels with slight offsets
        let signalR = (sin((x * freq1) * (y * freq1) + z + offset1 + offsetR) + 1) / 2;
        let signalG = (sin((x * freq2) * (y * freq2) + z + offset2 + offsetG) + 1) / 2;
        let signalB = (sin((x * freq3) * (y * freq3) + z + offset3 + offsetB) + 1) / 2;
  
        // Set the color using the individual channel signals
        col = color(signalR * 255, signalG * 255, signalB * 255);
      } else {
        col = color(255 * signal);
      }
  
      // Set the pixel color
      set(j, i, col);
    }
  }
  
  updatePixels();
  
  

// speed
z += speed.value() / 100;

  // for capture
  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
}