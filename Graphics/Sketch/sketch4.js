function setup() {
  createCanvas(300, 300);
}

function draw() {
  background("blue");
  stroke("white");
  strokeWeight(4);
  fill("green");
  circle(150, 150, 125);

  fill("red");
  beginShape();

  // Star Head
  vertex(150, 85); // Top of Star Left Line

  vertex(130, 130); // Top of Left Arm
  vertex(90, 130); // Bottom of Left Arm

  vertex(125, 155); // Inner Corner 2
  vertex(110, 200); // Outer Corner 2

  vertex(150, 170); // Inner Corner 3 P
  vertex(190, 200); // Outer Corner 3

  vertex(177, 155); // Inner Corner 4
  vertex(210, 130); // Outer Corner 4

  vertex(170, 130); // Inner Corner 5
  vertex(150, 85); // Top of Star Right Line
  endShape();

  //   strokeWeight(2);
  //   line(150, 0, 150, 300);
  //   line(0, 150, 300, 150);
}
