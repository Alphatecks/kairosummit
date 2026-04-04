const form = document.getElementById("blogPublisherForm");
const payloadPreview = document.getElementById("payloadPreview");
const formMessage = document.getElementById("formMessage");
const publishBtn = document.getElementById("publishBtn");
const saveDraftBtn = document.getElementById("saveDraftBtn");
const clearDraftBtn = document.getElementById("clearDraftBtn");
const titleInput = document.getElementById("title");
const slugInput = document.getElementById("slug");

const DRAFT_STORAGE_KEY = "kairos_admin_blog_draft_v1";
let isSubmitting = false;
let userEditedSlug = false;

function setMessage(text, type) {
  formMessage.textContent = text;
  formMessage.classList.remove("is-error", "is-success");
  if (type) formMessage.classList.add(type);
}

function toSlug(value) {
  return `${value || ""}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeLines(rawText) {
  return `${rawText || ""}`
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSeedComments(rawText) {
  return normalizeLines(rawText)
    .map((line, index) => {
      const [name, reply, date] = line.split("|").map((part) => `${part || ""}`.trim());
      if (!name || !reply) return null;
      return {
        id: `seed-${Date.now()}-${index + 1}`,
        name,
        reply,
        date: date || "Just now",
      };
    })
    .filter(Boolean);
}

function getApiUrl(baseUrl, endpoint) {
  const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return baseUrl ? `${baseUrl.replace(/\/$/, "")}${safeEndpoint}` : safeEndpoint;
}

function collectDataFromForm() {
  const data = new FormData(form);
  const title = `${data.get("title") || ""}`.trim();
  const slug = `${data.get("slug") || ""}`.trim();
  const body = normalizeLines(data.get("body"));
  const excerpt = `${data.get("excerpt") || ""}`.trim();

  return {
    apiBaseUrl: `${data.get("apiBaseUrl") || ""}`.trim(),
    apiEndpoint: `${data.get("apiEndpoint") || ""}`.trim() || "/api/blog/posts",
    apiToken: `${data.get("apiToken") || ""}`.trim(),
    post: {
      title,
      slug,
      category: `${data.get("category") || ""}`.trim(),
      tag: `${data.get("tag") || ""}`.trim() || "update",
      image: `${data.get("imageUrl") || ""}`.trim(),
      author: `${data.get("author") || ""}`.trim(),
      authorAvatarUrl: `${data.get("authorAvatarUrl") || ""}`.trim(),
      date: `${data.get("date") || ""}`.trim(),
      readTime: `${data.get("readTime") || ""}`.trim(),
      status: `${data.get("status") || ""}`.trim() || "draft",
      featured: Boolean(data.get("isFeatured")),
      excerpt,
      body,
      seedComments: parseSeedComments(data.get("seedComments")),
    },
  };
}

function validatePayload(payload) {
  const { post } = payload;
  if (!post.title) return "Title is required.";
  if (!post.slug) return "Slug is required.";
  if (!post.category) return "Category is required.";
  if (!post.image) return "Featured image URL is required.";
  if (!post.author) return "Author name is required.";
  if (!post.date) return "Display date is required.";
  if (!post.readTime) return "Read time is required.";
  if (!post.excerpt) return "Excerpt is required.";
  if (post.body.length === 0) return "Add at least one body paragraph.";
  return "";
}

function updatePreview() {
  const payload = collectDataFromForm();
  payloadPreview.textContent = JSON.stringify(payload.post, null, 2);
}

function restoreDraft() {
  const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
  if (!saved) {
    updatePreview();
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    const supportedKeys = [
      "apiBaseUrl",
      "apiEndpoint",
      "apiToken",
      "title",
      "slug",
      "category",
      "tag",
      "imageUrl",
      "author",
      "authorAvatarUrl",
      "date",
      "readTime",
      "status",
      "isFeatured",
      "excerpt",
      "body",
      "seedComments",
    ];

    supportedKeys.forEach((key) => {
      const input = form.elements.namedItem(key);
      if (!input || parsed[key] === undefined) return;
      if (input.type === "checkbox") {
        input.checked = Boolean(parsed[key]);
      } else {
        input.value = parsed[key];
      }
    });

    if (parsed.slug) {
      userEditedSlug = true;
    }
    setMessage("Draft restored from this browser.", "is-success");
  } catch (error) {
    setMessage("Saved draft could not be restored.", "is-error");
  } finally {
    updatePreview();
  }
}

function saveDraft() {
  const data = new FormData(form);
  const draft = {};
  for (const [key, value] of data.entries()) {
    draft[key] = value;
  }
  draft.isFeatured = document.getElementById("isFeatured").checked;
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  setMessage("Draft saved locally.", "is-success");
}

function clearDraft() {
  localStorage.removeItem(DRAFT_STORAGE_KEY);
  form.reset();
  userEditedSlug = false;
  updatePreview();
  setMessage("Draft cleared.", "is-success");
}

titleInput.addEventListener("input", () => {
  if (userEditedSlug) return;
  slugInput.value = toSlug(titleInput.value);
  updatePreview();
});

slugInput.addEventListener("input", () => {
  userEditedSlug = slugInput.value.trim().length > 0;
  updatePreview();
});

form.addEventListener("input", updatePreview);
saveDraftBtn.addEventListener("click", saveDraft);
clearDraftBtn.addEventListener("click", clearDraft);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isSubmitting) return;

  const payload = collectDataFromForm();
  const validationError = validatePayload(payload);
  if (validationError) {
    setMessage(validationError, "is-error");
    return;
  }

  const targetUrl = getApiUrl(payload.apiBaseUrl, payload.apiEndpoint);
  const headers = { "Content-Type": "application/json" };
  if (payload.apiToken) {
    headers.Authorization = `Bearer ${payload.apiToken}`;
  }

  isSubmitting = true;
  publishBtn.disabled = true;
  publishBtn.textContent = "Publishing...";
  setMessage("", "");

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload.post),
    });

    let responsePayload = null;
    try {
      responsePayload = await response.json();
    } catch (error) {
      responsePayload = null;
    }

    if (!response.ok) {
      const reason =
        (responsePayload && (responsePayload.message || responsePayload.error)) ||
        `Publish failed with status ${response.status}.`;
      throw new Error(reason);
    }

    setMessage("Post published successfully to the database endpoint.", "is-success");
    saveDraft();
  } catch (error) {
    setMessage(error.message || "Could not publish post.", "is-error");
  } finally {
    isSubmitting = false;
    publishBtn.disabled = false;
    publishBtn.textContent = "Publish to database";
  }
});

restoreDraft();
