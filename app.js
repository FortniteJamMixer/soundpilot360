// app.js — Full debug version for SoundPilot360 Authentication (Firebase 12.6.0)

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

console.log("SoundPilot360 app.js loaded (Debug Mode)");

// Firebase auth instance (created in index.html)
const auth = window.auth;

// DOM elements
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const passConfirmInput = document.getElementById("passwordConfirm");
const status = document.getElementById("auth-status");

// Helper
function show(message) {
  status.textContent = message;
  console.log("AUTH:", message);
}

// GLOBAL ERROR CATCHER
window.addEventListener("error", (event) => {
  console.error("GLOBAL ERROR:", event.error);
});
window.addEventListener("unhandledrejection", (event) => {
  console.error("UNHANDLED PROMISE:", event.reason);
});

// SIGNUP FLOW
document.getElementById("signup-btn").onclick = async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value;
  const confirm = passConfirmInput.value;

  show("");

  if (!email) return show("Please enter an email.");
  if (!pass) return show("Please enter a password.");
  if (pass !== confirm) return show("Passwords do not match.");

  show("Creating account...");

  try {
    console.log("SIGNUP TRY:", email);
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    console.log("SIGNUP RESULT:", result);
    show("Account created! Logged in as " + result.user.email);
  } catch (err) {
    console.error("SIGNUP ERROR OBJECT:", err);
    show(`Signup error: ${err.code} — ${err.message}`);
  }
};

// LOGIN
document.getElementById("login-btn").onclick = async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value;

  if (!email || !pass) return show("Enter your email & password.");

  show("Logging in...");

  try {
    console.log("LOGIN TRY:", email);
    const result = await signInWithEmailAndPassword(auth, email, pass);
    console.log("LOGIN RESULT:", result);
    show("Logged in as " + result.user.email);
  } catch (err) {
    console.error("LOGIN ERROR OBJECT:", err);
    show(`Login error: ${err.code} — ${err.message}`);
  }
};

// LISTEN FOR LOGIN STATE CHANGES
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("AUTH STATE: LOGGED IN →", user.email);
    show("Logged in as " + user.email);
  } else {
    console.log("AUTH STATE: LOGGED OUT");
  }
});
