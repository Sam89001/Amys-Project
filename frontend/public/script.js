

// -------------------------------
// Font Size Slider
// -------------------------------

// Default line width
let lineWidth = 5;

// Get slider and display element
const fontSizeSlider = document.getElementById("fontSizeSlider");
const fontSizeValue = document.getElementById("fontSizeValue");

// Update line width when slider changes
fontSizeSlider.addEventListener("input", (e) => {
  lineWidth = e.target.value;                  // update line width
  fontSizeValue.textContent = lineWidth;       // update number next to slider
  console.log("Line width set to:", lineWidth);
});



// -------------------------------
// Canvas Setup
// -------------------------------

// --- Clear canvas function ---
function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  console.log("Canvas cleared");
}

const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Fill black background initially
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// -------------------------------
// Drawing State
// -------------------------------
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// -------------------------------
// Prevent Mobile Scrolling / Gestures
// -------------------------------
canvas.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
canvas.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
canvas.addEventListener("touchend", (e) => e.preventDefault(), { passive: false });

// -------------------------------
// Mouse Events
// -------------------------------
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  drawLine(lastX, lastY, x, y);
  lastX = x;
  lastY = y;
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseleave", () => (isDrawing = false));

// -------------------------------
// Touch Events
// -------------------------------
canvas.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = t.clientX - rect.left;
  lastY = t.clientY - rect.top;
});

canvas.addEventListener("touchmove", (e) => {
  if (!isDrawing) return;
  const t = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = t.clientX - rect.left;
  const y = t.clientY - rect.top;
  drawLine(lastX, lastY, x, y);
  lastX = x;
  lastY = y;
});

canvas.addEventListener("touchend", () => (isDrawing = false));

// -------------------------------
// Draw a Line Function
// -------------------------------
function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = "red";     // line color
  ctx.lineWidth = lineWidth;   // dynamic width from slider
  ctx.lineCap = "round";       // smooth line ends
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// -------------------------------
// Clear Canvas Button
// -------------------------------
const eraserBtn = document.getElementById("eraserBtn");
eraserBtn.addEventListener("click", clearCanvas);








// -------------------------------
// Kanji Array
// -------------------------------
const kanjiList = [
  { kanji: "日", name: "Hi", meaning: "Sun / Day" },
  { kanji: "月", name: "Tsuki", meaning: "Moon / Month" },
  { kanji: "火", name: "Hi", meaning: "Fire" },
  { kanji: "水", name: "Mizu", meaning: "Water" },
  { kanji: "木", name: "Ki", meaning: "Tree / Wood" },
  { kanji: "金", name: "Kin", meaning: "Gold / Money" },
  { kanji: "土", name: "Tsuchi", meaning: "Earth / Soil" },
  { kanji: "山", name: "Yama", meaning: "Mountain" },
  { kanji: "川", name: "Kawa", meaning: "River" },
  { kanji: "田", name: "Ta", meaning: "Rice Field" },
  { kanji: "天", name: "Ten", meaning: "Heaven / Sky" },
  { kanji: "空", name: "Sora", meaning: "Sky / Empty" },
  { kanji: "雨", name: "Ame", meaning: "Rain" },
  { kanji: "花", name: "Hana", meaning: "Flower" },
  { kanji: "草", name: "Kusa", meaning: "Grass" },
];






// -------------------------------
// Current Index
// -------------------------------
let currentIndex = 0;

// -------------------------------
// Update Display Function
// -------------------------------
function updateKanjiDisplay() {
  const prevKanji = document.getElementById("prevKanji");
  const currentKanji = document.getElementById("currentKanji");
  const nextKanji = document.getElementById("nextKanji");
  const currentKanjiName = document.getElementById("currentKanjiName");

  // Circular scroll
  const prevIndex = (currentIndex - 1 + kanjiList.length) % kanjiList.length;
  const nextIndex = (currentIndex + 1) % kanjiList.length;

  prevKanji.textContent = kanjiList[prevIndex].kanji;
  currentKanji.textContent = kanjiList[currentIndex].kanji;
  currentKanjiName.textContent = `${kanjiList[currentIndex].name} - ${kanjiList[currentIndex].meaning}`;
  nextKanji.textContent = kanjiList[nextIndex].kanji;
}

// -------------------------------
// Prev / Next Button Logic
// -------------------------------
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + kanjiList.length) % kanjiList.length;
  updateKanjiDisplay();
  clearCanvas();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % kanjiList.length;
  updateKanjiDisplay();
  clearCanvas();
});


// -------------------------------
// Initialize Display
// -------------------------------
updateKanjiDisplay();
