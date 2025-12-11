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
  pressure = Math.max(pressure, 0.3); // raise this number for thicker strokes

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
  { id: 1, kanji: "一", name: "Ichi", meaning: "One" },
  { id: 2, kanji: "二", name: "Ni", meaning: "Two" },
  { id: 3, kanji: "三", name: "San", meaning: "Three" },
  { id: 4, kanji: "四", name: "Shi / Yon", meaning: "Four" },
  { id: 5, kanji: "五", name: "Go", meaning: "Five" },
  { id: 6, kanji: "六", name: "Roku", meaning: "Six" },
  { id: 7, kanji: "七", name: "Shichi / Nana", meaning: "Seven" },
  { id: 8, kanji: "八", name: "Hachi", meaning: "Eight" },
  { id: 9, kanji: "九", name: "Kyuu / Ku", meaning: "Nine" },
  { id: 10, kanji: "十", name: "Juu", meaning: "Ten" },

  { id: 11, kanji: "百", name: "Hyaku", meaning: "Hundred" },
  { id: 12, kanji: "千", name: "Sen", meaning: "Thousand" },
  { id: 13, kanji: "万", name: "Man", meaning: "Ten Thousand" },

  { id: 14, kanji: "上", name: "Ue", meaning: "Up / Above" },
  { id: 15, kanji: "下", name: "Shita", meaning: "Down / Below" },
  { id: 16, kanji: "左", name: "Hidari", meaning: "Left" },
  { id: 17, kanji: "右", name: "Migi", meaning: "Right" },
  { id: 18, kanji: "中", name: "Naka", meaning: "Middle / Inside" },
  { id: 19, kanji: "大", name: "Dai / Ō", meaning: "Big" },
  { id: 20, kanji: "小", name: "Shou / Chiisai", meaning: "Small" },

  { id: 21, kanji: "月", name: "Tsuki", meaning: "Moon / Month" },
  { id: 22, kanji: "日", name: "Hi / Nichi", meaning: "Sun / Day" },
  { id: 23, kanji: "年", name: "Toshi", meaning: "Year" },
  { id: 24, kanji: "時", name: "Toki", meaning: "Time / Hour" },
  { id: 25, kanji: "分", name: "Fun / Bun", meaning: "Minute / To Divide" },
  { id: 26, kanji: "今", name: "Ima", meaning: "Now" },
  { id: 27, kanji: "先", name: "Saki", meaning: "Previous / Ahead" },
  { id: 28, kanji: "生", name: "Sei / Nama", meaning: "Life / Birth" },
  { id: 29, kanji: "何", name: "Nani", meaning: "What" },

  { id: 30, kanji: "父", name: "Chichi", meaning: "Father" },
  { id: 31, kanji: "母", name: "Haha", meaning: "Mother" },
  { id: 32, kanji: "男", name: "Otoko", meaning: "Man / Male" },
  { id: 33, kanji: "女", name: "Onna", meaning: "Woman / Female" },
  { id: 34, kanji: "子", name: "Ko", meaning: "Child" },
  { id: 35, kanji: "友", name: "Tomo", meaning: "Friend" },
  { id: 36, kanji: "人", name: "Hito", meaning: "Person" },
  { id: 37, kanji: "名", name: "Na", meaning: "Name" },
  { id: 38, kanji: "手", name: "Te", meaning: "Hand" },
  { id: 39, kanji: "目", name: "Me", meaning: "Eye" },
  { id: 40, kanji: "耳", name: "Mimi", meaning: "Ear" },
  { id: 41, kanji: "口", name: "Kuchi", meaning: "Mouth" },
  { id: 42, kanji: "足", name: "Ashi", meaning: "Leg / Foot" },
  { id: 43, kanji: "力", name: "Chikara", meaning: "Power / Strength" },

  { id: 44, kanji: "気", name: "Ki", meaning: "Spirit / Energy" },
  { id: 45, kanji: "雨", name: "Ame", meaning: "Rain" },
  { id: 46, kanji: "川", name: "Kawa", meaning: "River" },
  { id: 47, kanji: "山", name: "Yama", meaning: "Mountain" },
  { id: 48, kanji: "田", name: "Ta", meaning: "Rice Field" },
  { id: 49, kanji: "石", name: "Ishi", meaning: "Stone" },
  { id: 50, kanji: "花", name: "Hana", meaning: "Flower" },
  { id: 51, kanji: "草", name: "Kusa", meaning: "Grass" },
  { id: 52, kanji: "木", name: "Ki", meaning: "Tree / Wood" },
  { id: 53, kanji: "森", name: "Mori", meaning: "Forest" },
  { id: 54, kanji: "林", name: "Hayashi", meaning: "Woods" },

  { id: 55, kanji: "犬", name: "Inu", meaning: "Dog" },
  { id: 56, kanji: "猫", name: "Neko", meaning: "Cat" },
  { id: 57, kanji: "鳥", name: "Tori", meaning: "Bird" },
  { id: 58, kanji: "魚", name: "Sakana", meaning: "Fish" },
  { id: 59, kanji: "虫", name: "Mushi", meaning: "Insect" },
  { id: 60, kanji: "馬", name: "Uma", meaning: "Horse" },
  { id: 61, kanji: "牛", name: "Ushi", meaning: "Cow" },

  { id: 62, kanji: "車", name: "Kuruma", meaning: "Car" },
  { id: 63, kanji: "駅", name: "Eki", meaning: "Station" },
  { id: 64, kanji: "道", name: "Michi", meaning: "Road / Way" },
  { id: 65, kanji: "門", name: "Mon", meaning: "Gate" },
  { id: 66, kanji: "校", name: "Kou", meaning: "School" },
  { id: 67, kanji: "学", name: "Gaku", meaning: "Study / Learn" },
  { id: 68, kanji: "書", name: "Sho", meaning: "Write" },
  { id: 69, kanji: "読", name: "Yomu", meaning: "Read" },
  { id: 70, kanji: "聞", name: "Kiku", meaning: "Hear / Listen" },
  { id: 71, kanji: "話", name: "Hanasu", meaning: "Speak" },

  { id: 72, kanji: "食", name: "Taberu / Shoku", meaning: "Eat / Food" },
  { id: 73, kanji: "飲", name: "Nomu", meaning: "Drink" },

  { id: 74, kanji: "見", name: "Miru", meaning: "See / Look" },
  { id: 75, kanji: "行", name: "Iku", meaning: "Go" },
  { id: 76, kanji: "来", name: "Kuru", meaning: "Come" },
  { id: 77, kanji: "出", name: "Deru", meaning: "Exit / Leave" },
  { id: 78, kanji: "入", name: "Hairu / Iru", meaning: "Enter" },

  { id: 79, kanji: "円", name: "En", meaning: "Yen / Circle" },
  { id: 80, kanji: "玉", name: "Tama", meaning: "Ball / Jewel" },
  { id: 81, kanji: "王", name: "Ō", meaning: "King" },
  { id: 82, kanji: "竹", name: "Take", meaning: "Bamboo" },
  { id: 83, kanji: "糸", name: "Ito", meaning: "Thread" },
  { id: 84, kanji: "貝", name: "Kai", meaning: "Shell" },
  { id: 85, kanji: "体", name: "Karada", meaning: "Body" },

  { id: 86, kanji: "早", name: "Hayai", meaning: "Early / Fast" },
  { id: 87, kanji: "夕", name: "Yū", meaning: "Evening" },
  { id: 88, kanji: "夜", name: "Yoru", meaning: "Night" },
  { id: 89, kanji: "朝", name: "Asa", meaning: "Morning" },

  { id: 90, kanji: "村", name: "Mura", meaning: "Village" },
  { id: 91, kanji: "町", name: "Machi", meaning: "Town" },
  { id: 92, kanji: "国", name: "Kuni", meaning: "Country" },

  { id: 93, kanji: "白", name: "Shiro", meaning: "White" },
  { id: 94, kanji: "黒", name: "Kuro", meaning: "Black" },
  { id: 95, kanji: "赤", name: "Aka", meaning: "Red" },
  { id: 96, kanji: "青", name: "Ao", meaning: "Blue" },
  { id: 97, kanji: "黄", name: "Ki", meaning: "Yellow" },
  { id: 98, kanji: "色", name: "Iro", meaning: "Colour" },

  { id: 99, kanji: "気", name: "Ki", meaning: "Energy / Spirit" },
  { id: 100, kanji: "元", name: "Gen", meaning: "Origin / Base" },
  { id: 101, kanji: "光", name: "Hikari", meaning: "Light" }
];


