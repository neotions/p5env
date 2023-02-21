let r = 25;

// directions that the hexagon can 
// traverse

// North East, South East, North, etc.
let NE,SE,N,SW,NW,S, dirs;

function hexagon(sx, sy, size, flip = false) {
  // John code

  let side = (size/2) * 1.1547005;
  let angle = TWO_PI / 6;
  let x = sx + side * cos(0);
  let y = sy + side * sin(0);

  let offset = 0
  if (flip){
    offset = PI/6
  }
  beginShape();
  for (let a = 0 + offset; a < TWO_PI + offset; a += angle) {
    x = sx + side * cos(a);
    y = sy + side * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
}



let ESIZE = r;
let x;
let y;
t = 0

function is_off(x, y){
  
  // determine if hex centroid is off screen
  
  return x > width || x < 0 || y > height || y < 0 
}


function setup() {
  createCanvas(800, 800);
  background(50);
  noStroke()

  NE = [r*sqrt(3), r]
  SE = [r*sqrt(3), -r]
  N =  [0, 2*r]

  SW = scmul(-1, NE)
  NW = scmul(-1, SE)
  S =  scmul(-1, N)

  dirs = [NE, SE, N, SW, NW, S]
  
  // Starting pos
  x = width/2
  y = height/2

  stop_button = document.getElementById('stop-button');
}


function draw() {

  stop_button.addEventListener('click', () => {
    noLoop();
    stop_button.classList.toggle('no-show');
  })

  ESIZE = r*bsin(t/16, 0.2, 0.9)

  hexagon(x, y, ESIZE*2)
  let vx, vy;
  
  // choose random hex dir
  [vx, vy] = dirs[floor(random(0,6))]
  
  // propogate hex
  x = x + vx
  y = y + vy
  fill(255*bsin(t+ TWO_PI/3*2, 0.5, 1), 255*bsin(t, 0.5, 1), 255*bsin(t + TWO_PI/3,0.5,1));
  if (is_off(x, y)){
    x = width/2
    y = height/2
    t += 1
    
  }
  //t+=1/16
}
