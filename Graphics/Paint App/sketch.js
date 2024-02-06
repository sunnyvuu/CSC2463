// Setup function runs once at the beginning
function setup() {
  createCanvas(1000, 500); // Create a canvas with width 1000 and height 500
}

// Draw function runs continuously
function draw() {
  // Color pickers
  strokeWeight(1); // Set the stroke weight to 1
  stroke(255); // Set the stroke color to white
  // Draw color rectangles
  fill(255, 0, 0); // Red
  rect(0, 0, 30, 30);
  fill(255, 127, 0); // Orange
  rect(0, 30, 30, 30);
  fill(255, 255, 0); // Yellow
  rect(0, 60, 30, 30);
  fill(0, 255, 0); // Green
  rect(0, 90, 30, 30);
  fill(0, 255, 255); // Cyan
  rect(0, 120, 30, 30);
  fill(0, 0, 255); // Blue
  rect(0, 150, 30, 30);
  fill(255, 0, 255); // Magenta
  rect(0, 180, 30, 30);
  fill(127, 63, 0); // Brown
  rect(0, 210, 30, 30);
  fill("white");
  rect(0, 240, 30, 30);
  fill("black");
  rect(0, 270, 30, 30);
}

// Function to handle mouse clicks
function mouseClicked() {
  let x = mouseX; // Get the x-coordinate of the mouse
  let y = mouseY; // Get the y-coordinate of the mouse
  // Check which color is clicked and set 'c' accordingly
  if (x >= 0 && x <= 30 && y >= 0 && y <= 30) {
    c = color(255, 0, 0); // Red
  }
  if (x >= 0 && x <= 30 && y >= 30 && y <= 60) {
    c = color(255, 127, 0); // Orange
  }
  if (x >= 0 && x <= 30 && y >= 60 && y <= 90) {
    c = color(255, 255, 0); // Yellow
  }
  if (x >= 0 && x <= 30 && y >= 90 && y <= 120) {
    c = color(0, 255, 0); // Green
  }
  if (x >= 0 && x <= 30 && y >= 120 && y <= 150) {
    c = color(0, 255, 255); // Cyan
  }
  if (x >= 0 && x <= 30 && y >= 150 && y <= 180) {
    c = color(0, 0, 255); // Blue
  }
  if (x >= 0 && x <= 30 && y >= 180 && y <= 210) {
    c = color(255, 0, 255); // Magenta
  }
  if (x >= 0 && x <= 30 && y >= 210 && y <= 240) {
    c = color(127, 63, 0); // Brown
  }
  if (x >= 0 && x <= 30 && y >= 240 && y <= 270) {
    c = color("white");
  }
  if (x >= 0 && x <= 30 && y >= 270 && y <= 300) {
    c = color("black");
  }
}

// Function to draw when the mouse is dragged
function mouseDragged() {
  stroke(c); // Set stroke color to 'c'
  strokeWeight(10); // Set stroke weight to 10
  line(mouseX, mouseY, pmouseX, pmouseY); // Draw a line from previous mouse position to current mouse position
}

// Function to handle key presses
function keyPressed() {
  if (keyCode == 32) {
    // Check if the spacebar is pressed
    background(255); // Clear the canvas by setting background to white
  }
}
