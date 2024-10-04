const avatarDiv = document.getElementById('avatar');
const eyes = document.querySelectorAll('.eye');
const arms = document.querySelectorAll('.arm-box');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById("password");
const toggleIcon = document.querySelector(".toggle-password");
const form = document.getElementById('login');

const togglePassword = () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.textContent = "🙈";
        avatarDiv.classList.add('showed');
    } else {
        passwordInput.type = "password";
        toggleIcon.textContent = "👀";
        avatarDiv.classList.remove('showed');
    }
}

const calculateTranslateVal = () => {
  const characterCount = usernameInput.value.length;
  const translateValue = Math.min(-30 + characterCount * 3, 30);
  return translateValue;
}

const setOnFocus = (conditional) => {
  eyes.forEach(eye => {
    eye.style.transform = conditional 
      ? `translate(${calculateTranslateVal()}%, 30%)` 
      : 'translate(0, 0)';
  });
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  usernameInput.value = '';
  passwordInput.value = '';
  avatarDiv.classList.remove('secret');
});

document.addEventListener('DOMContentLoaded', function() {
  usernameInput.addEventListener('focus', function() {
    avatarDiv.classList.add('focused');
    avatarDiv.classList.remove('secret');
    setOnFocus(true);
  });

  usernameInput.addEventListener('blur', function() {
    avatarDiv.classList.remove('focused');
    setOnFocus(false);
  });
  
  passwordInput.addEventListener('focus', function() {
    avatarDiv.classList.add('secret');
  });

  usernameInput.addEventListener('input', function() {
    setOnFocus(true);
  });
});