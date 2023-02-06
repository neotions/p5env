let capture;
fr = 60
seconds = 30
num_f = fr * seconds;
let p_index
recording = false

z = 0;
freq = 250;


function setup() {

  capture = new CCapture({
    format: "png",
    name: "frames"
  });

  //noLoop();
  colorMode(HSB);
  frameRate(fr)
  createCanvas(800, 800);
  gap = width / 80;
  
  param1 = createSlider(-1000, 1000, 100);
  param1.position(10, height + 10);
  param1.style('width', '80px');
  text()

  speed = createSlider(5, 50, 1);
  speed.position(10, height + 30);
  speed.style('width', '80px');

  zoom = createSlider(10000, 50000, 1000);
  zoom.position(10, height + 50);
  zoom.style('width', '80px');

  

  start = [random(360),100,100];
  palette = shades(start,4,10);
  //palette = split_compliment(start);
  //palette = tetradic(start,4,10);
  
  //noStroke



}



function draw() {

  if (recording) {
    if (frameCount === 1) {
      capture.start();
      console.log("starting recording");
    }
  
    if (frameCount === seconds * fr) {
      console.log("done!")
      //noLoop();
      capture.stop();
      //capture.save();
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

      freq1 = 100;
      freq2 = 1000;
      freq3 = zoom.value(); // effectivly zoom

      s1 = sin((x * z) / freq1) + z

      // signal 2
      s2 = sin( ( (x + s1) - (y + 1) ) / freq2) + s1;

      // signal 2
      s3 = sin( sq( (x + s1) * (y + s2) / freq3 ) + s2);
          
      // fill raw
      f = sin(s3) * 360;
      
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
      square(i,j,gap);
    }
  }
  
  // speed
  z += speed.value() / 100;

  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }
  
}