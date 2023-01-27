let capture;
fr = 60
seconds = 30
num_f = fr * seconds;
let p_index
recording = true

z = 0;
freq = 250;


function setup() {

  let canvas = createCanvas(800, 800);
  canvas.id("canvas");

  capture = new CCapture({
    format: "png",
    name: "frames"
  });

  //noLoop();
  colorMode(HSB);
  frameRate(fr);
  gap = width / 50;
  
  /*
  param1 = createSlider(-1000, 1000, 100);
  param1.position(10, height + 10);
  param1.style('width', '80px');
  text()

  speed = createSlider(12, 50, 1);
  speed.position(10, height + 30);
  speed.style('width', '80px');

  
  */
  //start = [351,100,100];
  start = [random(360),100,100];
  palette = shades(start,4,10);
  palette = split_compliment(start);
  //palette = tetradic(start,4,10);
  
  //noStroke();



}



function draw() {

  //console.log(frameRate())

  if (recording) {
    if (frameCount === 1) {
      capture.start();
      console.log("starting recording");
    }
  
    if (frameCount === num_f) {
      console.log("done!")
      noLoop();
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
      
      x = i - width/2;
      y = j - height/2;
      
      // signal 1
      s1 = cos((x + y) * (z /1000)) * 100//param1.value()

      // signal 2
      s2 = sin(((x + 1) * (y + s1) / 100000) + z)

      


          
      // fill raw
      f = sin(s2) * 360;
      
      /*
      r = noise(i,j,z) * 255;
      b = noise(j,i,x) * 255;
      g = noise(z,j,i) * 255;
      
      if (f < 0) {
        fill(r,g,b)
      }
      else {
        fill(f);
      }
      */
      
      if (f > 0) {

        fill(f,100,100)

        
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
          fill(c[0],c[1],c[2])
        }
      
      }
      
    
      else {
        fill(0,0,0)
      }
      
      //draw square
      square(i,j,gap);
    }
  }
  
  // speed
  z += 5 / 100;

  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
  
}