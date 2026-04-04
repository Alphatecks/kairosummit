const form = document.getElementById("blogPublisherForm");
const formMessage = document.getElementById("formMessage");
const publishBtn = document.getElementById("publishBtn");
const publishTopHeaderBtn = document.getElementById("publishTopHeaderBtn");
const topHeaderMessage = document.getElementById("topHeaderMessage");
const saveDraftBtn = document.getElementById("saveDraftBtn");
const clearDraftBtn = document.getElementById("clearDraftBtn");

const topHeaderImageInput = document.getElementById("topHeaderImageFile");
const topHeaderTitleInput = document.getElementById("topHeaderTitle");
const topHeaderExcerptInput = document.getElementById("topHeaderExcerpt");
const topHeaderStatusInput = document.getElementById("topHeaderStatus");
const topHeaderContentInput = document.getElementById("topHeaderContent");

const postTitleInput = document.getElementById("postTitle");
const postExcerptInput = document.getElementById("postExcerpt");
const postContentInput = document.getElementById("postContent");
const postCoverImageFileInput = document.getElementById("postCoverImageFile");
const postStatusInput = document.getElementById("postStatus");
const postCategoryInput = document.getElementById("postCategory");
const previewCoverImage = document.getElementById("previewCoverImage");
const previewCategory = document.getElementById("previewCategory");
const previewTitle = document.getElementById("previewTitle");
const previewExcerpt = document.getElementById("previewExcerpt");
const previewTags = document.getElementById("previewTags");
const previewStatus = document.getElementById("previewStatus");
const previewContent = document.getElementById("previewContent");

const DRAFT_STORAGE_KEY = "kairos_admin_blog_draft_v2";
const PUBLISH_API_BASE_URL = "https://blogger-backend-4d6s.onrender.com";
const PUBLISH_BLOG_ENDPOINT = "/api/blogs";
const PUBLISH_TOP_HEADER_ENDPOINT = "/api/blogs";
const AUTH_STORAGE_KEY = "kairos_blogger_auth";
let isSubmitting = false;
let coverPreviewObjectUrl = "";

function setMessage(text, type) {
  formMessage.textContent = text;
  formMessage.classList.remove("is-error", "is-success");
  if (type) formMessage.classList.add(type);
}

function setScopedMessage(target, text, type) {
  target.textContent = text;
  target.classList.remove("is-error", "is-success");
  if (type) target.classList.add(type);
}

