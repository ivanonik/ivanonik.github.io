let w;
let h; 

let offset = 10;
let x = 100;

function setup() {
    w = window.innerWidth
    h = window.innerHeight;
    let cnv = createCanvas(w, h);
    background(200);

    // Positions the canvas at the top-left corner
    // of the window with a 'fixed' position type.
    cnv.position(0, 0, 'fixed');
    cnv.style('z-index','-1');
    //look at index.html to see that we have move the script tag referencing sketch.js into <head> and we have made a div with the id "div1" that will hold the sketch
  }
  
  function draw(){
    background(0);
   
    noFill();
    strokeWeight(1);


    push();

      stroke(204, 85, 0);
      // translate(width/2, height/2);
      
      rotate(radians( frameCount * 0.008) );
      for(let i = 0; i < width; i += offset){
        ellipse(i-x, -x, i-x);
      }

    pop();
    
    push();
      stroke(85, 0, 204);
      translate(0, height);

      rotate(radians( frameCount * -0.008) );
      
      for(let i = 0; i < height; i += offset){
        ellipse(i-x, +x, i-x);
      }
    pop();

  }

  function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
  }