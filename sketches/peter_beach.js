var pts;

function randint(low, high){
    return floor(random()*(high - low) + low)
}   

function v_add(a, b){

    c = []
    for (i = 0; i < a.length; i++){
        c.push(a[i] + b[i])
    }
    return c
}

function v_sub(a, b){

    c = []
    for (i = 0; i < a.length; i++){
        c.push(a[i] - b[i])
    }
    return c
}

function v_mul(a, sc){
    c = []
    for (i = 0; i < a.length; i++){
        c.push(a[i]*sc)
    }
    return c
}

function dot(a, b){
    total = 0
    for (i = 0; i < a.length; i++){
        total = a[i] * b[i]
    }
    return total
}

function mag(a){

    return sqrt(dot(a))
}

function setup(){
    createCanvas(800,800);
}

circle_pos = [0, 0, 10]
circle_r = 200
MAX_STEPS = 200

function dist(pos){

    return mag(v_sub(circle_pos, pos))
}

function march(ro, rd){

    t = 0
    e = 0.000001
    for (i = 0; i < MAX_STEPS; i++){
        
        pos = v_mul(rd, t)

        if (dist(pos) < e){

            // touching
            return true
        }

        t += dist(pos)
    }

    return false
}

e_size = 16
cam_pos = [0, 0, -10]

circle_pos = [0, 0, 100]
circle_r = 20

function draw() {
    background(255)

    // for(i = 0; i < width; i += e_size){
    //     for(j = 0; j < height; j += e_size){
    //         x = i - width/2
    //         y = j - height/2

    //         // ray_dir = screen pos - cam_pos
    //         ray_dir = v_sub([x, y, 0], cam_pos)
    //         ray_dir = v_mul(ray_dir, 1/mag(ray_dir))

    //         // touch = march(cam_pos, ray_dir)
    //         touch = true
    //         rect(i, j, e_size, e_size)

    //         if (touch == true){
    //             fill(255, 0, 0)
    //         }
    //         else{
    //             fill(0, 255, 0)
    //         }
    //     }
    // }

    // for (i = 0; i < arr.length; i++){
    //     x = pts[i][0]
    //     y = pts[i][1]

    //     circle(x, y, 50)
    // }

    fill(0, 255, 0)
    // randint(1, 2)
}