function getApiUrl(baseUrl, endpoint) {
  const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl.replace(/\/$/, "")}${safeEndpoint}`;
}

function getAuthHeaders() {
  const headers = {};
  try {
    const savedAuth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "{}");
    const rawToken = `${
      savedAuth.token ||
      savedAuth.accessToken ||
      savedAuth.jwt ||
      savedAuth.access_token ||
      (savedAuth.session && (savedAuth.session.access_token || savedAuth.session.accessToken || savedAuth.session.token)) ||
      (savedAuth.data && (savedAuth.data.token || savedAuth.data.accessToken || savedAuth.data.jwt)) ||
      ""
    }`.trim();
    const tokenType = `${savedAuth.tokenType || savedAuth.token_type || "Bearer"}`.trim() || "Bearer";
    const normalizedType = tokenType.toLowerCase() === "bearer" ? "Bearer" : tokenType;

    if (rawToken) {
      headers.Authorization = rawToken.toLowerCase().startsWith("bearer ")
        ? rawToken
        : `${normalizedType} ${rawToken}`;
    }
  } catch (error) {
    // ignore malformed auth storage
  }
  return headers;
}

function hasAuthorizationHeader(headers) {
  return Boolean(headers.Authorization || headers.authorization);
}

function maskTokenForLog(headers) {
  const headerValue = `${headers.Authorization || headers.authorization || ""}`.trim();
  if (!headerValue) return "none";
  const [, token = ""] = headerValue.split(/\s+/, 2);
  if (!token) return "present (non-standard)";
  return `${token.slice(0, 12)}...`;
}

function collectPostPayload() {
  const coverImageFile = postCoverImageFileInput.files[0] || null;

  return {
    title: postTitleInput.value.trim(),
    excerpt: postExcerptInput.value.trim(),
    content: postContentInput.value.trim(),
    coverImageFile,
    status: postStatusInput.value.trim(),
    category: postCategoryInput.value.trim(),
    tags: [],
  };
}

function validatePostPayload(payload) {
  if (!payload.title) return "Post title is required.";
  if (!payload.excerpt) return "Excerpt is required.";
  if (!payload.content) return "Content is required.";
  if (!payload.coverImageFile) return "Cover image file is required.";
  if (!payload.coverImageFile.type.startsWith("image/")) return "Cover image must be an image file.";
  if (!payload.status) return "Status is required.";
  if (!payload.category) return "Category is required.";
  return "";
}

function collectTopHeaderPayload() {
  return {
    imageFile: topHeaderImageInput.files[0] || null,
    title: topHeaderTitleInput.value.trim(),
    excerpt: topHeaderExcerptInput.value.trim(),
    content: topHeaderContentInput.value.trim(),
    status: topHeaderStatusInput.value.trim() || "published",
  };
}

function validateTopHeaderPayload(payload) {
  if (!payload.imageFile) return "Top header image file is required.";
  if (!payload.imageFile.type.startsWith("image/")) return "Top header image must be an image file.";
  if (!payload.title) return "Top header title is required.";
  if (!payload.excerpt) return "Top header excerpt is required.";
  if (!payload.content) return "Top header content is required.";
  if (!payload.status) return "Top header status is required.";
  return "";
}

function updatePreview() {
  const payload = collectPostPayload();

  if (coverPreviewObjectUrl) {
    URL.revokeObjectURL(coverPreviewObjectUrl);
    coverPreviewObjectUrl = "";
  }
  if (payload.coverImageFile) {
    coverPreviewObjectUrl = URL.createObjectURL(payload.coverImageFile);
    previewCoverImage.src = coverPreviewObjectUrl;
  } else {
    previewCoverImage.removeAttribute("src");
  }

  previewCategory.textContent = payload.category || "Category";
  previewTitle.textContent = payload.title || "Post title preview";
  previewExcerpt.textContent = payload.excerpt || "Excerpt preview";
  previewStatus.textContent = `Status: ${payload.status || "draft"}`;
  previewContent.textContent = payload.content
    ? payload.content.slice(0, 220) + (payload.content.length > 220 ? "..." : "")
    : "Content preview";

  previewTags.innerHTML = "";
}

function restoreDraft() {
  const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
  if (!saved) {
    updatePreview();
    return;
  }

  try {
    const draft = JSON.parse(saved);
    const keys = [
      "topHeaderTitle",
      "topHeaderExcerpt",
      "topHeaderStatus",
      "topHeaderContent",
      "postTitle",
      "postExcerpt",
      "postContent",
      "postStatus",
      "postCategory",
    ];
    keys.forEach((key) => {
      const input = form.elements.namedItem(key);
      if (!input || draft[key] === undefined) return;
      input.value = draft[key];
    });
    setMessage("Draft restored from this browser.", "is-success");
  } catch (error) {
    setMessage("Saved draft could not be restored.", "is-error");
  } finally {
    updatePreview();
  }
}

function saveDraft() {
  const draft = {
    topHeaderTitle: topHeaderTitleInput.value,
    topHeaderExcerpt: topHeaderExcerptInput.value,
    topHeaderStatus: topHeaderStatusInput.value,
    topHeaderContent: topHeaderContentInput.value,
    postTitle: postTitleInput.value,
    postExcerpt: postExcerptInput.value,
    postContent: postContentInput.value,
    postStatus: postStatusInput.value,
    postCategory: postCategoryInput.value,
  };
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  setMessage("Draft saved locally (top header image file is not stored).", "is-success");
}

function clearDraft() {
  localStorage.removeItem(DRAFT_STORAGE_KEY);
  form.reset();
  updatePreview();
  setMessage("Draft cleared.", "is-success");
}

form.addEventListener("input", updatePreview);
saveDraftBtn.addEventListener("click", saveDraft);
clearDraftBtn.addEventListener("click", clearDraft);

publishTopHeaderBtn.addEventListener("click", async () => {
  if (isSubmitting) return;

  const headerPayload = collectTopHeaderPayload();
  const validationError = validateTopHeaderPayload(headerPayload);
  if (validationError) {
    setScopedMessage(topHeaderMessage, validationError, "is-error");
    return;
  }

  isSubmitting = true;
  publishTopHeaderBtn.disabled = true;
  publishBtn.disabled = true;
  publishTopHeaderBtn.textContent = "Publishing...";
  setScopedMessage(topHeaderMessage, "", "");

  try {
    const authHeaders = getAuthHeaders();
    console.log("[Top Header Publish] has auth header:", hasAuthorizationHeader(authHeaders), "token preview:", maskTokenForLog(authHeaders));
    if (!hasAuthorizationHeader(authHeaders)) {
      throw new Error("Missing auth token. Please login again before publishing.");
    }

    const requestBody = new FormData();
    requestBody.append("coverImage", headerPayload.imageFile);
    requestBody.append("title", headerPayload.title);
    requestBody.append("excerpt", headerPayload.excerpt);
    requestBody.append("content", headerPayload.content);
    requestBody.append("status", headerPayload.status);
    requestBody.append("isTopHeader", "true");

    const response = await fetch(getApiUrl(PUBLISH_API_BASE_URL, PUBLISH_TOP_HEADER_ENDPOINT), {
      method: "POST",
      headers: authHeaders,
      body: requestBody,
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error((payload && (payload.message || payload.error)) || `Top header publish failed (${response.status}).`);
    }
    setScopedMessage(topHeaderMessage, "Top story header published successfully.", "is-success");
  } catch (error) {
    setScopedMessage(topHeaderMessage, error.message || "Could not publish top story header.", "is-error");
  } finally {
    isSubmitting = false;
    publishTopHeaderBtn.disabled = false;
    publishBtn.disabled = false;
    publishTopHeaderBtn.textContent = "Publish Top Story Header";
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isSubmitting) return;

  const payload = collectPostPayload();
  const validationError = validatePostPayload(payload);
  if (validationError) {
    setMessage(validationError, "is-error");
    return;
  }

  isSubmitting = true;
  publishBtn.disabled = true;
  publishTopHeaderBtn.disabled = true;
  publishBtn.textContent = "Publishing...";
  setMessage("", "");

  try {
    const authHeaders = getAuthHeaders();
    console.log("[Blog Publish] has auth header:", hasAuthorizationHeader(authHeaders), "token preview:", maskTokenForLog(authHeaders));
    if (!hasAuthorizationHeader(authHeaders)) {
      throw new Error("Missing auth token. Please login again before publishing.");
    }

    const response = await fetch(getApiUrl(PUBLISH_API_BASE_URL, PUBLISH_BLOG_ENDPOINT), {
      method: "POST",
      headers: authHeaders,
      body: (() => {
        const requestBody = new FormData();
        requestBody.append("title", payload.title);
        requestBody.append("excerpt", payload.excerpt);
        requestBody.append("content", payload.content);
        requestBody.append("status", payload.status);
        requestBody.append("category", payload.category);
        requestBody.append("coverImage", payload.coverImageFile);
        return requestBody;
      })(),
    });

    const responsePayload = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(
        (responsePayload && (responsePayload.message || responsePayload.error)) ||
          `Publish failed with status ${response.status}.`
      );
    }

    setMessage("Blog post published successfully.", "is-success");
    saveDraft();
  } catch (error) {
    setMessage(error.message || "Could not publish post.", "is-error");
  } finally {
    isSubmitting = false;
    publishBtn.disabled = false;
    publishTopHeaderBtn.disabled = false;
    publishBtn.textContent = "Publish to database";
  }
});

restoreDraft();
