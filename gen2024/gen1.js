// ffmpeg command ::: ffmpeg -r 60 -f image2 -s 800x800 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

// globals
let canvas;
let capture;
let p_index;
let z = 0;



function setup() {

  canvas = createCanvas(200, 200);
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
    recording = true;
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
      
      // Convert to polar coordinates
      //let angle = atan2(y, x);
      let angle = atan(y, x) + PI;
      let radius = sqrt(x * x + y * y);

      // Map radius back to pixel range
      radius = map(radius, 0, 1, 0, maxRadius);

      // Create Noise
      // Adjust these scales to control the noise input range
      let noiseScaleX = 2;
      let noiseScaleY = 5;
      let noiseScaleZ = 0.7;

      // Normalize and scale x and y for noise input
      let noiseX = (x + 1) / 2 * noiseScaleX; // Map x from [-1, 1] to [0, noiseScaleX]
      let noiseY = (y + 1) / 2 * noiseScaleY; // Map y from [-1, 1] to [0, noiseScaleY]
      let noiseZ = (z + 1) / 2 * noiseScaleZ; // Map y from [-1, 1] to [0, noiseScaleY]


      // Use these scaled values in your noise function
      let noiseValue = noise(noiseX, noiseY,noiseZ);


      // Calculate the color components
      let r = ((sin( noiseValue * angle * 3 + z) + 1) / 2) * (255 - radius * 0.1) % 255;
      let g = ((sin( noiseValue * radius * 0.01 + z) + 1) / 2) * (255 - radius * 0.01) % 255;
      let b = ((sin( noiseValue * angle * 5 + z) + cos(radius * 0.01 + z) + 2) / 4) * 255 % 255;

      // Set the pixels on the canvas
      pixels[index] = r; // Red
      pixels[index + 1] = g; // Green
      pixels[index + 2] = b; // Blue
      pixels[index + 3] = 255; // Alpha (opacity)
    }
  }

  updatePixels(); // Update the canvas with the pixel[] array data
  
    // Increment z slightly on each frame to animate the pattern over time
    z += 0.01; // Adjust this value to change the speed of the animation

    // for capture
    if (recording) {
        capture.capture(document.getElementById("canvas"));
    }

}
