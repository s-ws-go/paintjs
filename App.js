const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL__COLOR = "black";
const CANVAS__SIZE = 700;

canvas.width = CANVAS__SIZE;
canvas.height = CANVAS__SIZE;

//이미지 저장시 배경 투명하지 않게 해 줌(하얀 바탕)
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS__SIZE, CANVAS__SIZE);

ctx.strokeStyle = INITIAL__COLOR;
ctx.fillStyle = INITIAL__COLOR;
ctx.lineWidth = 5;

ctx.fillRect(0, 0, 0, 0);
//x좌표, y좌표, 가로크기, 세로크기

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

//offsetX, offsetY만 추출(canvas 안에서의 좌표)
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // 마우스를 누를때, 즉 startPainting 상태일 떄
    ctx.lineTo(x, y); //path 시작좌표-끝좌표를 path에서 line으로 생성
    ctx.stroke(); //line에 선을 채워줌
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS__SIZE, CANVAS__SIZE);
  }
}

function unableSave(event) {
  event.preventDefault();
}

function handleImgSave() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "JSPainting";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", unableSave);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleImgSave);
}
