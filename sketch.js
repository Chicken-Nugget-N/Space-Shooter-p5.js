let ballArray = [];
let paused;
let laserArray = [];
let cooldown=0;


let myXPos = 200;
let myYPos = 350;


function laser(x,y,speed){
    laserArray.push(new Laser(x, y, speed))
}

function setup() {
   createCanvas(500, 500);
    frameRate(60);


    rectMode(CENTER);
   for (let i = 0; i < 7; i++) {
       let temp = new Ball(random(0, 500), random(-75,-25), random(0.1,1));
       ballArray.push(temp);
   }
   noStroke();
}








function draw() {
   background(0,0,0,40);
   fill(255,255,255)
    rect(myXPos,myYPos,50,50);


    if (keyIsDown(LEFT_ARROW)) myXPos -= 3;
    if (keyIsDown(RIGHT_ARROW)) myXPos += 3;
    if (keyIsDown(UP_ARROW)) myYPos -= 3;
    if (keyIsDown(DOWN_ARROW)) myYPos += 3;
    if (keyIsDown(83) && cooldown > 30) {
        laser(myXPos,myYPos,10);
        cooldown = 0;
    } 
    let myLeft = myXPos - 25;
    let myRight = myXPos + 25;
    let myTop = myYPos - 25;
    let myBottom = myYPos + 25;

    


    for (let i = 0; i < ballArray.length; i++) {
        let b = ballArray[i];   

        b.left = b.xPos - 25;
        b.right = b.xPos + 25;
        b.top = b.yPos - 25;
        b.bottom = b.yPos + 25; 

        if (!(myLeft > b.right ||
              myRight < b.left ||
              myTop > b.bottom ||
              myBottom < b.top)) {

            noLoop();
            fill(255);
            textSize(20);
            textAlign(CENTER);
            text("You lose to ball " + (i + 1) + "\nPress R to reset", 250, 460);

    }
}







   for (let i = 0; i < ballArray.length; i++) {
        fill(255,255,255)
       circle(ballArray[i].xPos, ballArray[i].yPos, 50);

       ballArray[i].yPos += ballArray[i].speedValue;

       if (ballArray[i].yPos > 525) {
           ballArray[i].yPos = -25;
           ballArray[i].speedValue = random(0.5,1);
           ballArray[i].xPos = random(0,500);
       }
   }

   for (let i = 0; i < laserArray.length; i++) {
        fill(255,0,0)
       rect(laserArray[i].xPos, laserArray[i].yPos, 5,30);

       laserArray[i].yPos -= laserArray[i].speedValue;

       if (laserArray[i].yPos > 525) {
        laserArray.splice(indexOf(laserArray[i]),1);
       }
   }
   myXPos = constrain(myXPos, 25, 475);
    myYPos = constrain(myYPos, 25, 475);

   cooldown++
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

class Laser {
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
