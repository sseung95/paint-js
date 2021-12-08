const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelector('#jsColors');
const customColor = document.querySelector('#jsColors input[type=color]');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 캔버스 배경색상 흰색으로 초기 설정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (painting) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

function changeLineWidth(event) {
  const lineWidth = event.target.value;
  ctx.lineWidth = lineWidth;
}

function changeMode(event) {
  if (filling) {
    filling = false;
    event.target.innerText = 'Fill';
  } else {
    filling = true;
    event.target.innerText = 'Paint';
  }
}

function canvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

/* 오른쪽 클릭 방지 */
function handleCM(event) {
  event.preventDefault();
}

function saveImage() {
  const image = canvas.toDataURL(); // 기본 png 설정
  const link = document.createElement('a');
  link.href = image; // href 속성은 컨버스의 데이터 URL
  link.download = 'PaintJS'; // download 속성은 파일명
  link.click();
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function changeCustomColor(event) {
  const seletedColor = event.target.value;
  event.target.parentElement.parentElement.style.backgroundColor = seletedColor;
  ctx.strokeStyle = seletedColor;
  ctx.fillStyle = seletedColor;
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', canvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

if (range) {
  range.addEventListener('change', changeLineWidth);
}

if (mode) {
  mode.addEventListener('click', changeMode);
}

if (saveBtn) {
  saveBtn.addEventListener('click', saveImage);
}

if (colors) {
  colors.addEventListener('click', changeColor);
}

if (customColor) {
  customColor.addEventListener('change', changeCustomColor);
}
