// script.js

// -------------------------------
// Config: API Base URL
// -------------------------------
const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://amys-project.onrender.com';

// -------------------------------
// Helper: POST request
// -------------------------------
async function postAPI(endpoint, data) {
  try {
    const res = await fetch(`${BASE_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    return { ok: res.ok, data: result };
  } catch (err) {
    console.error('API Error:', err);
    return { ok: false, data: { error: 'Network error. Please try again.' } };
  }
}

// -------------------------------
// Login Form Logic
// -------------------------------
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      email: form.email.value.trim(),
      password: form.password.value
    };

    const { ok, data: result } = await postAPI('auth/login', data);

    if (ok) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('username', result.user?.username || 'User');
      window.location.href = 'homepage.html';
    } else {
      alert(result.error || 'Login failed. Please try again.');
    }
  });
}

// -------------------------------
// Register Form Logic
// -------------------------------
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      username: form.username.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value
    };

    const { ok, data: result } = await postAPI('auth/register', data);

    if (ok) {
      alert('Registration successful!');
      window.location.href = 'index.html';
    } else {
      alert(result.error || 'Registration failed. Please try again.');
    }
  });
}

// -------------------------------
// Initialize on Page Load
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initLoginForm();
  initRegisterForm();
});




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
eraserBtn.addEventListener("click", () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  console.log("Canvas cleared");
});

