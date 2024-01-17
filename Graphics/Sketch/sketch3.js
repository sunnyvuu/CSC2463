function setup() {
  createCanvas(300, 200);
}

function draw() {
  background("black");
  noStroke();

  // Pacman Shape
  fill(255, 232, 61);
  circle(85, 100, 100);

  // Pacman Mouth
  fill("black");
  triangle(20, 55, 20, 155, 85, 100);

  // Ghost Shape
  fill(255, 60, 46);
  rect(155, 100, 100, 50);
  circle(205, 100, 100);

  // Ghost Left Eye
  fill("white");
  circle(180, 100, 30);
  fill(61, 181, 255);
  circle(180, 100, 20);
  // Ghost Right Eye
  fill("white");
  circle(230, 100, 30);
  fill(61, 181, 255);
  circle(230, 100, 20);
}
