// const canvas = document.querySelector("#myCanvas");
// Use creatElement method to fix IntelliSense Canvas Context Problem
const canvas = document.createElement('canvas');
canvas.id = 'myCanvas';
canvas.width = 550;
canvas.height = 350;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Get the mouse position.
let canvasPos = getPosition(canvas);
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', setMousePosition, false);

function setMousePosition(e) {
  mouseX = e.clientX - canvasPos.x;
  mouseY = e.clientY - canvasPos.y;
}

// Draw the circle on canvas.
function drawArc() {
  // clear the traces of earlier draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(mouseX, mouseY, 25, 0, 2 * Math.PI, true);
  ctx.fillStyle = '#FF6A6A';
  ctx.fill();

  requestAnimationFrame(drawArc);
}

drawArc();

// Helper method to get the exact mouse position
function getPosition(el) {
  let xPos = 0;
  let yPos = 0;

  // The while loop starts with the element we passed in,
  // measures the current element's position/layout properties,
  // keeps a running tally of the current position/layout-related
  // values by updating the xPos and yPos variables, and
  // makes its way up to the root of your document
  // via the offsetParent property. The loop ends when
  // there are no more parents for us to run into.
  while (el) {
    if (el.tagName === 'BODY') {
      let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      let yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += el.offsetLeft - xScroll + el.clientLeft;
      yPos += el.offsetTop - yScroll + el.clientTop;
    } else {
      xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPos += el.offsetTop - el.scrollTop + el.clientTop;
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
