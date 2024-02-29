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
  noCanvas();

  let container = createDiv("");
  container.id("container");

  // Initialize the pitch shift and connect it to the master output
  pitchShift = new Tone.PitchShift().toMaster();

  // Create a slider for pitch control and attach event listener
  slider = createSlider(-7, 7, 1);
  slider.parent(container);
  slider.style("width", "400px");
  slider.input(() => (pitchShift.pitch = slider.value())); // Update pitch on slider input

  let buttonContainer = createDiv("");
  buttonContainer.parent(container);

  // Create audio players and buttons for each cat sound
  // Then set their parent to the button container
  cat1 = new Tone.Player("Cat1.wav").connect(pitchShift);
  button_cat1 = createImgButton(imgCat1, cat1, buttonContainer);

  cat2 = new Tone.Player("Cat2.mp3").connect(pitchShift);
  button_cat2 = createImgButton(imgCat2, cat2, buttonContainer);

  cat3 = new Tone.Player("Cat3.wav").connect(pitchShift);
  button_cat3 = createImgButton(imgCat3, cat3, buttonContainer);

  cat4 = new Tone.Player("Cat4.wav").connect(pitchShift);
  button_cat4 = createImgButton(imgCat4, cat4, buttonContainer);
}

function createImgButton(img, player, parentDiv) {
  let button = createButton("");
  button.mousePressed(() => player.start());
  setButtonImage(button, img);
  button.parent(parentDiv);
  return button;
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
  button.style("padding", "5px");
  button.style("border", "none");
  button.style("background-color", "transparent");
  button.size(50, 50);
}
