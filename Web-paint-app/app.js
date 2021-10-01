// set canvas id to variable

var canvas = document.getElementById("draw");

// get canvas 2D context and set it to the correct size

var ctx = canvas.getContext("2d");
resize();

// resize canvas when window is resized

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

// Set position functions
// last known position

var pos = { x: 0, y: 0 };

// new positions from mouse events

function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

// Draw Functions

function draw(e) {
  if (e.buttons !== 1) return;
  var color = document.getElementById("hex").value;

  // begin the drawing path
  ctx.beginPath();
  // line properties
  ctx.lineWidth = 20; // width of line
  ctx.lineCap = "round"; // rounded end cap
  ctx.strokeStyle = color; // hex the color of the line

  // draw line

  ctx.moveTo(pos.x, pos.y); // from position
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to position

  ctx.stroke(); // draw it
}
// add window event listener to trigger when window is resized
window.addEventListener("resize", resize);

// add event listener to trigger on different mouse events

document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);
