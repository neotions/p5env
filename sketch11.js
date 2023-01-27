// ffmpeg -r 60 -f image2 -s 800x800 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
// ffmpeg -i output.mp4 -pix_fmt rgb24 -s 200x200 output4.gif


let capture;
fr = 60
seconds = 20
num_f = fr * seconds;
let p_index
let recording = true;


function setup() {

  let canvas = createCanvas(800, 800);
  canvas.id("canvas");

  // for capture
  if (recording) {
    capture = new CCapture({
      format: "png",
      name: "frames"
    });
  }

  gap = width / 100;
  frameRate(fr);
  //noLoop();
  start = [random(360),100,100];
  palette = shades(start,5,10)
  console.log(palette)
  
  colorMode(HSB);
  
  noStroke();
  
  /*
  param1 = createSlider(0, 0.1, 0.001);
  param1.position(10, height + 10);
  param1.style('width', '80px');

  param2 = createSlider(0, 255, 100);
  param2.position(10, height + 30);
  param2.style('width', '80px');
  
  param3 = createSlider(0, 255, 100);
  param3.position(10, height + 50);
  param3.style('width', '80px');
  */
}

z = 0;
freq = 200;



function draw() {

    if (recording) {
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
  }
  
  
  if (frameCount % 60 == 0) {
    //console.log(param1.value());
  
  }

  
  background(0);
  //console.log(palette)

  for (j=0; j < height; j+= gap) {
    for (i=0; i < width; i+= gap) {
      
      x = i - width/2;
      y = j - height/2;
      
      //s1 = sin(x + z) * cos(y + z) * 10
      //s1 = 0;
      
      s1 = 100
      
      //s2 = sin( sqrt( abs(x + s1) ) - sqrt( abs(y + s1) ) * (z/freq)) * 255
      
      
      param = 700 + z / 1000 ;
      
      s2 = sin( sqrt( abs(x + s1) ) - sqrt( abs(y + s1)) * param + z ) * 255
      
      
      
      if (s2 > 0) {
        color_index = Math.round(s2 / 51);
        //console.log(color_index)
        if(color_index > 0) {
          let c = palette[color_index];
        
          //console.log(c)
          fill(c[0],c[1],c[2])
          }
      }
    
      
      
      square(i,j,gap);
    }
  }
  //z += ((sin(x-y)+1 ) / 2) / 1000000
  z += 0.08;

  // for capture
  if (recording) {
  capture.capture(document.getElementById("canvas"))
  }

}