// script.js

// Dynamically set API base URL
const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : 'https://amys-project.onrender.com/api';

// Login page logic
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      email: form.email.value.trim(),
      password: form.password.value
    };

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.user?.username || 'User');
        window.location.href = 'homepage.html';
      } else {
        alert(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  });
}

// Register page logic
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value
    };

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        alert('Registration successful!');
        window.location.href = 'index.html';
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initLoginForm();
  initRegisterForm();
});
