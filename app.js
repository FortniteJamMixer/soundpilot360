import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

console.log("SoundPilot360 Authentication Loaded");

const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const passConfirmInput = document.getElementById("passwordConfirm");

const status = document.getElementById("auth-status");

document.getElementById("signup-btn").onclick = async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value;
  const confirm = passConfirmInput.value;

  status.textContent = "";

  if (!email) {
    status.textContent = "Please enter an email.";
    return;
  }

  if (!pass) {
    status.textContent = "Please enter a password.";
    return;
  }

  if (pass !== confirm) {
    status.textContent = "Passwords do not match.";
    return;
  }

  status.textContent = "Creating your account...";

  try {
    await createUserWithEmailAndPassword(auth, email, pass);
    status.textContent = "Account created! Logging you in...";
  } catch (err) {
    status.textContent = err.message;
  }
};

document.getElementById("login-btn").onclick = async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value;

  if (!email || !pass) {
    status.textContent = "Enter your email and password.";
    return;
  }

  status.textContent = "Logging you in...";

  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (err) {
    status.textContent = err.message;
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    status.textContent = "Logged in as: " + user.email;

    // 🚀 NEXT STEP: Replace auth UI with DJ UI
    // For now leave this placeholder.
  }
});
