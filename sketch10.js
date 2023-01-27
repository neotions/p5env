let capture;
fr = 60
seconds = 10
num_f = fr * seconds;
let p_index

z = 0;
freq = 250;

function setup() {
  
  
  // for capture
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
  //palette = shades(start,4,10);
  palette = split_compliment(start)
  //palette = tetradic(start,4,10);

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


  console.log(palette)

}

function draw() {
  

  // for capture
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

        p_index = Math.round(s2 /63.75)

        if(s2 == 255) {
          let c = palette[0]
          fill(c[0],c[1],c[2])
        }

        else {
          let c = palette[p_index]
          fill(c[0],c[1],c[2])
        }

      }

      else {
        fill(0,0,0)
      }
    
  
      square(i,j,gap);
    }
  }
  //z += ((sin(x-y)+1 ) / 2) / 1000000
  z += 1;

  
  // for capture
  capture.capture(document.getElementById("canvas"))
  
}