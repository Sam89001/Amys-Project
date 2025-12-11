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

  // DO NOT draw here — prevents the starting dot
});

canvas.addEventListener("pointermove", (e) => {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Pen pressure (0 → 1)
  let pressure = e.pressure || 1;

  // Enforce stronger starting pressure
  pressure = Math.max(pressure, 0.5); // raise this number for thicker strokes

  // Dynamic width
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
// Kanji Array - N5
// -------------------------------
const kanjiList = [
  { kanji: "一", name: "Ichi", meaning: "One" },
  { kanji: "二", name: "Ni", meaning: "Two" },
  { kanji: "三", name: "San", meaning: "Three" },
  { kanji: "四", name: "Shi / Yon", meaning: "Four" },
  { kanji: "五", name: "Go", meaning: "Five" },
  { kanji: "六", name: "Roku", meaning: "Six" },
  { kanji: "七", name: "Shichi / Nana", meaning: "Seven" },
  { kanji: "八", name: "Hachi", meaning: "Eight" },
  { kanji: "九", name: "Kyuu / Ku", meaning: "Nine" },
  { kanji: "十", name: "Juu", meaning: "Ten" },

  { kanji: "百", name: "Hyaku", meaning: "Hundred" },
  { kanji: "千", name: "Sen", meaning: "Thousand" },
  { kanji: "万", name: "Man", meaning: "Ten Thousand" },

  { kanji: "上", name: "Ue", meaning: "Up / Above" },
  { kanji: "下", name: "Shita", meaning: "Down / Below" },
  { kanji: "左", name: "Hidari", meaning: "Left" },
  { kanji: "右", name: "Migi", meaning: "Right" },
  { kanji: "中", name: "Naka", meaning: "Middle / Inside" },
  { kanji: "大", name: "Dai / Ō", meaning: "Big" },
  { kanji: "小", name: "Shou / Chiisai", meaning: "Small" },

  { kanji: "月", name: "Tsuki", meaning: "Moon / Month" },
  { kanji: "日", name: "Hi / Nichi", meaning: "Sun / Day" },
  { kanji: "年", name: "Toshi", meaning: "Year" },
  { kanji: "時", name: "Toki", meaning: "Time / Hour" },
  { kanji: "分", name: "Fun / Bun", meaning: "Minute / To Divide" },
  { kanji: "今", name: "Ima", meaning: "Now" },
  { kanji: "先", name: "Saki", meaning: "Previous / Ahead" },
  { kanji: "生", name: "Sei / Nama", meaning: "Life / Birth" },
  { kanji: "何", name: "Nani", meaning: "What" },

  { kanji: "父", name: "Chichi", meaning: "Father" },
  { kanji: "母", name: "Haha", meaning: "Mother" },
  { kanji: "男", name: "Otoko", meaning: "Man / Male" },
  { kanji: "女", name: "Onna", meaning: "Woman / Female" },
  { kanji: "子", name: "Ko", meaning: "Child" },
  { kanji: "友", name: "Tomo", meaning: "Friend" },
  { kanji: "人", name: "Hito", meaning: "Person" },
  { kanji: "名", name: "Na", meaning: "Name" },
  { kanji: "手", name: "Te", meaning: "Hand" },
  { kanji: "目", name: "Me", meaning: "Eye" },
  { kanji: "耳", name: "Mimi", meaning: "Ear" },
  { kanji: "口", name: "Kuchi", meaning: "Mouth" },
  { kanji: "足", name: "Ashi", meaning: "Leg / Foot" },
  { kanji: "力", name: "Chikara", meaning: "Power / Strength" },

  { kanji: "気", name: "Ki", meaning: "Spirit / Energy" },
  { kanji: "雨", name: "Ame", meaning: "Rain" },
  { kanji: "川", name: "Kawa", meaning: "River" },
  { kanji: "山", name: "Yama", meaning: "Mountain" },
  { kanji: "田", name: "Ta", meaning: "Rice Field" },
  { kanji: "石", name: "Ishi", meaning: "Stone" },
  { kanji: "花", name: "Hana", meaning: "Flower" },
  { kanji: "草", name: "Kusa", meaning: "Grass" },
  { kanji: "木", name: "Ki", meaning: "Tree / Wood" },
  { kanji: "森", name: "Mori", meaning: "Forest" },
  { kanji: "林", name: "Hayashi", meaning: "Woods" },

  { kanji: "犬", name: "Inu", meaning: "Dog" },
  { kanji: "猫", name: "Neko", meaning: "Cat" },
  { kanji: "鳥", name: "Tori", meaning: "Bird" },
  { kanji: "魚", name: "Sakana", meaning: "Fish" },
  { kanji: "虫", name: "Mushi", meaning: "Insect" },
  { kanji: "馬", name: "Uma", meaning: "Horse" },
  { kanji: "牛", name: "Ushi", meaning: "Cow" },

  { kanji: "車", name: "Kuruma", meaning: "Car" },
  { kanji: "駅", name: "Eki", meaning: "Station" },
  { kanji: "道", name: "Michi", meaning: "Road / Way" },
  { kanji: "門", name: "Mon", meaning: "Gate" },
  { kanji: "校", name: "Kou", meaning: "School" },
  { kanji: "学", name: "Gaku", meaning: "Study / Learn" },
  { kanji: "書", name: "Sho", meaning: "Write" },
  { kanji: "読", name: "Yomu", meaning: "Read" },
  { kanji: "聞", name: "Kiku", meaning: "Hear / Listen" },
  { kanji: "話", name: "Hanasu", meaning: "Speak" },

  { kanji: "食", name: "Taberu / Shoku", meaning: "Eat / Food" },
  { kanji: "飲", name: "Nomu", meaning: "Drink" },

  { kanji: "見", name: "Miru", meaning: "See / Look" },
  { kanji: "行", name: "Iku", meaning: "Go" },
  { kanji: "来", name: "Kuru", meaning: "Come" },
  { kanji: "出", name: "Deru", meaning: "Exit / Leave" },
  { kanji: "入", name: "Hairu / Iru", meaning: "Enter" },

  { kanji: "円", name: "En", meaning: "Yen / Circle" },
  { kanji: "玉", name: "Tama", meaning: "Ball / Jewel" },
  { kanji: "王", name: "Ō", meaning: "King" },
  { kanji: "犬", name: "Inu", meaning: "Dog" },
  { kanji: "竹", name: "Take", meaning: "Bamboo" },
  { kanji: "糸", name: "Ito", meaning: "Thread" },
  { kanji: "貝", name: "Kai", meaning: "Shell" },
  { kanji: "耳", name: "Mimi", meaning: "Ear" },
  { kanji: "体", name: "Karada", meaning: "Body" },

  { kanji: "早", name: "Hayai", meaning: "Early / Fast" },
  { kanji: "夕", name: "Yū", meaning: "Evening" },
  { kanji: "夜", name: "Yoru", meaning: "Night" },
  { kanji: "朝", name: "Asa", meaning: "Morning" },

  { kanji: "村", name: "Mura", meaning: "Village" },
  { kanji: "町", name: "Machi", meaning: "Town" },
  { kanji: "国", name: "Kuni", meaning: "Country" },

  { kanji: "白", name: "Shiro", meaning: "White" },
  { kanji: "黒", name: "Kuro", meaning: "Black" },
  { kanji: "赤", name: "Aka", meaning: "Red" },
  { kanji: "青", name: "Ao", meaning: "Blue" },
  { kanji: "黄", name: "Ki", meaning: "Yellow" },
  { kanji: "色", name: "Iro", meaning: "Colour" },

  { kanji: "気", name: "Ki", meaning: "Energy / Spirit" },
  { kanji: "元", name: "Gen", meaning: "Origin / Base" },
  { kanji: "光", name: "Hikari", meaning: "Light" }
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
