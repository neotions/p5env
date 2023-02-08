// code related to creation and drawing of flow (vector) fields


class noise_field {
    constructor(width,height,gap,smooth,detail) {

        this.width = width;
        this.height = height;
        this.gap = gap;
        this.smooth = smooth
        this.field = {}
        noiseDetail(detail);
        
        for(let i = 0; i < this.height; i += this.gap) {
            for (let j = 0; j < this.width; j += this.gap) {
                this.x = noise(j/this.smooth) * gap;
                this.y = noise(i/this.smooth) * gap;
                this.vector = createVector(this.x, this.y);
                this.vector.normalize();
                

                // Turn two ints into a string separated by a comma
                key = i + "," + j;

                this.field[key] = this.vector;

                /* Turn string back into two ints, use later
                let arr = str.split(",");
                let int1_new = parseInt(arr[0]);
                let int2_new = parseInt(arr[1]);
                */

            }
        }

    }

    render() {

        for(let i = 0; i < this.height; i += this.gap) {
            for(let j = 0; j < this.width; j += this.gap) {
                
                this.tile = createGraphics(this.gap, this.gap);  
                key = j + "," + i;
                this.v = this.field[key];
                this.tile.line(0,0,this.v.x * this.gap,this.v.y * this.gap);

                image(this.tile,i,j);
                
            }
        }
    }

}