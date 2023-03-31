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


// generated with chatgpt

function analogous_complementary(start) {
  let color2 = [(start[0]+30)%360,start[1],start[2]];
  let color3 = [(start[0]+60)%360,start[1],start[2]];
  let color4 = [(color2[0]+180)%360,start[1],start[2]];
  let color5 = [(color3[0]+180)%360,start[1],start[2]];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}

function dark_analogous(start) {
  let color2 = [(start[0]+30)%360,start[1],Math.max(0,start[2]-20)];
  let color3 = [(start[0]+60)%360,start[1],Math.max(0,start[2]-40)];
  let color4 = [(start[0]+90)%360,start[1],Math.max(0,start[2]-60)];
  let color5 = [(start[0]+120)%360,start[1],Math.max(0,start[2]-80)];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}

function pastel_triadic(start) {
  let color2 = [(start[0]+120)%360,0.2,0.8];
  let color3 = [(start[0]+240)%360,0.2,0.8];
  let color4 = [(start[0]+60)%360,0.4,0.6];
  let color5 = [(start[0]+300)%360,0.4,0.6];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}

function gradient_complementary(start) {
  let color2 = [(start[0]+180)%360,Math.min(100,start[1]+20),start[2]];
  let color3 = [(start[0]+210)%360,Math.min(100,start[1]+40),start[2]];
  let color4 = [(start[0]+30)%360,Math.min(100,start[1]+60),start[2]];
  let color5 = [(start[0]+60)%360,Math.min(100,start[1]+80),start[2]];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}

function complementary_analogous_triadic(start) {
  let color2 = [(start[0]+180)%360,start[1],start[2]];
  let color3 = [(start[0]+30)%360,start[1],start[2]];
  let color4 = [(color3[0]+120)%360,start[1],start[2]];
  let color5 = [(color2[0]+210)%360,start[1],start[2]];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}

function pale_complementary(start) {
  let color2 = [(start[0]+180)%360,0.2,0.8];
  let color3 = [(start[0]+60)%360,0.2,0.8];
  let color4 = [(start[0]+120)%360,0.4,0.6];
  let color5 = [(start[0]+300)%360,0.4,0.6];
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

function film_noir(start) {
  let color2 = [(start[0]+30)%360,0.5,0.5];
  let color3 = [(start[0]+60)%360,0.5,0.5];
  let color4 = [(start[0]+90)%360,0.5,0.5];
  let color5 = [(start[0]+180)%360,0.2,0.8];
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

function desert(start) {
  let color2 = [(start[0]+30)%360,1,0.8];
  let color3 = [(start[0]+60)%360,1,0.6];
  let color4 = [(start[0]+90)%360,1,0.4];
  let color5 = [(start[0]+180)%360,0.2,0.8];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}

function vintage(start) {
  let color2 = [(start[0]+30)%360,0.8,0.8];
  let color3 = [(start[0]+60)%360,0.6,0.6];
  let color4 = [(start[0]+90)%360,0.4,0.4];
  let color5 = [(start[0]+180)%360,0.2,0.8];
  let palette = [start,color2,color3,color4,color5];
  return palette;
}

function vibrant(start) {
  let color2 = [(start[0]+120)%360, Math.min(100, start[1]+30), start[2]];
  let color3 = [(start[0]+240)%360, Math.min(100, start[1]+30), start[2]];
  let color4 = [(start[0]+60)%360, Math.min(100, start[1]+60), start[2]];
  let color5 = [(start[0]+300)%360, Math.min(100, start[1]+60), start[2]];
  let palette = [start, color2, color3, color4, color5];
  return palette;
}

function pastel_rainbow(start) {
  let color2 = [(start[0]+60)%360, 0.4, 0.9];
  let color3 = [(start[0]+120)%360, 0.4, 0.9];
  let color4 = [(start[0]+240)%360, 0.4, 0.9];
  let color5 = [(start[0]+300)%360, 0.4, 0.9];
  let palette = [start, color2, color3, color4, color5];
  return palette;
}










