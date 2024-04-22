// Game settings and variables
let guy = [];
let speed = 1;
let score = 0;
let count = 25;
let timer = 30;
let screen = 0;
let mappedX = 0;
let mappedY = 0;

// Game resources (images and sounds)
let bg, bgm, squish_sound, bgm_end;

// Serial communication variables
let serial;
let serialPortName = "COM4"; // Change this to match your port

// Preload resources
function preload() {
  bg = loadImage(
    "https://res.cloudinary.com/dtjsaaj5f/image/upload/v1584928241/floor_ksmmjj.jpg"
  );
  bgm = new Tone.Player(
    "https://res.cloudinary.com/dtjsaaj5f/video/upload/v1584928263/bgm_kaiel7.mp3"
  ).toMaster();
  squish_sound = new Tone.Player(
    "https://res.cloudinary.com/dtjsaaj5f/video/upload/v1584928262/bug_squish_tivmrz.mp3"
  ).toMaster();
  bgm_end = new Tone.Player(
    "https://res.cloudinary.com/dtjsaaj5f/video/upload/v1584928262/game_over_blzyjy.mp3"
  ).toMaster();

  for (let i = 0; i < count; i++) {
    guy[i] = new Walker(
      "https://res.cloudinary.com/dtjsaaj5f/image/upload/v1584928241/roach_mg12yv.png",
      random(1280),
      random(480),
      random([-2, -1, 1, 2]),
      1
    );
  }
}

// Setup environment
function setup() {
  createCanvas(1280, 480);
  textSize(32);
  imageMode(CENTER);

  // Initialize serial communication
  serial = new p5.SerialPort();
  serial.open(serialPortName);
  serial.on("connected", serverConnected);
  serial.on("data", gotData);
  serial.on("error", gotError);
  serial.on("open", gotOpen);
}

// Main drawing loop
function draw() {
  if (screen === 0) {
    startScreen();
  } else if (screen === 1) {
    playScreen();

    fill(255, 0, 0); // Red color
    ellipse(mappedX, mappedY, 10, 10); // Draw a small ellipse at mapped X and Y coordinates
  }
}

// Display start screen
function startScreen() {
  background(100);
  fill(255);
  textAlign(CENTER);
  text("GET READY TO SQUISH BUGS", width / 2, height / 2);
  text("click to start", width / 2, height / 2 + 40);
}

// Display play screen
function playScreen() {
  push();
  imageMode(CORNER);
  background(bg);
  pop();

  for (var i = 0; i < count; i++) {
    guy[i].draw();
  }

  displayGameInfo();
}

// Display game info like score and timer
function displayGameInfo() {
  text("Score: " + score, 70, 30);
  text("Time Left: " + timer, 1180, 30);
  checkGameEnd();
}

// Check for game over conditions
function checkGameEnd() {
  if (timer == 0) {
    endGame("GAME OVER");
  } else if (score == 25) {
    endGame("YOU WIN");
  }
  if (frameCount % 60 == 0 && timer > 0) timer--;
}

// End the game and display the final screen
function endGame(message) {
  bgm.stop();
  textSize(50);
  text(message, width / 2, height / 2);
  text("You scored: " + score, width / 2, height / 2 + 40);
  text("Refresh to play again.", width / 2, height / 2 + 80);
  bgm_end.start();
  noLoop();
}

function gotData() {
  let currentString = serial.readLine().trim();
  if (!currentString.length) return; // Exit if the string is empty

  // Parse the incoming data
  let [x, y, btnPressed] = currentString
    .split(",")
    .map((n) => parseInt(n.trim(), 10));

  // Map the joystick values to the canvas coordinates
  mappedX = map(x, 0, 1023, 0, width);
  mappedY = map(y, 0, 1023, 0, height);

  // Check if the joystick button is pressed
  if (btnPressed) {
    // Joystick button is pressed
    handleJoystickButton(mappedX, mappedY);
  }
}

function handleJoystickButton(x, y) {
  if (screen === 0) {
    startGame(); // This function should change the `screen` to 1 and log output
  } else if (screen === 1) {
    checkForSquish(x, y); // Ensure this checks for squishes accurately
  }
}

function startGame() {
  console.log("Game starting"); // Confirm this executes
  bgm.start();
  bgm.loop = true;
  screen = 1;
}

function checkForSquish(x, y) {
  for (let i = 0; i < count; i++) {
    guy[i].kill(x, y);
  }
}

function serverConnected() {
  console.log("Connected to server.");
}

function gotOpen() {
  console.log("Serial port is open.");
}

function gotError(error) {
  console.log("Serial port error: " + error);
}

function Walker(imageName, x, y, moving, alive) {
  this.spriteSheet = loadImage(imageName);
  this.frame = 0;
  this.x = x;
  this.y = y;
  this.moving = moving;
  this.facing = moving;
  this.alive = alive;
  // adding moving parameter, and changing this.moving/this.facing from 0 to moving makes sprites auto-move

  this.kill = function (x, y) {
    if (
      this.x - 30 < x &&
      x < this.x + 30 &&
      this.y - 30 < y &&
      y < this.y + 30
    ) {
      this.moving = 0;
      if (this.alive == 1) {
        squish_sound.start();
        bgm.playbackRate *= 1.02;
        speed = speed + 0.3;
        score = score + 1;
        this.alive = 0;
      }
    }
  };

  this.draw = function () {
    push();
    translate(this.x, this.y);
    if (this.facing == 2) {
      scale(1.0, -1.0);
    }
    if (this.facing == -1) {
      rotate(-PI / 2);
    }
    if (this.facing == 1) {
      rotate(PI / 2);
    }

    if (this.moving == 0) {
      image(this.spriteSheet, 0, 0, 80, 80, 240, 0, 80, 80);
    } else {
      if (this.frame == 0) {
        image(this.spriteSheet, 0, 0, 80, 80, 80, 0, 80, 80);
      }
      if (this.frame == 1) {
        image(this.spriteSheet, 0, 0, 80, 80, 0, 0, 80, 80);
      }
      if (this.frame == 2) {
        image(this.spriteSheet, 0, 0, 80, 80, 160, 0, 80, 80);
      }

      // slows down to every 5 frames
      if (frameCount % 5 == 0) {
        this.frame = (this.frame + 1) % 3; // keeps the loop of 0-1
        if (this.moving == -1 || this.moving == 1) {
          this.x = this.x + speed * (this.moving * 6); // moving the guy, it's in the loop to prevent "sliding"
        }
        if (this.moving == -2 || this.moving == 2) {
          this.y = this.y + speed * (this.moving * 3);
        }

        if (this.x < 30) {
          this.moving = 1;
          this.facing = 1;
        }
        if (this.x > width - 30) {
          this.moving = -1;
          this.facing = -1;
        }
        if (this.y < 30) {
          this.moving = 2;
          this.facing = 2;
        }
        if (this.y > height - 30) {
          this.moving = -2;
          this.facing = -2;
        }
      }
    }
    pop();
  };
}
