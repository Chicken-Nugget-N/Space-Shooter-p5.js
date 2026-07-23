let ballArray = [];
let paused;


let myXPos = 200;
let myYPos = 350;




function setup() {
   createCanvas(500, 500);
    frameRate(60);


    rectMode(CENTER);
   for (let i = 0; i < 50; i++) {
       let temp = new Ball(random(0, 500), random(-25,500), random(3,5));
       ballArray.push(temp);
   }
   noStroke();
}








function draw() {
   background(0,0,0,40);
    rect(myXPos,myYPos,50,50);


    if (keyIsDown(LEFT_ARROW)) myXPos -= 3;
    if (keyIsDown(RIGHT_ARROW)) myXPos += 3;
    if (keyIsDown(UP_ARROW)) myYPos -= 3;
    if (keyIsDown(DOWN_ARROW)) myYPos += 3;










   for (let i = 0; i < ballArray.length; i++) {
        fill(255,255,255)
       circle(ballArray[i].xPos, ballArray[i].yPos, 50);








       ballArray[i].yPos += ballArray[i].speedValue;








       if (ballArray[i].yPos > 525) {
           ballArray[i].yPos = -25;
           ballArray[i].speedValue = random(3,5);
           ballArray[i].xPos = random(0,500);
       }
   }
   myXPos = constrain(myXPos, 25, 475);
    myYPos = constrain(myYPos, 25, 475);


}




function keyPressed() {


    // Pause
    if (key === "p") {


        paused = !paused;


        if (paused) {
            noLoop();
        } else {
            loop();
        }


    }
}


class Ball {
   constructor(x, y, speed) {
       this.xPos = x;
       this.yPos = y;
       this.speedValue = speed;
       this.left = this.xPos-25;
       this.right = this.xPos+25;
       this.top = this.yPos-25;
       this.bottom = this.yPos+25;
   }
}
