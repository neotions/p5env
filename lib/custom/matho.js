const assert = function(condition, message) {
    if (!condition)
        throw Error('Assert failed: ' + (message || ''));
};


class Matrix{
  
  constructor(dim, fill = 0){
    this.size = dim
    this.mat = this._init_mat(fill)
  }
  
  _init_mat(fill){
    let mat = []
    let row;
    for(let i = 0; i < this.size[0]; i++){
      row = []
      for(let j = 0; j < this.size[1]; j++){
        row.push(fill)
      }
      mat[i] = row
    }
    return mat
  }
  
  print(){
    let repr = "["
    let row;
    for(let i = 0; i < this.size[0]; i++){
      row = "["
      for(let j = 0; j < this.size[1]; j++){
        row += this.mat[i][j]
        if (j < this.size[1] - 1){
          row += ","
        }
      }
      row += "]"
      
      if(i < this.size[0] - 1){
        row += "\n"
      }
      repr += row      
    }
    repr += "]"
    print(repr)
  }
  
  transpose(){
    let flipped_dim = [this.size[1], this.size[0]]
    let m = new Matrix(flipped_dim)
    
    for(let i = 0; i < this.size[0]; i++){
      for(let j = 0; j < this.size[1]; j++){
        m.mat[j][i] = this.mat[i][j].valueOf()
      }
    }
    return m
  }
  
  // alias
  T(){return this.transpose()}
  
  static _vdot(a, b){
    
    // Traditional dot product of n dim vectors
    // Expects javascript arrays
    
    assert(a.length == b.length, 
           "bad length vectors ${a.length} and ${b.length}")
    
    let total = 0
    for(let i = 0; i < a.length; i++){
      total += a[0]*b[0]
    }
    return total
  }
  
  static dot(A, B){
    
    let size = [A.size[0], B.size[1]]
    let C = new Matrix(size)
    let B_t = B.T()
    for(let i = 0; i < size[0]; i++){
      for(let j = 0; j < size[1]; j++){
        C.mat[i][j] = Matrix._vdot(A.mat[i], B_t.mat[j])
      }
    }
    return C
  }
  
  dot(B){
    return Matrix.dot(this, B)
  }
  
  static _element_op(A, B, op){
    
    let C = new Matrix(A.size)
    for(let i = 0; i < C.size[0]; i++){
      for(let j = 0; j < C.size[1]; j++){
        C.mat[i][j] = op(A.mat[i][j], B.mat[i][j])
      }
    }
    return C
  }
  
  static add(A, B){
    return Matrix._element_op(A, B, (a, b) => a + b)
  }
  
  static sub(A, B){
    return Matrix._element_op(A, B, (a, b) => a - b)
  }
  
  static mul(A, B){
    return Matrix._element_op(A, B, (a, b) => a * b)
  }
  
  static div(A, B){
    return Matrix._element_op(A, B, (a, b) => a / b)
  }
  
  static mod(A, B){
    return Matrix._element_op(A, B, (a, b) => a % b)
  }
  
  add(B){return Matrix.add(this, B)}
  sub(B){return Matrix.sub(this, B)}
  mul(B){return Matrix.mul(this, B)}
  div(B){return Matrix.div(this, B)}
  mod(B){return Matrix.mod(this, B)}

  
}

function setup() {
  createCanvas(400, 400);

  m = new Matrix([2, 3], 2)
  n = new Matrix([3, 2], 3)
  
  // m.mat[1][0] = 10
  m.print()
  // m.T().print()
  
  C = m.dot(n)
  C.print()
  
  C = Matrix.dot(m, n)
  C.print()
  D = new Matrix(C.size, 2)
  one = new Matrix(C.size, 1)
  Matrix.sub(C.mul(D), one).print()

}


function vsub(a, b){
  return [a[0] - b[0], a[1] - b[1]]
}

function vadd(a, b){
  return [a[0] + b[0], a[1] + b[1]]
}

function scmul(a, v){
  
  // scalar multiplication of vector
  
  v_new = []
  for (var i = 0; i < v.length; i++) {
    v_new.push(v[i]*a)
  }
  return v_new
}

function vaddn(){
  
  x = 0;
  y = 0;
  for (var i = 0; i < arguments.length; i++) {
    x += arguments[i][0];
    y += arguments[i][1];
  }
  return [x, y]
}

function vmag(a){
  return sqrt(a[0]**2 + a[1]**2);
}

function vdot(a, b){  
  return a[0] * b[0] + a[1] * b[1]
}

function mat2v(A, b){
  
  new_v = []
  
  for (row = 0; row < A.length; row++){
    new_v.push(vdot(A[row], b))
  }
  return new_v
}

function rot2(theta, v){
  
  c = cos(theta)
  s = sin(theta)
  R = [[c, -s],
      [s, c]]
  
  return mat2v(R, v)
}

function bsin(x, min, max){
  //sin wave with bounded max and min
  
  return sin(x)*(max - min)/2 + (max + min)/2
}