// variable for p5.SerialPort object
let serial;
let bgColor = 0; // Variable to hold the background color based on joystick X-axis

// variable for serialPortName
let serialPortName = "COM4"; // Change this to match your port

// setup() runs once, at the beginning
function setup() {
  createCanvas(600, 400); // Set up the canvas

  // initialize p5.SerialPort
  serial = new p5.SerialPort();
  serial.open(serialPortName);

  // register callbacks
  serial.on("connected", serverConnected);
  serial.on("data", gotData);
  serial.on("error", gotError);
  serial.on("open", gotOpen);
}

// draw() runs after setup(), on a loop
function draw() {
  background(bgColor); // Set the background color
}

// callback functions
function serverConnected() {
  print("Connected to server.");
}

function gotOpen() {
  print("Serial port is open.");
}

function gotClose() {
  print("Serial port is closed.");
  latestData = "Serial port is closed.";
}

function gotError(theerror) {
  print("Serial port error: " + theerror);
}

function gotData() {
  let currentString = serial.readLine(); // Read the incoming string
  trim(currentString); // Trim whitespace from the string
  if (!currentString) return; // If the string is empty, do nothing

  let [x, y] = currentString.split(",").map((n) => parseInt(n, 10)); // Split the string by commas and convert to integers
  let midRange = 512; // Midpoint value of the analog input range
  let deadZone = 100; // Dead zone for the joystick center

  if (y < midRange - deadZone) {
    bgColor = color(0, 255, 0); // Up - Green
  } else if (y > midRange + deadZone) {
    bgColor = color(255, 0, 0); // Down - Red
  } else if (x < midRange - deadZone) {
    bgColor = color(0, 0, 255); // Left - Blue
  } else if (x > midRange + deadZone) {
    bgColor = color(255, 255, 0); // Right - Yellow
  } else {
    bgColor = color(255); // Center - White
  }
}

function gotRawData(data) {
  print("gotRawData: " + data);
}

function keyPressed() {
  if (key === "R" || key === "r") {
    serial.write("R"); // Send 'R' to toggle the Red LED
  }
  if (key === "B" || key === "b") {
    serial.write("B"); // Send 'B' to toggle the Blue LED
  }
}
