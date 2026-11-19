const toggleButtons = document.querySelectorAll(".toggle-password");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const indicator = document.querySelector(".indicator");
const passworderror = document.querySelector(".error");
const strengthBarsContainer = document.querySelector(".strength-bars");
const confirmerror = document.querySelector(".confirm-error-text");
const confirmerrorcontainer = document.querySelector(".confirm-error")

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
    passworderror.classList.remove("not-filled");
    indicator.innerText = "";
    strengthBarsContainer.className = "strength-bars";
  } else if (hasMinLength === false) {
    passworderror.classList.add("not-filled");
    indicator.className = "indicator weak";
    indicator.innerText = "WEAK";
    strengthBarsContainer.className = "strength-bars weak";
  } else {
    passworderror.classList.remove("not-filled");
    if (score <= 2) {
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
      passworderror.classList.remove("not-filled");
      indicator.className = "indicator strong";
      indicator.innerText = "STRONG";
      strengthBarsContainer.className = "strength-bars strong";
    }
  }
});

confirmPasswordInput.addEventListener('input',()=>{
  if (confirmPasswordInput.value.length === 0 ||
    confirmPasswordInput.value === passwordInput.value) {
      confirmerrorcontainer.classList.remove('show')
  confirmerror.innerText = "";
} else {
  confirmerrorcontainer.classList.add('show')
  confirmerror.innerText = "Password doesn't match";
}
})