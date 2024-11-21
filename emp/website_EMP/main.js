//CLOCK ////////////////////////////////////////////////////////////////////////

// Set the date we're counting down 
var countDownDate = new Date("MAR 26, 2025 19:00:00").getTime()
// Update the count down every 1 second
var time = setInterval(function() {

// Get today's date and time
var now = new Date().getTime();

// Find the distance between now and the count down date
var distance = countDownDate - now;

// Time calculations for days, hours, minutes and seconds
var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);


// Display the result in the element with id="demo"
// document.getElementById("timer").innerHTML = days + "d " + hours + "h "
// + minutes + "m " + seconds + "s ";
document.getElementById("timer").innerHTML = days + "d " + hours + "h ";

// If the count down is finished, write some text
if (distance < 0) {
  clearInterval(time);
  document.getElementById("demo").innerHTML = "INSERT DATE";
  }
}, 1000);

// function myFunction() {
//    var element = document.body;
//    element.classList.toggle("dark-mode");
//     }

//LANGUAGE SETTING /////////////////////////////////////////////////////////////

var currentlanguage = 'fr'
function changelang(){
if (currentlanguage == 'en'){
document.head.insertAdjacentHTML('beforeend', '<style>.bilanguage::after {content: attr(data-fr);}</style>');
currentlanguage = 'fr'
} else {
document.head.insertAdjacentHTML('beforeend', '<style>.bilanguage::after {content: attr(data-en);}</style>');
currentlanguage = 'en'
}
}

/// DARK MODE ///



//// SKETCH /////////////////////////////////////////////////////////////////////

//GRAPHIC SETTINGS
let scl = 100;
let w = 1000;
let h = 6000;
let cols = w / scl;
let rows = h / scl;
let diff = 1000;
let xyScale = 1;
const timeScale = 0.005;

// CAMERA
let cam;
let delta = 0.004;

//CANVAS
var canvas;

//COLOR

//variable for button
let myButton;
//variable for canvas background color
let bgColor;
//variables for color options using hex values (so we can use the same color for p5 and CSS)
let white = "#fff";
let black = "#000";
let waveColor = 'rgba(29, 185, 84, 0.2)';




function setup() {

  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas = createCanvas(w, h, WEBGL);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  setInterval(() => (frameRate()),30);
  //colorMode(HSB);

    cam = createCamera();

    cam.setPosition(0, 0,1100);
  
    cam.lookAt(0, 0, 0);
      // Set its fovy to 0.2.
      // Set its aspect to 1.5.
      // Set its near to 600.
      // Set its far to 1200.
    cam.perspective(8, 2.5, 1000, 400);

    // DARK MODE

    //set the initial background color to black // black / white 
    bgColor = black;

}



let terrain = (function(){
  let t = [];
  for (let i=0; i<rows*cols; ++i) t.push(0);
  return t;
})();

function getZ(x, y) {
  return map(noise(x*xyScale, y*xyScale), 0, 1, -diff, diff);
}

function draw() {
  
  background(bgColor);
  
  r = map(mouseX, 0, window.innerWidth, 0, 255)
  g = map(mouseY, 0, window.innerWidth, 255, 0)
  b = map(mouseY, 0, window.innerWidth, 255, 0)
  
  stroke(waveColor);

  strokeWeight(5);
  noFill();
  frameRate(60);
  push();
  rotateZ(PI/2);
  translate(-w/2,-h/2);



  //let terrain = emptyTerrain();
  for (let y = 0; y < rows; ++y) {
    for (let x = 0; x < cols; ++x) {
      terrain[x+y*rows] = getZ(x, (y-frameCount)*timeScale);
    }
  }

  for (let y = 0; y < rows-1; ++y) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; ++x) {
      vertex(x*scl, (y+0)*scl, terrain[x+(y+0)*rows]);
      vertex(x*scl, (y+1)*scl, terrain[x+(y+1)*rows]);
    }
    endShape();
  }

  pop();
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

