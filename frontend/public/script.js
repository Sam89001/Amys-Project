// script.js

// Login page logic
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return; // Only run if loginForm exists

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const data = {
      email: form.email.value.trim(),
      password: form.password.value
    };

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        // Store JWT token for authenticated requests
        localStorage.setItem('token', result.token);

        // Store username to display on splash page
        if (result.user && result.user.username) {
          localStorage.setItem('username', result.user.username);
        } else {
          localStorage.setItem('username', 'User'); // fallback
        }

        // Redirect to splash/dashboard page
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
  if (!form) return; // Only run if registerForm exists

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value
    };

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
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
