let sz;
let backButton;
let myslider;
let mypara;
let maxx = 1;
let minx = -2;
let maxy = 1.5;
let miny = -1.5;


function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  mypara = createP(`real part min ${minx} imaginary part min  ${miny}`)
  myslider = createSlider(1, 5, 2);
  myslider.changed(showmandel);
  backButton = createButton("Back to start");
  backButton.mousePressed(keyPressed);
  showmandel();
}

function mandelbrot(z, num) {
  //takes a [real,imag] and num is number of times
  // returns diverg count
  let count = 0;
  let z1 = z;
  while (count <= num) {
    //check for diverg
    if (cMag(z1) > 2.0) {

      return count;

    }

    z1 = cAdd(cSqr(z1), z); // z^2+c  mandelbrot equ
    count++

  }
  return num // return the num if it doesnt diverge

}

function cAdd(a, b) {
  // adds complex number  [real,imag]
  return [a[0] + b[0], a[1] + b[1]];
}

function cMult(u, v) {
  // mutiplys a complex number [real,imag]
  return [u[0] * v[0] - u[1] * v[1], u[0] * v[1] + u[1] * v[0]];

}

function cSqr(u) {
  // (a+bi)^2 = (a+bi)(a+bi) = a^2 +2abi +b^2 i^2= 
  // i^2 = -1 so (a^2-b^2)+2abi [real ,imaginary] 
  return [(u[0] * u[0]) - (u[1] * u[1]), 2 * (u[0] * u[1])]

}

function cMag(z) {

  // a^2 +b^2 = c^2 [real,imag]
  return sqrt(z[0] * z[0] + z[1] * z[1]);

}

function mouseClicked() {
  if (mouseY <= height) { // so the slider works.the slider is off the 
    // canvas so only update to mouse position
    // when clicked on the cavas
    let newminx = minx;
    let newminy = miny;
    newminx = map(mouseX, 0, width, minx, maxx);
    maxx = newminx + 0.1;
    minx = newminx;

    newminy = map(mouseY, height,0, miny, maxy);// n.b. height for y is in negative

    maxy = newminy + 0.1;
    miny = newminy;
    mypara.html(`real part min ${minx} imaginary part min  ${miny}`)
    console.log(minx, miny);
    showmandel();
  }

}



function keyPressed() {
  maxx = 1;
  minx = -2;
  maxy = 1.5;
  miny = -1.5;
  mypara.html(`real part min ${minx} imaginary part min  ${miny}`)
  showmandel();


}

function showmandel() {
  background(0);
  sz = myslider.value();
  for (let x = 0; x < width; x += sz) {
    for (let y = 0; y < height; y += sz) {

      let a = map(x, 0, width, minx, maxx); //real part
      //let a = map(x, 0, width, -0.25,0.25); //real part
      let b = map(y, height, 0, miny, maxy); // imaginary part n.b. height for y is min 
      // let b = map(y, 0, height,-1,-0.5); // imaginary part
      let col = mandelbrot([a, b], 100);
      if (col == 100) {
        stroke(0); // in the set

      } else {

        stroke(col * 30 % 255, 255, 255); // modulo that color number
        //stroke(255-15*col,255,255);

      }
      point(x, y)


    }

  }

}