let capture;
fr = 60
seconds = 10
num_f = fr * seconds;
let p_index

z = 0;
freq = 250;


function setup() {

  //noLoop();
  colorMode(HSB);
  frameRate(fr)
  createCanvas(1200, 1200);
  gap = width / 100;
  
  param1 = createSlider(0, 1000, 100);
  param1.position(10, height + 10);
  param1.style('width', '80px');

  start = [random(360),100,100];
//palette = shades(start,4,10);
palette = split_compliment(start)
//palette = tetradic(start,4,10);
  
}



function draw() {
  background(0);
  
  
  for (i=0; i < height; i+= gap) {
    
    
    for (j=0; j < width; j+= gap) {
      
      x = i - width/2;
      y = j - height/2;
      
      
      s1 = cos((x + y) * (z /10)) * param1.value()
      
      s2 = sin( ((x + 1) * (y + s1) / 100000) + z)
          
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

        p_index = Math.round(f / 72)

        b = map(f, 0, 360, 0, 100);
        //console.log(b);

        if(f == 360) {
          let c = palette[0]
          fill(c[0],c[1],c[2])
        }

        else {

          let c = palette[p_index]
          fill(c[0],c[1],b + 50)
        }

      }

      else {
        fill(0,0,0)
      }
      
      square(i,j,gap);
    }
  }
  
  z += 0.1;
  
}