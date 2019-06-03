const container = document.querySelector('.container');
const circle = document.querySelector('.circle');
let mouseX = 0;
let mouseY = 0;

// container.addEventListener('mouseenter', showCircle);
// container.addEventListener('mouseleave', showCircle);
container.addEventListener('mousemove', getMousePosition, false);

// function showCircle() {
//   circle.classList.toggle('show-circle');
// }

// function showCircle() {
//   circle.classList.toggle('show-circle');
// }

// Instead of using 'mouseleave' listner, use the boundary box of .container
// to solve the problem that the circle element hijacking the mouseleave event,
// as when moving it to follow the cursor, the mouse was always over the circle
// and the circle consumes the space that the leave event needs.
function showCircle() {
  const rect = container.getBoundingClientRect();
  if (
    mouseX > rect.x &&
    mouseX < rect.x + rect.width &&
    mouseY > rect.y &&
    mouseY < rect.y + rect.height
  ) {
    circle.classList.add('show-circle');
  } else {
    circle.classList.remove('show-circle');
  }
}

function getMousePosition(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  showCircle();
}

function update() {
  circle.style.left = mouseX - 22 + 'px';
  circle.style.top = mouseY - 22 + 'px';

  requestAnimationFrame(update);
}

update();
