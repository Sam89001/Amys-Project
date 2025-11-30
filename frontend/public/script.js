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
  if (!canvas) return  alert("Canvas Not Found");;

  const ctx = canvas.getContext("2d");
  if (!ctx) return  alert("2D Context Not Available");;

  console.log("Canvas ready:", canvas);

  // Fill black background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Click alert
  canvas.addEventListener("click", () => {
    alert("Hello! You clicked the canvas.");
  });
});



// script.js


