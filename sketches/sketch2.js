// for png stitch: ffmpeg -r 60 -f image2 -s 800x800 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
let capture;
fr = 60
seconds = 10
num_f = fr * seconds;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.id("canvas");

  capture = new CCapture({
    format: "png",
    name: "frames"
  });

  gap = width / 100;
  frameRate(fr);
  //noLoop();
  start = [random(360),100,100];
  palette = shades(start,4,10)
  noStroke();
  colorMode(HSB)
  
  /*
  param1 = createSlider(0, 1000, 100);
  param1.position(10, height + 10);
  param1.style('width', '80px');
  
  param2 = createSlider(0, 255, 100);
  param2.position(10, height + 30);
  param2.style('width', '80px');
  
  param3 = createSlider(0, 255, 100);
  param3.position(10, height + 50);
  param3.style('width', '80px');
 */ 

  start = (random(360),100,100);
  palette = tetradic(start)


}

z = 0;
freq = 1000;



function draw() {
  
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

  /*
  if (frameCount % 60 == 0) {
    console.log(param1.value());
  }
  */
  
  background(0);
  //console.log(palette)

  for (j=0; j < height; j+= gap) {
    for (i=0; i < width; i+= gap) {
      
      x = i - width/2;
      y = j - height/2;
      
      s1 = 0;
      
      s2 = sin( sqrt( abs(x + s1) ) * sqrt( abs(y + s1) ) * (z/freq)) * 255
      
      
      if (s2 > 0) {
        if(s2 == 255) {
          fill(palette[0][1])
        }

        else {
          fill(s2,100,100); 
        }

      }

      else {
        fill(0,0,0)
      }
    
  
      square(i,j,gap);
    }
  }
  //z += ((sin(x-y)+1 ) / 2) / 1000000
  z += 10;

  capture.capture(document.getElementById("canvas"))
  
}