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