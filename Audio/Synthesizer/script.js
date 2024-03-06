// Global variables for synthesizer and effect
let polySynth, reverb;
let img;

function preload() {
  img = loadImage("star.jpg");
}

function setup() {
  createCanvas(800, 600);
  noStroke();

  // Initialize PolySynth
  polySynth = new Tone.PolySynth().toDestination();

  // Initialize Reverb with 2 seconds decay
  reverb = new Tone.Reverb(2).toDestination();
  // Connect PolySynth to Reverb
  polySynth.connect(reverb);

  // GUI element for controlling reverb
  reverbControl = createSlider(0, 100, 50);
  reverbControl.position(10, height - 30);

  reverbControl.input(() => {
    const wetness = reverbControl.value() / 100;
    reverb.wet.value = wetness;
  });

  imageMode(CENTER);
}
// Complete keyboard to note mapping for one octave
function keyPressed() {
  let note = null;
  switch (
    key.toUpperCase() // Ensure case insensitivity
  ) {
    case "A":
      note = "C4";
      break;
    case "W":
      note = "C#4";
      break;
    case "S":
      note = "D4";
      break;
    case "E":
      note = "D#4";
      break;
    case "D":
      note = "E4";
      break;
    case "F":
      note = "F4";
      break;
    case "T":
      note = "F#4";
      break;
    case "G":
      note = "G4";
      break;
    case "Y":
      note = "G#4";
      break;
    case "H":
      note = "A4";
      break;
    case "U":
      note = "A#4";
      break;
    case "J":
      note = "B4";
      break;
    case "K":
      note = "C5";
      break;
  }
  if (note) polySynth.triggerAttack(note);
}

function keyReleased() {
  let note = null;
  switch (
    key.toUpperCase() // Ensure case insensitivity
  ) {
    case "A":
      note = "C4";
      break;
    case "W":
      note = "C#4";
      break;
    case "S":
      note = "D4";
      break;
    case "E":
      note = "D#4";
      break;
    case "D":
      note = "E4";
      break;
    case "F":
      note = "F4";
      break;
    case "T":
      note = "F#4";
      break;
    case "G":
      note = "G4";
      break;
    case "Y":
      note = "G#4";
      break;
    case "H":
      note = "A4";
      break;
    case "U":
      note = "A#4";
      break;
    case "J":
      note = "B4";
      break;
    case "K":
      note = "C5";
      break;
  }
  if (note) polySynth.triggerRelease(note);
}

// Detailed explanation for the reverb control
function draw() {
  background("pink");
  image(img, width / 2, height / 2, img.width / 2, img.height / 2);
  fill(0);
  textSize(18);
  text(
    "Use your keyboard to play notes from C4 to C5. Adjust reverb with the slider below.",
    10,
    30
  );
  text("Reverb: " + reverbControl.value(), 10, height - 10);
}
