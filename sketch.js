let ballArray = [];
let paused;
let laserArray = [];
let cooldown = 0;
let score = 0;

let myXPos = 250;
let myYPos = 400;

function laser(x, y, speed) {
    laserArray.push(new Laser(x, y, speed));
}

function overlap(a) {
    for (let i = 0; i < ballArray.length; i++) {
        let b = ballArray[i];
        if (dist(b.xPos, 1, a, 1) < 35) {
            return true;
        }
    }
    return false;
}

function setup() {
    createCanvas(500, 500);
    frameRate(60);
    rectMode(CENTER);
    noStroke();

    for (let i = 0; i < 7; i++) {
        let tempx;
        let attempts = 0;

        do {
            tempx = random(25, 475);
            attempts++;
        } while (overlap(tempx) && attempts < 100);

        let temp = new Ball(tempx, random(-75, -25), random(0.1, 1));
        ballArray.push(temp);
    }
}

function draw() {
    background(0, 0, 0, 40);
    fill(255, 255, 255);
    rect(myXPos, myYPos, 50, 50);

    if (keyIsDown(LEFT_ARROW)) myXPos -= 3;
    if (keyIsDown(RIGHT_ARROW)) myXPos += 3;
    if (keyIsDown(UP_ARROW)) myYPos -= 3;
    if (keyIsDown(DOWN_ARROW)) myYPos += 3;
    
    if (keyIsDown(83) && cooldown > 30) { // 'S' key
        laser(myXPos, myYPos, 10);
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

        if (!(myLeft > b.right || myRight < b.left || myTop > b.bottom || myBottom < b.top)) {
            noLoop();
            fill(255);
            textSize(20);
            textAlign(CENTER);
            text("You lose to ball " + (i + 1) + "\nPress R to reset", 250, 460);
        }
    }

    for (let i = ballArray.length-1; i >= 0; i--) {
        for (let j = 0; j < laserArray.length; j++){
            let b = ballArray[i];
            let l = laserArray[j];

            l.left = l.xPos - 2.5;
            l.right = l.xPos + 2.5;
            l.top = l.yPos - 15;
            l.bottom = l.yPos + 15;

            if (!(l.left > b.right || l.right < b.left || l.top > b.bottom || l.bottom < b.top)) {
                score +=5;
                b.yPos = 526;
            }
        }
    }

    for (let i = 0; i < ballArray.length; i++) {
        fill(255, 255, 255);
        circle(ballArray[i].xPos, ballArray[i].yPos, 50);

        ballArray[i].yPos += ballArray[i].speedValue;

        if (ballArray[i].yPos > 525) {
            ballArray[i].yPos = -25;
            ballArray[i].speedValue = random(0.5, 1);
            ballArray[i].xPos = random(0, 500);
        }
    }

    for (let i = laserArray.length - 1; i >= 0; i--) {
        fill(255, 0, 0);
        rect(laserArray[i].xPos, laserArray[i].yPos, 5, 30);

        laserArray[i].yPos -= laserArray[i].speedValue;

        if (laserArray[i].yPos < -30) {
            laserArray.splice(i, 1);
        }
    }

    myXPos = constrain(myXPos, 25, 475);
    myYPos = constrain(myYPos, 25, 475);

    cooldown++;
}

function keyPressed() {
    if (key === "p" || key === "P") {
        paused = !paused;
        if (paused) {
            noLoop();
        } else {
            loop();
        }
    }

    if (key === "r" || key === "R") {
        score = 0;
        myXPos = 250;
        myYPos = 400;
        ballArray.length = 0;
        laserArray.length = 0;

        for (let i = 0; i < 7; i++) {
            let tempx;
            let attempts = 0;
            do {
                tempx = random(25, 475);
                attempts++;
            } while (overlap(tempx) && attempts < 100);

            let temp = new Ball(tempx, random(-75, -25), random(0.1, 1));
            ballArray.push(temp);
        }
        paused = false;
        loop();
    }
}

class Ball {
    constructor(x, y, speed) {
        this.xPos = x;
        this.yPos = y;
        this.speedValue = speed;
        this.left = this.xPos - 25;
        this.right = this.xPos + 25;
        this.top = this.yPos - 25;
        this.bottom = this.yPos + 25;
    }
}

class Laser {
    constructor(x, y, speed) {
        this.xPos = x;
        this.yPos = y;
        this.speedValue = speed;
        this.left = this.xPos - 2.5;
        this.right = this.xPos + 2.5;
        this.top = this.yPos - 15;
        this.bottom = this.yPos + 15;
    }
}
