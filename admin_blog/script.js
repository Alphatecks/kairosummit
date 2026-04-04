const form = document.getElementById("adminLoginForm");
const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");
const emailInput = document.getElementById("email");
const fullNameInput = document.getElementById("fullName");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const profilePhotoInput = document.getElementById("profilePhoto");
const togglePasswordBtn = document.getElementById("togglePassword");
const submitButton = document.getElementById("submitButton");
const authSwitchText = document.getElementById("authSwitchText");
const authSwitchButton = document.getElementById("authSwitchButton");
const formMessage = document.getElementById("formMessage");
let isSignupMode = false;
let isSubmitting = false;

const API_BASE_URL = "https://blogger-backend-4d6s.onrender.com";
const SIGNUP_ENDPOINT = `${API_BASE_URL}/api/auth/signup`;
const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/login`;

function setMessage(text, type) {
  formMessage.textContent = text;
  formMessage.classList.remove("is-error", "is-success");
  if (type) formMessage.classList.add(type);
}

function setSubmittingState(nextSubmitting) {
  isSubmitting = nextSubmitting;
  submitButton.disabled = nextSubmitting;
  authSwitchButton.disabled = nextSubmitting;
  submitButton.textContent = nextSubmitting
    ? isSignupMode
      ? "Creating account..."
      : "Signing in..."
    : isSignupMode
      ? "Create account"
      : "Sign in";
}

async function parseApiResponse(response) {
  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }

  if (!response.ok) {
    const message =
      (payload && (payload.message || payload.error)) ||
      "Request failed. Please try again.";
    throw new Error(message);
  }

  return payload;
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
  profilePhotoInput.required = isSignupMode;
  fullNameInput.value = "";
  confirmPasswordInput.value = "";
  profilePhotoInput.value = "";
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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isSubmitting) return;

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const profilePhoto = profilePhotoInput.files[0];

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

    if (!profilePhoto) {
      setMessage("Upload a profile photo to complete signup.", "is-error");
      return;
    }

    if (!profilePhoto.type.startsWith("image/")) {
      setMessage("Profile photo must be an image file.", "is-error");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("photo", profilePhoto);

    try {
      setSubmittingState(true);
      await parseApiResponse(
        await fetch(SIGNUP_ENDPOINT, {
          method: "POST",
          body: formData,
        })
      );
      setMessage("Signup successful. Redirecting to blogger dashboard...", "is-success");
    } catch (error) {
      setMessage(error.message, "is-error");
    } finally {
      setSubmittingState(false);
    }
    return;
  }

  try {
    setSubmittingState(true);
    await parseApiResponse(
      await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
    );
    setMessage("Login successful. Redirecting to blogger dashboard...", "is-success");
  } catch (error) {
    setMessage(error.message, "is-error");
  } finally {
    setSubmittingState(false);
  }
});
