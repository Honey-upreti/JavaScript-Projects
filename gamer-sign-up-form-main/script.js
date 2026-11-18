const toggleButtons = document.querySelectorAll(".toggle-password");
const passwordInput = document.querySelector("#password");
const indicator = document.querySelector(".indicator");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const wrapper = button.parentElement;
    const input = wrapper.querySelector("input");
    console.log(input.type);
    if (input.type === "password") {
      input.type = "text";
      button.src = "assets/images/icon-eye-off.svg";
    } else {
      input.type = "password";
      button.src = "assets/images/icon-eye.svg";
    }
  });
});

const strengthBars = document.querySelectorAll(".strength-bars span");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const score =
    Number(hasMinLength) +
    Number(hasSpecialChar) +
    Number(hasUppercase) +
    Number(hasLowercase) +
    Number(hasNumber);
  if (password.length === 0) {
    indicator.innerText = "";
    strengthBarsContainer.className = "strength-bars";

  } else if (score <= 1) {
    indicator.className = "indicator weak";
    indicator.innerText = "WEAK";
    strengthBarsContainer.className = "strength-bars weak";
  } else if (score <= 3) {
    indicator.className = "indicator fair";
    indicator.innerText = "FAIR";
    strengthBarsContainer.className = "strength-bars fair";
  } else if (score <= 4) {
    indicator.className = "indicator good";
    indicator.innerText = "GOOD";
    strengthBarsContainer.className = "strength-bars good";
  } else {
    indicator.className = "indicator strong";
    indicator.innerText = "STRONG";
    strengthBarsContainer.className = "strength-bars strong";
  }
});

const strengthBarsContainer = document.querySelector(".strength-bars");
