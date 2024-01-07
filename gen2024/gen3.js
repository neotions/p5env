// ffmpeg command ::: ffmpeg -r 60 -f image2 -s 800x800 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

// globals
let canvas;
let capture;
let p_index;
let z = 0;



function setup() {

  canvas = createCanvas(800, 800);
  canvas.id("canvas");

  pixelDensity(1); // Ensure pixel density is 1 for accurate pixel manipulation

    // for capture
    capture = new CCapture({
        format: "png",
        name: "frames"
    });


    // settings
    fr = 60
    seconds = 30
    num_f = fr * seconds;
    recording = false;
    frameRate(fr)
    //noStroke();
    //noLoop();

}

function draw() {


  // for capture
  if (recording) {
    if (frameCount === 1) {
      capture.start();
      console.log("starting recording");
    }
  
    if (frameCount === seconds * fr) {
      console.log("done!")
      //noLoop();
      capture.stop();
      capture.save();
      return;
    }

  }

  loadPixels(); // Load the pixel data of the canvas into the pixels[] array

  let maxRadius = sqrt(sq(width / 2) + sq(height / 2));
  
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {


        // Calculate the index in the pixel array
        let index = (i + j * width) * 4;

        // Normalize x, y to range between -1 and 1
        let x = (i - width / 2) / (width / 2);
        let y = (j - height / 2) / (height / 2);


        // Create Noise
        // Adjust these scales to control the noise input range
        let noiseScaleX = 2;
        let noiseScaleY = 5;
        let noiseScaleZ = 7;

        // Normalize and scale x and y for noise input
        let noiseX = (x + 1) / 2 * noiseScaleX; // Map x from [-1, 1] to [0, noiseScaleX]
        let noiseY = (y + 1) / 2 * noiseScaleY; // Map y from [-1, 1] to [0, noiseScaleY]
        let noiseZ = (z + 1) / 2 * noiseScaleZ; // Map y from [-1, 1] to [0, noiseScaleY]


        // Use these scaled values in your noise function
        let noiseValue = noise(noiseX, noiseY,noiseZ);



        // Convert to polar coordinates
        let angle = atan2(x, y);
        let radius = sqrt(x * x + y * y);

        let r = ((sin(angle * 4 + radius * 4 + z) + 1) / 2) * 255;
        let g = ((cos(angle * 4 - radius * 4 + z) + 1) / 2) * 255;
        let b = ((sin(angle * 4 + radius * 4 - z) + cos(radius * 4 - z) + 2) / 4) * 255;
        
        //r = ((sin(angle * 5 + z) * cos(radius * 5 + z) + 1) / 2) * 255;
        //g = ((cos(angle * 5 + z + PI/4) * sin(radius * 5 + z) + 1) / 2) * 255;
        //b = ((sin(angle * 5 + z + PI/2) * cos(radius * 5 + z) + 1) / 2) * 255;


        //r = ((sin(angle * 4 + z) * cos(radius * 4 - z) + 1) / 2) * 255;
        //g = ((cos(angle * 4 - z) * sin(radius * 4 + z) + 1) / 2) * 255;
        //b = ((sin(angle * 4 - z) * cos(radius * 4 - z) + 1) / 2) * 255;

        //r = ((sin(angle * 5 + z) * cos(radius * 5 + z) + 1) / 2) * 255;
        //g = ((cos(angle * 5 + z + PI/4) * sin(radius * 5 + z) + 1) / 2) * 255;
        //b = ((sin(angle * 5 + z + PI/2) * cos(radius * 5 + z) + 1) / 2) * 255;
        
        // Set the pixels on the canvas
        pixels[index] = r; // Red
        pixels[index + 1] = g; // Green
        pixels[index + 2] = b; // Blue
        pixels[index + 3] = 255; // Alpha (opacity)
    }
  }

  updatePixels(); // Update the canvas with the pixel[] array data
  
    // shift Z increment
    zIncrement = ((atan(z) + 1) / 2) * 0.01;

    // Increment z slightly on each frame to animate the pattern over time
    z += 1; // Adjust this value to change the speed of the animation

    // for capture
    if (recording) {
        capture.capture(document.getElementById("canvas"));
    }

}
