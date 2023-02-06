function setup() {
    createCanvas(800, 800);
    gap = width/80;
  }
  
  
  t=0;
  
  function gauss(x,u,sig){
    return 1/sqrt(2*PI*sig**2) * exp((-1/2) * (x - u)**2 / sig**2);
  }
  
  
  function draw() {
    background(220);
    
    
    for (i = 0; i < width; i += gap) {
      for (j = 0; j < width; j += gap) {
          
          x = i - width/2;
          y = j - height/2;
          
          r  = 250
        
          z = sqrt(sq(r) - sq(x) - sq(y))
              
          xs = gauss(x, 0, cos((x * sin(t/50))/ 128 + t/100) * 1000) * 1000;
          ys = gauss(y, 0, sin((y+ x * sin(t/50)) / 128 + t/100) * 1000) * 1000;
          zs = gauss(z, 0, cos(z / 128 + t/100) * 1000) * 1000;
  
    
          s = xs * ys * zs * 100;    
          fill(s);
        
          square(i,j,gap);
        
          
  
      }
      
    
    }
    t++
  }