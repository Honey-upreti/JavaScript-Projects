const toggleButtons = document.querySelectorAll(".toggle-password");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const indicator = document.querySelector(".indicator");
const passworderror = document.querySelector(".error");
const strengthBarsContainer = document.querySelector(".strength-bars");
const confirmerror = document.querySelector(".confirm-error-text");
const confirmerrorcontainer = document.querySelector(".confirm-error");
const callsignInput = document.querySelector("#callsign");
const callsignerror = document.querySelector(".callsign-error");
const callsignerrorcontainer = document.querySelector(".name-suggestion");
const callsignHint = document.querySelector(".callsign-hint");
const emailInput = document.querySelector("#email");
const emailerrorcontainer = document.querySelector(".email-error");
const emailerrortext = document.querySelector(".email-error-text");
const termsCheckbox = document.querySelector("#terms");
const termsErrorContainer = document.querySelector(".terms-error");
const termsErrorText = document.querySelector(".terms-error-text");
const signupForm = document.querySelector("form");
const successcard = document.querySelector(".success-card");
const formheader = document.querySelector(".form-header");
const loginlink = document.querySelector(".login-link");
const line = document.querySelector(".line");
const description = document.querySelector(".description");
const status = document.querySelectorAll('.textfield-status li span:last-child')
const ready = document.querySelector('.ready-count')
const name = document.querySelector('.name');
const submitbutton = document.querySelector('.submit')
const loginbutton = document.querySelector('.login')

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const wrapper = button.parentElement;
    const input = wrapper.querySelector("input");
    if (input.type === "password") {
      input.type = "text";
      button.src = "assets/images/icon-eye-off.svg";
    } else {
      input.type = "password";
      button.src = "assets/images/icon-eye.svg";
    }
  });
});

function updateReadyCount() {
  const count = [...status].filter(
    statusresult => statusresult.innerText === "OK"
  ).length;

  ready.innerText = `${count}/5 READY`;
  ready.classList.toggle("complete", count===5);
}

passwordInput.addEventListener("input", () => {
  checkPasswordMatch();
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
    indicator.className = "indicator";
    indicator.innerText = "";
    strengthBarsContainer.className = "strength-bars";
    status[2].innerText = "PENDING";
  } else if (hasMinLength === false) {
    passworderror.classList.add("not-filled");
    indicator.className = "indicator weak";
    indicator.innerText = "WEAK";
    strengthBarsContainer.className = "strength-bars weak";
    status[2].innerText="PENDING"

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
      indicator.className = "indicator strong";
      indicator.innerText = "STRONG";
      strengthBarsContainer.className = "strength-bars strong";
    }
    status[2].innerText="OK"

  }updateReadyCount()
});

function checkPasswordMatch() {
  if (
    confirmPasswordInput.value.length === 0)
    
    {
      confirmerrorcontainer.classList.remove("show");
      confirmerror.innerText = "";
          status[3].innerText="PENDING"

      
    } 
    else if(confirmPasswordInput.value === passwordInput.value){
       confirmerrorcontainer.classList.remove("show");
      confirmerror.innerText = "";
          status[3].innerText="OK"

    }
    
    else {
    confirmerrorcontainer.classList.add("show");
    confirmerror.innerText = "Password doesn't match";
          status[3].innerText="PENDING"

  }updateReadyCount()
}

confirmPasswordInput.addEventListener("input", () => {
  checkPasswordMatch();
});

callsignInput.addEventListener("input", () => {
  if (callsignInput.value.length === 0) {
    callsignerrorcontainer.classList.remove("show");
    callsignerror.innerText = "";
    callsignHint.style.display = "block";
    status[0].innerText="PENDING"
    name.classList.remove('Name-color')

    name.innerText="UNASSIGNED"


  } else if (callsignInput.value.length < 3) {
    callsignerrorcontainer.classList.add("show");
    callsignerror.innerText = "Use at least 3 characters";
    callsignHint.style.display = "none";
    status[0].innerText="PENDING"
    name.classList.remove('Name-color')

    name.innerText="UNASSIGNED"

  } else if (callsignInput.validity.patternMismatch) {
    callsignerrorcontainer.classList.add("show");
    callsignerror.innerText = "Only letters, numbers, _ and - allowed";
    callsignHint.style.display = "none";
    status[0].innerText="PENDING"
    name.classList.remove('Name-color')

    name.innerText="UNASSIGNED"
  } else {
    callsignerrorcontainer.classList.remove("show");
    callsignerror.innerText = "";
    callsignHint.style.display = "block";
    status[0].innerText="OK"
    name.classList.add('Name-color')
    name.innerText= callsignInput.value
  }updateReadyCount()
});

emailInput.addEventListener("input", () => {
  if (emailInput.validity.typeMismatch) {
    emailerrorcontainer.classList.add("show");
    emailerrortext.innerText = "Enter a valid email, like you@example.com";
    status[1].innerText="PENDING"

  }  else if(emailInput.value.length === 0 ){
    status[1].innerText="PENDING"
    
    emailerrorcontainer.classList.remove("show");
    emailerrortext.innerText = "";

  }else {
    emailerrorcontainer.classList.remove("show");
    emailerrortext.innerText = "";
    status[1].innerText="OK"

  }updateReadyCount()
});

termsCheckbox.addEventListener("change", () => {
  if (termsCheckbox.checked) {
    termsErrorContainer.classList.remove("show");
        status[4].innerText="OK"

  }else{
        status[4].innerText="PENDING"

  }updateReadyCount()
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!signupForm.checkValidity()) {
    signupForm.reportValidity();
    return;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    return;
  }

  if (!termsCheckbox.checked) {
    termsErrorContainer.classList.add("show");
    return;
  }

  termsErrorContainer.classList.remove("show");
  submitbutton.classList.add('transmitted')
submitbutton.innerText = "TRANSMITTING...";
setTimeout(() => {
  formheader.style.display = "none";
  signupForm.style.display = "none";
  loginlink.style.display = "none";
  line.style.display = "none";
  successcard.style.display = "block";
  ready.innerText = "PROVISIONED"
   status.forEach((item) => {
  item.innerText="LOCKED"
});
  description.innerHTML = `Operator <span class="highlight-callsign">${callsignInput.value}</span> provisioned. Your account is ready.`;
}, 1500);
  
});

loginbutton.addEventListener('click',()=>{
  location.reload()
})