// --- Active List ---
let currentList = [...kanjiList]; // start with full list
let currentIndex = 0;              // tracks currently displayed kanji


// -------------------------------
// Render Kanji List (Optional List Page)
// -------------------------------
function renderList() {
  const listContainer = document.getElementById("kanjiContainer");
  if (!listContainer) return;

  listContainer.innerHTML = ""; // clear previous

  currentList.forEach(item => {
    const div = document.createElement("div");
    div.className = "kanji-card";
    div.innerHTML = `
      <div class="kanji">${item.kanji}</div>
      <div class="name">${item.name}</div>
      <div class="meaning">${item.meaning}</div>
    `;
    listContainer.appendChild(div);
  });
}

// -------------------------------
// Update Kanji Display (Prev / Current / Next)
// -------------------------------
function updateKanjiDisplay() {
  const prevKanji = document.getElementById("prevKanji");
  const currentKanji = document.getElementById("currentKanji");
  const nextKanji = document.getElementById("nextKanji");
  const currentKanjiName = document.getElementById("currentKanjiName");

  // Circular navigation using currentList
  const prevIndex = (currentIndex - 1 + currentList.length) % currentList.length;
  const nextIndex = (currentIndex + 1) % currentList.length;

  prevKanji.textContent = currentList[prevIndex].kanji;
  currentKanji.textContent = currentList[currentIndex].kanji;
  currentKanjiName.textContent = `${currentList[currentIndex].name} - ${currentList[currentIndex].meaning}`;
  nextKanji.textContent = currentList[nextIndex].kanji;
}

