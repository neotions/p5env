// ffmpeg command : ffmpeg -r 60 -f image2 -s 800x800 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

// globals
let canvas;
let capture;
let p_index;
let z = 0;
let mx = 45


function smoothstep(edge0, edge1, x) {
  let t = constrain((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

// runs once
function setup() {

  // canvas variable 
  canvas = createCanvas(9 * mx,16 * mx);
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
  gap = width / 90;
  corners = 0;
  strokeWeight(0)
  noStroke();
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

  background(0);
  
  // rows
  for (i=0; i < height; i+= gap) {
    
    // columns
    for (j=0; j < width; j+= gap) {
      
      y = i - height/2;
      x = j - width/2;
    

      // Combination 2

  
// Combination 5
let d0 = dist(x, y, width / 4, height / 4);
let d1 = dist(x, y, (3 * width) / 4, (3 * height) / 4);
let s0 = smoothstep(0, width / 4, d0);
let s1 = smoothstep(0, width / 4, d1);
let s2 = smoothstep(width / 4, 0, d0 + d1);
let signal = (s0 + s1 + s2) / 3;
      

      
      h = map(signal,0,1,0,360) ;
      s = map(signal,0,1,0,100);
      b = map(signal,0,1,0,100);


      fill(h + 200,100,b + 10);

      /*
      // fill raw
      f = sin(signal) * 360;
      
      if (f > 0) {

        //fill index
        p_index = Math.round(f / 72)
        b = map(f, 0, 360, 0, 100);
        
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
    }*/
    
    //draw square
    noStroke();
    square(j,i,gap,corners);
  }
}

// speed
z += 0.01 //speed.value() / 100;

  // for capture
  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
}