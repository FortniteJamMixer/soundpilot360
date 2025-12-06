// app.js — SoundPilot360 Authentication (Official Build)

// Import from Firebase CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// -----------------------------------------
// 🔥 REPLACE THIS CONFIG WITH YOUR OWN
// (paste your full Firebase config here)
// -----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDsHDFgTF0DLi_Xdng1L_g2RSQ7jzX6uw",
  authDomain: "soundpilot360-6b29d.firebaseapp.com",
  projectId: "soundpilot360-6b29d",
  storageBucket: "soundpilot360-6b29d.firebasestorage.app",
  messagingSenderId: "474632587160",
  appId: "1:474632587160:web:1290618fa4345258ffcded",
  measurementId: "G-LX6VFBSNHS"
};

// Initialize Firebase + Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("SoundPilot360 Authentication Loaded");

// DOM
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const passConfirmInput = document.getElementById("passwordConfirm");
const status = document.getElementById("auth-status");

function show(msg) {
  status.textContent = msg;
  console.log("AUTH:", msg);
}

// SIGNUP
document.getElementById("signup-btn").onclick = async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value;
  const confirm = passConfirmInput.value;

  if (!email) return show("Please enter an email.");
  if (!pass) return show("Please enter a password.");
  if (pass !== confirm) return show("Passwords do not match.");

  show("Creating account...");

  try {
    await createUserWithEmailAndPassword(auth, email, pass);
    show("Account created! Logging in…");
  } catch (err) {
    show(err.message);
  }
};

// LOGIN
document.getElementById("login-btn").onclick = async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value;

  if (!email || !pass) return show("Enter your email & password.");

  show("Logging in...");

  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (err) {
    show(err.message);
  }
};

// LOGOUT
document.getElementById("logout-btn")?.addEventListener("click", async () => {
  await signOut(auth);
});

// WATCH AUTH STATE
onAuthStateChanged(auth, (user) => {
  if (user) {
    show("Logged in as: " + user.email);
    document.body.classList.add("logged-in");
  } else {
    show("You're logged out.");
    document.body.classList.remove("logged-in");
  }
});
