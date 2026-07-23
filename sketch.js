let ballArray = [];
let paused;
let laserArray = [];
let cooldown = 0;
let score = 0;

let myXPos = 250;
let myYPos = 400;

let enemySpeed = 1.5;

let state = 'start screen';

let ballSlider;
let speedSlider;
let startButton;

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

    startScreen();
}

function startScreen(){
    ballSlider = createSlider(5, 15, 5, 1);
    ballSlider.position(150, 220);
    ballSlider.size(200);

    speedSlider = createSlider(0.1, 5.0, 1.5, 0.1);
    speedSlider.position(150, 310);
    speedSlider.size(200);

    startButton = createButton('go shoot stuf');
    startButton.position(175, 380);
    startButton.size(150, 40);
    startButton.style('cursor', 'pointer');
    startButton.mousePressed(startGame);
}

function startGame() {

    startingBallCount = ballSlider.value();
    enemySpeed = speedSlider.value();

    ballSlider.hide();
    speedSlider.hide();
    startButton.hide();

    ballArray = [];
    for (let i = 0; i < startingBallCount; i++) {
        let tempx;
        let attempts = 0;

        do {
            tempx = random(25, 475);
            attempts++;
        } while (overlap(tempx) && attempts < 100);

        let temp = new Ball(tempx, random(-75, -25), random(enemySpeed, enemySpeed + 1.5));
        ballArray.push(temp);
    }

   
    state = "game";
}

function draw() {
    if (state === 'start screen') {
        background(20, 20, 35); 

     
        fill(255);
        textAlign(CENTER);
        textSize(36);
        text("Ball Shooty Thingy", 250, 100);

        textSize(14);
        fill(180);
        text("u gotta dodge the red balls and then shoot them. \nu can shoot with s button n move with arrow keys", 250, 140);

   
        fill(255);
        textSize(18);
        textAlign(LEFT);
        text("ball amount: " + ballSlider.value(), 150, 210);

  
        text("ball fastness: " + speedSlider.value().toFixed(1) + "x", 150, 300);

    } else if (state === "game") {
        background(0, 0, 0, 40);
        fill(100, 255, 100);
        rect(myXPos, myYPos, 50, 50);

        if (keyIsDown(LEFT_ARROW)) myXPos -= 3;
        if (keyIsDown(RIGHT_ARROW)) myXPos += 3;
        if (keyIsDown(UP_ARROW)) myYPos -= 3;
        if (keyIsDown(DOWN_ARROW)) myYPos += 3;
        
        if (keyIsDown(83) && cooldown > 30) { // 'S' key
            laser(myXPos, myYPos, 10);
            cooldown = 0;
        }

        for (let i = 0; i < ballArray.length; i++) {
            fill(255, 100, 100);
            circle(ballArray[i].xPos, ballArray[i].yPos, 50);

            ballArray[i].yPos += ballArray[i].speedValue;

            if (ballArray[i].yPos > 525) {
                let tempx;
                let attempts = 0;
                ballArray[i].yPos = -25;
                ballArray[i].speedValue = random(enemySpeed, enemySpeed + 1.5);
                do {
                    tempx = random(25, 475);
                    attempts++;
                } while (overlap(tempx) && attempts < 100);
                ballArray[i].xPos = tempx;
            }
        }

        let myLeft = myXPos - 25;
        let myRight = myXPos + 25;
        let myTop = myYPos - 25;
        let myBottom = myYPos + 25;

        for (let i = 0; i < ballArray.length; i++) {
            let b = ballArray[i];

            b.left = b.xPos - 21;
            b.right = b.xPos + 21;
            b.top = b.yPos - 21;
            b.bottom = b.yPos + 21;

            if (!(myLeft > b.right || myRight < b.left || myTop > b.bottom || myBottom < b.top)) {
                noLoop();
                fill(255);
                textSize(20);
                textAlign(CENTER);
                text("You lose to ball " + (i + 1) + "\nPress r for quick reset\nPress shift r to go to start screen", 250, 440);
            }
        }

        for (let i = ballArray.length - 1; i >= 0; i--) {
            for (let j = 0; j < laserArray.length; j++) {
                let b = ballArray[i];
                let l = laserArray[j];

                l.left = l.xPos - 2.5;
                l.right = l.xPos + 2.5;
                l.top = l.yPos - 15;
                l.bottom = l.yPos + 15;

                if (!(l.left > b.right || l.right < b.left || l.top > b.bottom || l.bottom < b.top)) {
                    score += 5;
                    b.yPos = 526;
                }
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

        // Your centered black background box from earlier
        fill(0);
        rect(60, 17, 120, 30);
        fill(255);
        textAlign(LEFT);
        textSize(20);
        text("Score: " + score, 10, 25);

        myXPos = constrain(myXPos, 25, 475);
        myYPos = constrain(myYPos, 350, 475);

        cooldown++;
    }
}

function keyPressed() {
    if ((key === "p" || key === "P") && state === 'game') {
        paused = !paused;
        if (paused) {
            noLoop();
        } else {
            loop();
        }
    }

    if ((key === "r") && state === 'game') {
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

            let temp = new Ball(tempx, random(-75, -25), random(enemySpeed, enemySpeed + 1.5));
            ballArray.push(temp);
        }
        paused = false;
        loop();
    }
    if(key === "R") {
        state = 'start screen';
        startScreen();
        paused = false;
        loop();
    }
}

function mouseClicked(){

}

class Ball {
    constructor(x, y, speed) {
        this.xPos = x;
        this.yPos = y;
        this.speedValue = speed;
        this.left = this.xPos - 21;
        this.right = this.xPos + 21;
        this.top = this.yPos - 21;
        this.bottom = this.yPos + 21;
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
