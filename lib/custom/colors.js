let colors = 0;
let color_amt = 5;

function shades(start,amt,variance) {
  let palette = [start]
  for (i=1;i<(amt+1);i++) {
    let color = [start[0],start[1],(palette[i-1][2]+variance)%100];
    palette.push(color);
  }
  return palette;
}

function split_triadic(start) {
  let color2 = [(start[0]+120)%360,start[1],start[2]];
  let color3 = [(color2[0]+30)%360,start[1],start[2]];
  let color4 = [(color3[0]+180)%360,start[1],start[2]];
  let color5 = [(color4[0]+30)%360,start[1],start[2]];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}

function monochromatic_analogous(start) {
  let color2 = [(start[0]+30)%360,start[1]/2,start[2]/2];
  let color3 = [(start[0]+60)%360,start[1]/4,start[2]/4];
  let color4 = [(start[0]+330)%360,start[1]/2,start[2]/2];
  let color5 = [(start[0]+300)%360,start[1]/4,start[2]/4];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}


function pastel(start) {
  let color2 = [start[0],Math.min(100,start[1]+20),Math.min(100,start[2]+20)];
  let color3 = [start[0],Math.min(100,start[1]+40),Math.min(100,start[2]+40)];
  let color4 = [start[0],Math.min(100,start[1]+60),Math.min(100,start[2]+60)];
  let color5 = [start[0],Math.min(100,start[1]+80),Math.min(100,start[2]+80)];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}

function triadic_complementary(start) {
  let color2 = [(start[0]+120)%360,start[1],start[2]];
  let color3 = [(start[0]+240)%360,start[1],start[2]];
  let color4 = [(color2[0]+180)%360,start[1],start[2]];
  let color5 = [(color3[0]+180)%360,start[1],start[2]];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}

function technicolor(start) {
  let color2 = [(start[0]+60)%360,1,1];
  let color3 = [(start[0]+120)%360,1,1];
  let color4 = [(start[0]+240)%360,1,1];
  let color5 = [(start[0]+180)%360,0.2,0.8];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}


function sepia_toning(start) {
  let color2 = [(start[0]+30)%360,0.4,0.8];
  let color3 = [(start[0]+60)%360,0.6,0.6];
  let color4 = [(start[0]+90)%360,0.8,0.4];
  let color5 = [(start[0]+180)%360,0.2,0.8];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}



function gradient_analogous(start) {
  let color2 = [(start[0]+30)%360,Math.min(100,start[1]+20),start[2]];
  let color3 = [(start[0]+60)%360,Math.min(100,start[1]+40),start[2]];
  let color4 = [(start[0]+330)%360,Math.min(100,start[1]+60),start[2]];
  let color5 = [(start[0]+300)%360,Math.min(100,start[1]+80),start[2]];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}



function saturated(start) {
  let color2 = [start[0],Math.min(100,start[1]+20),start[2]];
  let color3 = [start[0],Math.min(100,start[1]+40),start[2]];
  let color4 = [start[0],Math.min(100,start[1]+60),start[2]];
  let color5 = [start[0],Math.min(100,start[1]+80),start[2]];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}



function neutral(start) {
  let color2 = [0,0,Math.max(0,start[2]-10)];
  let color3 = [0,0,Math.max(0,start[2]-20)];
  let color4 = [0,0,Math.max(0,start[2]-30)];
  let color5 = [0,0,Math.max(0,start[2]-40)];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}


function cool_to_warm(start) {
  let color2 = [(start[0]+60)%360,start[1],start[2]];
  let color3 = [(start[0]+120)%360,start[1],start[2]];
  let color4 = [(start[0]+240)%360,start[1],start[2]];
  let color5 = [(start[0]+300)%360,start[1],start[2]];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}



function desaturated_complementary(start) {
  let color2 = [(start[0]+180)%360,start[1],Math.max(0,start[2]-20)];
  let color3 = [(start[0]+180)%360,start[1],Math.max(0,start[2]-40)];
  let color4 = [(start[0]+180)%360,start[1],Math.max(0,start[2]-60)];
  let color5 = [(start[0]+180)%360,start[1],Math.max(0,start[2]-80)];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}



function gradient(start,amt,sharpness, forward) {
  let palette = [start]
  for (i=1;i<(amt+1);i++) {

    let color = [(palette[i-1][0]+sharpness)%360,start[1],start[2]];
    
    palette.push(color);
  }
  console.log(palette)
  return palette;
}

function split_compliment(start,split) {
  
  let color2 = [(start[0]+180)%360,start[1],start[2]];
  let color3 = [(color2[0]+ split)%360,start[1],start[2]];
  let color4 = [(color3[0]+180)%360,start[1],start[2]];
  let color5 = [start[0],start[1],abs(start[2]-(split+20))];
  
  let palette = [start,color2,color3,color4,color5];
  return palette; 
}

function tetradic(start) {
  let color1 = [(start[0]+30)%360,random(40,100),start[2]];
  let color2 = [color1[0],random(40,100),(start[2]+80)%100];
  let color3 = [(color2[0]+120)%360,random(40,100),start[2]];
  let color4 = [(color3[0]+60)%360,random(40,100),start[2]];
  let color5 = [(color4[0]+120)%360,random(40,100),start[2]];
  let palette = [color1,color2,color3,color4,color5];
  
  return palette;
}

function compliment(start) {
  let color2 = [(start[0]+180%360),start[1],start[2]];
  palette = [start,color2];
  return palette; 
}

function analog_compliment(start) {
  
  let color2 = [(start[0]+30)%360,start[1],start[2]];
  let color3 = [(color2[0]+150)%360, start[1], start[2]];
  let color4 = [(color3[0]+150)%360,start[1],start[2]];
  let color5 = [start[0],start[1],start[2]-50];
  let palette = [start,color2,color3,color4,color5];
  
  return palette;
 }

function triad(start) {
  let color2 = [(start[0]+90)%360,start[1],start[2]];
  let color3 = [(color2[0]+90)%360,start[1],start[2]];
  let palette = [start,color2,color3];
    
  return palette;
}