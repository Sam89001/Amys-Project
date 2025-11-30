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
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("drawCanvas");
  if (!canvas) return console.error("Canvas not found");

  const ctx = canvas.getContext("2d");
  if (!ctx) return console.error("2D context not available");

  // Resize canvas to match CSS size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Paint background black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let isDrawing = false;


  // ------------------------------------------------------------------
  // POINTER DOWN – user starts drawing
  // ------------------------------------------------------------------
  canvas.addEventListener("pointerdown", (e) => {
    isDrawing = true;

    // Begin a new path
    ctx.beginPath();
    ctx.strokeStyle = "red";   // your drawing colour
    ctx.lineWidth = 4;         // thickness
    ctx.lineCap = "round";     // smooth edges

    // Move the pen to the starting position
    const rect = canvas.getBoundingClientRect();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  });

  // ------------------------------------------------------------------
  // POINTER MOVE – user drags to draw
  // ------------------------------------------------------------------
  canvas.addEventListener("pointermove", (e) => {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  });

  // ------------------------------------------------------------------
  // POINTER UP / LEAVE – stop drawing
  // ------------------------------------------------------------------
  const stopDrawing = () => {
    isDrawing = false;
    ctx.closePath();
  };

  canvas.addEventListener("pointerup", stopDrawing);
  canvas.addEventListener("pointerleave", stopDrawing);



  // ------------------------------------------------------------------
  // ERASE CANVAS
  // ------------------------------------------------------------------
  const eraserBtn = document.getElementById("eraserBtn");

  eraserBtn.addEventListener("click", () => {
    // Fill the entire canvas with black again
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log("Canvas cleared.");
});
});



 

// script.js


