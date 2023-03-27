// ffmpeg command : ffmpeg -r 60 -f image2 -s 800x800 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

// globals
let canvas;
let capture;
let p_index;
let z = 0;

// runs once
function setup() {

  // canvas variable 
  canvas = createCanvas(450, 900);
  canvas.id("canvas");

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

  loadPixels(); // load the pixel array

  // rows
  for (let i = 0; i < height; i++) {
    // columns
    for (let j = 0; j < width; j++) {
      let index = (i + j * width) * 4;

      let y = i - height / 2;
      let x = j - width / 2;

      let s1 = sin(z + y / 200) + 1 / 2;
      let s0 = cos(z + x / 100) + 1 / 2;
      let signal = (sin(sin((y * s1) / 200) - cos((x * s0) / 200) + z) + 1) / 2;

      let f = sin(signal) * 360;

      if (f > 0) {
        let p_index = Math.round(f / 72);
        let c;
        if (f == 360) {
          c = palette[0];
        } else {
          c = palette[p_index];
        }

        pixels[index] = c[0];
        pixels[index + 1] = c[1];
        pixels[index + 2] = c[2];
        pixels[index + 3] = 255; // set alpha value to opaque
      } else {
        pixels[index] = 0;
        pixels[index + 1] = 0;
        pixels[index + 2] = 0;
        pixels[index + 3] = 255;
      }
    }
  }

  updatePixels(); // update the canvas with the modified pixel array

  // speed
  z += 0.03; //speed.value() / 100;

  // for capture
  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
}



