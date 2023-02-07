// code related to creation and drawing of flow (vector) fields


class flowfield {
    constructor(width,height,gap) {

        this.width = width;
        this.height = height;
        this.gap = gap;

    }

    noise_field() {

        let field = []
        
        for(i = 0; i < this.height; i += gap) {
            for (j = 0; j < this.width; j += gap) {
                x = noise(j) * gap;
                y = noise(i) * gap;
                vector = createVector(x, y);
                vector.normalize();
                field.push(vector);
            }
        }
        return field;
    }

    render() {

        for(y = 0; y < this.height; y += this.gap) {
            for(x = 0; x < this.width; x += this.gap) {
                tile = createGraphics(this.gap, this.gap);  
            }
        }
    }

}