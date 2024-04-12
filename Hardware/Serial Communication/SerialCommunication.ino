const int ledPinR = 7;   // LED for "R" key, Red LED
const int ledPinB = 8;   // LED for "B" key, Blue LED
const int joystickXPin = A1; // Joystick X-axis pin
const int joystickYPin = A0; // Joystick X-axis pin

void setup() {
  pinMode(ledPinR, OUTPUT);
  pinMode(ledPinB, OUTPUT);
  Serial.begin(9600); // Start serial communication
}

void loop() {
  int joystickXValue = analogRead(joystickXPin); // Read the X-axis
  int joystickYValue = analogRead(joystickYPin); // Read the Y-axis
  // Send both readings as a comma-separated string
  Serial.print(joystickXValue);
  Serial.print(",");
  Serial.println(joystickYValue);

  if (Serial.available() > 0) { // Check if there's incoming serial data
    char receivedChar = Serial.read(); // Read the incoming byte
    switch (receivedChar) {
      case 'R': // If 'R' is received, toggle the Red LED
        digitalWrite(ledPinR, !digitalRead(ledPinR));
        break;
      case 'B': // If 'B' is received, toggle the Blue LED
        digitalWrite(ledPinB, !digitalRead(ledPinB));
        break;
    }
  }
  delay(500); // Delay for stability
}
