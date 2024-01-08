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



    // for capture
    if (recording) {
        capture.capture(document.getElementById("canvas"));
    }

}