// -------------------------------
// Dropdown Sorting / Randomizing
// -------------------------------
document.getElementById("orderedListBtn").addEventListener("click", () => {
  currentList = [...kanjiList].sort((a, b) => a.id - b.id); // sort by ID
  currentIndex = 0; // reset to first
  updateKanjiDisplay();
  renderList();
  clearCanvas();
});

document.getElementById("randomListBtn").addEventListener("click", () => {
  currentList = [...kanjiList].sort(() => Math.random() - 0.5); // shuffle
  currentIndex = 0; // reset to first
  updateKanjiDisplay();
  renderList();
  clearCanvas();
});

// -------------------------------
// Prev / Next Button Logic
// -------------------------------
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
  updateKanjiDisplay();
  clearCanvas();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentList.length;
  updateKanjiDisplay();
  clearCanvas();
});


// -------------------------------
// Populate Kanji Dropdown
// -------------------------------
function populateKanjiDropdown(list) {
  const dropdownMenu = document.getElementById("kanjiDropdownMenu");
  dropdownMenu.innerHTML = ""; // clear existing items

  list.forEach((item, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "dropdown-item";
    a.href = "#";
    a.textContent = `${item.kanji} - ${item.name}`;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = index; 
      updateKanjiDisplay(); 
      clearCanvas();  
    });

    li.appendChild(a);
    dropdownMenu.appendChild(li);
  });
}

// Initial population
populateKanjiDropdown(currentList);

// If currentList changes (ordered/random), repopulate:
document.getElementById("orderedListBtn").addEventListener("click", () => {
  currentList = [...kanjiList].sort((a, b) => a.id - b.id);
  renderList(); 
  populateKanjiDropdown(currentList); // repopulate dropdown
  currentIndex = 0;
  updateKanjiDisplay();
});

document.getElementById("randomListBtn").addEventListener("click", () => {
  currentList = [...kanjiList].sort(() => Math.random() - 0.5);
  renderList();
  populateKanjiDropdown(currentList); // repopulate dropdown
  currentIndex = 0;
  updateKanjiDisplay();
});


// -------------------------------
// Initial Render
// -------------------------------
updateKanjiDisplay();
renderList();
