let guy = [];
let speed = 1;
let score = 0;
let sprites = ["SpelunkyGuy.png", "SpelunkyGirl.png", "SpelunkyLime.png"];
let sprite;
let count = 15;

function preload() {
  for (let i = 0; i < count; i++) {
    sprite = random(sprites);
    guy[i] = new Walker(
      sprite,
      random(640),
      random(480),
      random([-2, -1, 1, 2])
    );
  }
}
function setup() {
  createCanvas(640, 480);
  textSize(32);
  imageMode(CENTER);
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    for (let i = 0; i < count; i++) {
      guy[i].go(1);
    }
  }
  if (keyCode == LEFT_ARROW) {
    for (let i = 0; i < count; i++) {
      guy[i].go(-1);
    }
  }
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW) {
    for (let i = 0; i < count; i++) {
      guy[i].stop();
    }
  }
  if (keyCode == LEFT_ARROW) {
    for (let i = 0; i < count; i++) {
      guy[i].stop();
    }
  }
}

function draw() {
  background("pink");
  for (let i = 0; i < count; i++) {
    guy[i].draw();
  }
}

function Walker(imageName, x, y, moving) {
  this.spriteSheet = loadImage(imageName);
  this.frame = 0;
  this.x = x;
  this.y = y;
  this.moving = moving;
  this.facing = moving;
  // adding moving parameter, and changing this.moving/this.facing from 0 to moving makes sprites auto-move

  this.go = function (direction) {
    this.moving = direction;
    this.facing = direction;
  };

  this.stop = function () {
    this.moving = 0;
    this.frame = 3;
  };

  this.grab = function (x, y) {
    if (
      this.x - 40 < x &&
      x < this.x + 40 &&
      this.y - 40 < y &&
      y < this.y + 40
    ) {
      this.stop();
      this.mouseX = x;
      this.mouseY = y;
      this.initX = this.x;
      this.initY = this.y;
    }
  };

  this.drag = function (x, y) {
    if (this.moving == 0) {
      this.x = x - this.mouseX + this.initX;
      this.y = y - this.mouseY + this.initY;
    }
  };

  this.drop = function () {
    this.go(this.facing);
  };

  this.draw = function () {
    push();
    translate(this.x, this.y);
    if (this.facing == -1) {
      scale(-1.0, 1.0);
    }
    if (this.facing == -2) {
      rotate(-PI / 2);
    }
    if (this.facing == 2) {
      rotate(PI / 2);
    }

    if (this.moving == 0) {
      image(this.spriteSheet, 0, 0, 80, 80, 0, 0, 80, 80);
    } else {
      if (this.frame == 0) {
        image(this.spriteSheet, 0, 0, 80, 80, 80, 0, 80, 80);
      }
      if (this.frame == 1) {
        image(this.spriteSheet, 0, 0, 80, 80, 160, 0, 80, 80);
      }
      if (this.frame == 2) {
        image(this.spriteSheet, 0, 0, 80, 80, 240, 0, 80, 80);
      }
      if (this.frame == 3) {
        image(this.spriteSheet, 0, 0, 80, 80, 320, 0, 80, 80);
      }
      if (this.frame == 4) {
        image(this.spriteSheet, 0, 0, 80, 80, 400, 0, 80, 80);
      }
      if (this.frame == 5) {
        image(this.spriteSheet, 0, 0, 80, 80, 480, 0, 80, 80);
      }
      if (this.frame == 6) {
        image(this.spriteSheet, 0, 0, 80, 80, 560, 0, 80, 80);
      }
      if (this.frame == 7) {
        image(this.spriteSheet, 0, 0, 80, 80, 640, 0, 80, 80);
      }

      // slows down to every 4 frames
      if (frameCount % 4 == 0) {
        this.frame = (this.frame + 1) % 8; // keeps the loop of 1-8
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
