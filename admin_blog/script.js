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
const DASHBOARD_URL = "./dashboard.html";
const AUTH_STORAGE_KEY = "kairos_blogger_auth";

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

function readTokenFromPayload(payload) {
  return (
    (payload && payload.session && (payload.session.access_token || payload.session.accessToken || payload.session.token)) ||
    (payload && (payload.token || payload.accessToken || payload.jwt || payload.access_token)) ||
    (payload &&
      payload.data &&
      (payload.data.token || payload.data.accessToken || payload.data.jwt || payload.data.access_token)) ||
    (payload &&
      payload.user &&
      (payload.user.token || payload.user.accessToken || payload.user.jwt || payload.user.access_token)) ||
    ""
  );
}

function readTokenTypeFromPayload(payload) {
  return (
    (payload && payload.session && (payload.session.token_type || payload.session.tokenType)) ||
    payload?.token_type ||
    payload?.tokenType ||
    payload?.data?.token_type ||
    payload?.data?.tokenType ||
    "bearer"
  );
}

function normalizeTokenType(value) {
  const type = `${value || ""}`.trim();
  if (!type) return "Bearer";
  if (type.toLowerCase() === "bearer") return "Bearer";
  return type;
}

function readTokenFromHeaders(response) {
  const rawHeader =
    response.headers.get("authorization") ||
    response.headers.get("Authorization") ||
    response.headers.get("x-access-token") ||
    response.headers.get("X-Access-Token") ||
    "";

  if (!rawHeader) return "";
  return rawHeader.toLowerCase().startsWith("bearer ")
    ? rawHeader.slice(7).trim()
    : rawHeader.trim();
}

function persistAuthSession(response, payload, email) {
  const tokenFromPayload = readTokenFromPayload(payload);
  const tokenFromHeaders = readTokenFromHeaders(response);
  const token = tokenFromPayload || tokenFromHeaders || "";
  const tokenType = normalizeTokenType(readTokenTypeFromPayload(payload));
  const safeEmail = `${email || ""}`.trim();
  const user =
    (payload && payload.session && payload.session.user) ||
    (payload && (payload.user || payload.admin)) ||
    (payload && payload.data && (payload.data.user || payload.data.admin)) ||
    { email: safeEmail };

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token,
      tokenType,
      user,
      email: safeEmail,
      savedAt: new Date().toISOString(),
    })
  );

  console.log("[Admin Login] token stored:", Boolean(token), "token type:", tokenType);
}

function redirectToDashboard() {
  window.location.assign(DASHBOARD_URL);
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
      const signupResponse = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const signupPayload = await parseApiResponse(signupResponse);
      persistAuthSession(signupResponse, signupPayload, email);
      setMessage("Signup successful. Redirecting to blogger dashboard...", "is-success");
      setTimeout(redirectToDashboard, 500);
    } catch (error) {
      setMessage(error.message, "is-error");
    } finally {
      setSubmittingState(false);
    }
    return;
  }

  try {
    setSubmittingState(true);
    const loginResponse = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    let loginDebugPayload = null;
    try {
      loginDebugPayload = await loginResponse.clone().json();
    } catch (error) {
      loginDebugPayload = null;
    }
    console.log("[Admin Login] status:", loginResponse.status);
    console.log("[Admin Login] authorization header:", loginResponse.headers.get("authorization"));
    console.log("[Admin Login] payload:", loginDebugPayload);
    const loginPayload = await parseApiResponse(loginResponse);
    persistAuthSession(loginResponse, loginPayload, email);
    setMessage("Login successful. Redirecting to blogger dashboard...", "is-success");
    setTimeout(redirectToDashboard, 500);
  } catch (error) {
    setMessage(error.message, "is-error");
  } finally {
    setSubmittingState(false);
  }
});
