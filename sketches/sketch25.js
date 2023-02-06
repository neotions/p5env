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
  canvas = createCanvas(1000, 1000);
  canvas.id("canvas");

  t = 0;
  scale(-1.0, -1.0); // flip x-axis backwards

  //noStroke();
  
  colorMode(HSB);
  start_hue = random(360);
  size = width / 200;
  pris = new iso_prism(size, size, 60, 200, 50,start_hue,500);

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


  //noiseDetail(25)
  sliders = true;
  speed = 64;
  colorMode(HSB);
  frameRate(fr)
  //noStroke();
  strokeWeight(.1)
  noLoop();

  

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
  palette = gradient(start,4,10,true);
  //palette = tetradic(start,4,10);
  palette[0][2] = 10; 

  
  
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

fill_hue = palette[0][0];

background(fill_hue,100,15);

  // random peter shit
  translate(0, height); // move to far corner
  scale(1.0, -1); // flip x-axis backwards
  
  for (j = -1000; j < 1200; j+= size) {
    
    for(i = 1400; i > -500; i-= size) {
      
      pris.move(i,j);

      n = noise(i/500,j/500);

      n = n + noise(j/6,i/6) / 200;
      

      color_index = Math.round(map(n,0,1,0,4));

      // colors

      // water
      
        if (n < 0.45) {
          pris.col = palette[0][0];
      }
        
        //san
        else if (n < 0.5) {
          pris.col = palette[1][0];
      }
        
        else if (n < 0.55) {
          pris.col = palette[2][0];
      }
        
      else if (n < 0.6) {
        pris.col = palette[3][0];
      }
        
        else if (n < 0.7) {
          pris.col = palette[4][0];
      }


      console.log(color_index);

    

      pris.h = n * 600;
      pris.render();

    }

  }

  t++;
  


  // for capture
  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
}