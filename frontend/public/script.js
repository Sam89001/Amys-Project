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
// Canvas
// -------------------------------
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// === Prevent Mobile Scroll / Pull-To-Refresh ===
canvas.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
canvas.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
canvas.addEventListener("touchend", (e) => e.preventDefault(), { passive: false });

// === Mouse Events ===
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.clientX, e.clientY];
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  draw(e.clientX, e.clientY);
});

canvas.addEventListener("mouseup", () => (isDrawing = false));

// === Touch Events ===
canvas.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  isDrawing = true;
  [lastX, lastY] = [t.clientX, t.clientY];
});

canvas.addEventListener("touchmove", (e) => {
  if (!isDrawing) return;
  const t = e.touches[0];
  draw(t.clientX, t.clientY);
});

canvas.addEventListener("touchend", () => (isDrawing = false));

// === Draw Function ===
function draw(x, y) {
  ctx.fillStyle = "red"; // simple red dot
  ctx.fillRect(x, y, 5, 5);

  lastX = x;
  lastY = y;
}

// === Clear Canvas Button ===
const eraserBtn = document.getElementById("eraserBtn");

eraserBtn.addEventListener("click", () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  console.log("Canvas cleared");
});

