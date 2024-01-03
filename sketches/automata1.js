function setup() {
    const canvas = createCanvas(400,400);


    gap = width/10;

    noLoop();

    amp = 5;

}



function draw() {

    let rows = []


    for (let row = 0; row < height/gap; gap++) {

        let columns = []

        for (let column = 0; column < width/gap; column++) {

            let n = noise(column * amp,row * amp) * 255

            if (n > 0.50) {
                v = true
            }

            else {
                v = false
            }

            
            columns.push(v)
        }

        rows.push(columns);
    }

    

    for (let y = 0; y < height; y += gap) {

        row_index = y / gap

        for (let x = 0; x < width; x += gap) {

            column_index = x / gap

            if(rows[row_index][column_index]) {
                fill(255);
            }
            else {
                fill(0)
            }

            square(x,y,gap);
        }
    }

}
