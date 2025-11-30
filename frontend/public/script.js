// -------------------------------
// Canvas Setup
// -------------------------------

// --- Clear canvas function ---
function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  console.log("Canvas cleared");
}

const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Fill background
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// -------------------------------
// Drawing State
// -------------------------------
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Fallback line width (slider updates this)
let lineWidth = 5;

// -------------------------------
// Prevent Mobile Scrolling / Gestures
// -------------------------------
canvas.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
canvas.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
canvas.addEventListener("touchend", (e) => e.preventDefault(), { passive: false });

// -------------------------------
// Pointer Events (Mouse + Touch + Stylus)
// -------------------------------
canvas.addEventListener("pointerdown", (e) => {
  isDrawing = true;

  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
});

canvas.addEventListener("pointermove", (e) => {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Pen pressure (0 → 1), fallback to 1 for mouse
  const pressure = e.pressure || 1;
  const dynamicWidth = lineWidth * pressure;

  drawLine(lastX, lastY, x, y, dynamicWidth);

  lastX = x;
  lastY = y;
});

canvas.addEventListener("pointerup", () => {
  isDrawing = false;
});

// -------------------------------
// Draw a Line Function
// -------------------------------
function drawLine(x1, y1, x2, y2, width) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = width;
  ctx.lineCap = "round";

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
