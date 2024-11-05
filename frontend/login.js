function toggleForm(formType) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
  
    if (formType === 'login') {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
      loginToggle.classList.add('active');
      signupToggle.classList.remove('active');
    } else {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
      signupToggle.classList.add('active');
      loginToggle.classList.remove('active');
    }
  }
  