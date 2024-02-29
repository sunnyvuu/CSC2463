let cat1, cat2, cat3, cat4;
let button_cat1, button_cat2, button_cat3, button_cat4;
let slider, pitchShift;
let imgCat1, imgCat2, imgCat3, imgCat4;

function preload() {
  imgCat1 = loadImage("morning.jpg");
  imgCat2 = loadImage("upclose.jpg");
  imgCat3 = loadImage("very-close.jpg");
  imgCat4 = loadImage("loafing.jpg");
}

function setup() {
  createCanvas(500, 500);
  background("pink");

  // Initialize the pitch shift and connect it to the master output
  pitchShift = new Tone.PitchShift().toMaster();

  // Create a slider for pitch control
  slider = createSlider(-7, 7, 1);
  slider.position(19, 325);
  slider.style("width", "400px");

  // Create audio players and buttons for each cat sound
  cat1 = new Tone.Player("Cat1.wav").connect(pitchShift);
  button_cat1 = createButton("");
  button_cat1.position(19, 19);
  button_cat1.mousePressed(() => cat1.start());

  cat2 = new Tone.Player("Cat2.mp3").connect(pitchShift);
  button_cat2 = createButton("");
  button_cat2.position(19, 100);
  button_cat2.mousePressed(() => cat2.start());

  cat3 = new Tone.Player("Cat3.wav").connect(pitchShift);
  button_cat3 = createButton("");
  button_cat3.position(19, 181);
  button_cat3.mousePressed(() => cat3.start());

  cat4 = new Tone.Player("Cat4.wav").connect(pitchShift);
  button_cat4 = createButton("");
  button_cat4.position(19, 262);
  button_cat4.mousePressed(() => cat4.start());

  // Apply the images to the buttons
  setButtonImage(button_cat1, imgCat1);
  setButtonImage(button_cat2, imgCat2);
  setButtonImage(button_cat3, imgCat3);
  setButtonImage(button_cat4, imgCat4);

  // Style the buttons
  const buttons = [button_cat1, button_cat2, button_cat3, button_cat4];
  buttons.forEach((button) => {
    button.style("padding", "0px");
    button.style("border", "none");
    button.style("background-color", "transparent");
  });
}

function setButtonImage(button, img) {
  // Use createGraphics to draw the resized image
  let gfx = createGraphics(50, 50); // Adjust to the desired button size
  gfx.image(img, 0, 0, gfx.width, gfx.height);
  let imgResized = gfx.elt.toDataURL();

  // Set the resized image as button background
  button.style("background-image", "url(" + imgResized + ")");
  button.style("background-size", "50px 50px");
  button.style("background-repeat", "no-repeat");
  button.size(50, 50);
}

function draw() {
  // Draw the text for the slider control
  fill(0);
  noStroke();
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Slider will shift pitch", width / 2, height / 2 + 50);

  // Update the pitch shift value
  pitchShift.pitch = slider.value();
}
