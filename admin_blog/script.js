const form = document.getElementById("adminLoginForm");
const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");
const emailInput = document.getElementById("email");
const fullNameInput = document.getElementById("fullName");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const togglePasswordBtn = document.getElementById("togglePassword");
const submitButton = document.getElementById("submitButton");
const authSwitchText = document.getElementById("authSwitchText");
const authSwitchButton = document.getElementById("authSwitchButton");
const formMessage = document.getElementById("formMessage");
let isSignupMode = false;

function setMessage(text, type) {
  formMessage.textContent = text;
  formMessage.classList.remove("is-error", "is-success");
  if (type) formMessage.classList.add(type);
}

function applyAuthMode() {
  form.classList.toggle("is-signup", isSignupMode);
  authTitle.textContent = isSignupMode ? "Blogger Signup" : "Blogger Login";
  authSubtitle.textContent = isSignupMode
    ? "Create your blogger account to publish posts and moderate comments."
    : "Sign in to manage posts, moderate comments, and publish updates.";
  submitButton.textContent = isSignupMode ? "Create account" : "Sign in";
  authSwitchText.textContent = isSignupMode
    ? "Already have an account?"
    : "No account yet?";
  authSwitchButton.textContent = isSignupMode ? "Back to login" : "Create signup";
  emailInput.autocomplete = isSignupMode ? "username" : "email";
  passwordInput.autocomplete = isSignupMode ? "new-password" : "current-password";
  fullNameInput.required = isSignupMode;
  confirmPasswordInput.required = isSignupMode;
  fullNameInput.value = "";
  confirmPasswordInput.value = "";
  setMessage("", "");
}

authSwitchButton.addEventListener("click", () => {
  isSignupMode = !isSignupMode;
  applyAuthMode();
});

togglePasswordBtn.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePasswordBtn.textContent = isPassword ? "Hide" : "Show";
  togglePasswordBtn.setAttribute(
    "aria-label",
    isPassword ? "Hide password" : "Show password"
  );
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (!email || !password) {
    setMessage("Enter both email and password.", "is-error");
    return;
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validEmail) {
    setMessage("Enter a valid email address.", "is-error");
    return;
  }

  if (password.length < 8) {
    setMessage("Password must be at least 8 characters.", "is-error");
    return;
  }

  if (isSignupMode) {
    if (!fullName) {
      setMessage("Enter your full name.", "is-error");
      return;
    }

    if (confirmPassword !== password) {
      setMessage("Password confirmation does not match.", "is-error");
      return;
    }

    // UI-only success state. Connect this to your backend auth endpoint.
    setMessage("Signup successful. Redirecting to blogger dashboard...", "is-success");
    return;
  }

  // UI-only success state. Connect this to your backend auth endpoint.
  setMessage("Login successful. Redirecting to blogger dashboard...", "is-success");
});
