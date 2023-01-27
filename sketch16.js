// globals
let canvas;
let capture;
let p_index;
let z = 0;

// runs once
function setup() {

  // canvas variable 

  canvas = createCanvas(400, 400);
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
  gap = width / 40;
  colorMode(HSB);
  frameRate(fr)
  //noStroke();
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

  // resets each frame before drawing
  background(0);
  
  // rows
  for (i=0; i < height; i+= gap) {
    
    // columns
    for (j=0; j < width; j+= gap) {
      
      x = i - width/2;
      y = j - height/2;
      
      // signal 1

      freq1 = 100;
      freq2 = 1000;
      freq3 = 35000//zoom.value(); // effectivly zoom

      s1 = sin((x * z) / freq1) + z

      // signal 2
      s2 = sin( ( (x + s1) - (y + 1) ) / freq2) + s1;

      // signal 2
      s3 = sin( sq( (x + s1) * (y + s2) / freq3 ) + s2);
          
      // fill raw
      f = sin(s3) * 360;
            
      if (f > 0) {
        //fill index
        p_index = Math.round(f / 72)

        b = map(f, 0, 360, 0, 100);
        //console.log(b);

        if(f == 360) {
          let c = palette[0]
          fill(c[0],c[1],c[2])
        }

        else {
          let c = palette[p_index];
          fill(c[0],c[1],c[2] + 20)
        }
      }

      else {
        fill(0,0,0)
      }
      
      //draw square
      square(i,j,gap,3);
    }
  }
  
  // speed
  z += 0.03//speed.value() / 100;

  // for capture
  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
}