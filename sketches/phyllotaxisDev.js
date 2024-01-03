let capture;
fr = 60
seconds = 30
num_f = fr * seconds;
let p_index
recording = false

z = 0;
freq = 250;


var n = 0;
var c = 12;

var dot_size = 4;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var startHue = getRandomInt(360)
var hsbList = [startHue,10,100]

function setup() {

  capture = new CCapture({
    format: "png",
    name: "frames"
  });


  createCanvas(800,800);
  background(0);
  noStroke();
  colorMode(HSB)
  angleMode(DEGREES);
  frameRate(60);
}


var t = 0;
h = 180;

function draw() {
  
  background(0);
  multi = sin(t) * 20
  
    //h += 0.1;
  
  
    document.getElementsByClassName("button-capture")[0].addEventListener("click", () => { save(); });
    for (n = 0; n< 2000; n++) {
    
      fill(h % 360,hsbList[1],hsbList[2])
      var a = n * 222.5; //137.5
      var r = c * sqrt(n) + (tan(t / a)*100);

      var x = r * sin(a) + width/2;
      var y = r * cos(a) + height/2;

      dot_size =  n /12 + tan(t) *10;
  
      //square(x,y,dot_size);
      circle(x,y,dot_size);
        
    }
  
  t+= 1.3;

  if (recording) {
    capture.capture(document.getElementById("canvas"));
  }

} 
   