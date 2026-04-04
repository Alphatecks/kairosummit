const API_BASE_URL = "https://blogger-backend-4d6s.onrender.com";
const AUTH_STORAGE_KEY = "kairos_blogger_auth";

const totalVisitsEl = document.getElementById("totalVisits");
const totalBlogsEl = document.getElementById("totalBlogs");
const totalCommentsEl = document.getElementById("totalComments");
const blogsTableBody = document.getElementById("blogsTableBody");
const pageMessage = document.getElementById("pageMessage");
const refreshBlogsBtn = document.getElementById("refreshBlogsBtn");
const logoutBtn = document.getElementById("logoutBtn");

const editDialog = document.getElementById("editDialog");
const editBlogForm = document.getElementById("editBlogForm");
const editPostId = document.getElementById("editPostId");
const editTitle = document.getElementById("editTitle");
const editExcerpt = document.getElementById("editExcerpt");
const editContent = document.getElementById("editContent");
const editStatus = document.getElementById("editStatus");
const editCoverImageFile = document.getElementById("editCoverImageFile");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const saveEditBtn = document.getElementById("saveEditBtn");
const editMessage = document.getElementById("editMessage");

let blogsCache = [];
let commentsLoadedCount = 0;
let expandedCommentsByPost = {};

function setMessage(el, text, type) {
  el.textContent = text;
  el.classList.remove("is-error", "is-success");
  if (type) el.classList.add(type);
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

function ensureAuthorizedOrRedirect() {
  const headers = getAuthHeaders();
  if (!headers.Authorization) {
    window.location.assign("./index.html");
    return null;
  }
  return headers;
}

async function apiFetch(endpoint, options = {}) {
  const authHeaders = ensureAuthorizedOrRedirect();
  if (!authHeaders) throw new Error("Unauthorized");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...authHeaders,
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const reason =
      (payload && (payload.message || payload.error)) ||
      `Request failed with status ${response.status}`;
    throw new Error(reason);
  }
  return payload;
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function normalizeBlogs(feedPayload) {
  const list = Array.isArray(feedPayload?.data) ? feedPayload.data : [];
  return list.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title || "Untitled",
    excerpt: item.excerpt || "",
    content: item.content || "",
    category: item.category || (Array.isArray(item.categories) ? item.categories[0] : "") || "Uncategorized",
    status: item.status || "published",
    publishedAt: item.publishedAt || item.createdAt || "",
    coverImageUrl: item.coverImageUrl || "",
  }));
}

async function fetchTotalVisits() {
  const candidates = [
    "/api/blogs/visits/total",
    "/api/blogs/stats",
    "/api/blogs/analytics",
  ];
  for (const endpoint of candidates) {
    try {
      const payload = await apiFetch(endpoint);
      const total =
        payload?.totalVisits ??
        payload?.visits ??
        payload?.total ??
        payload?.data?.totalVisits ??
        payload?.data?.visits ??
        payload?.data?.total;
      if (Number.isFinite(total)) return total;
    } catch (error) {
      // try next candidate endpoint
    }
  }
  return 0;
}

function renderCommentsBox(postId, comments = []) {
  const rows = comments.length
    ? comments
        .map(
          (comment) => `
            <article class="comment-item">
              <div class="comment-item__meta">
                <span>${comment.authorName || "Anonymous"}</span>
                <span>${comment.timeAgo || formatDate(comment.createdAt)}</span>
              </div>
              <p class="comment-item__content">${comment.content || ""}</p>
            </article>
          `
        )
        .join("")
    : `<p class="comment-item__content">No comments yet.</p>`;

  return `
    <div class="comments-box" data-post-comments="${postId}">
      <p class="comments-box__title">Comments</p>
      ${rows}
    </div>
  `;
}

function renderBlogsTable() {
  blogsTableBody.innerHTML = "";
  blogsCache.forEach((blog) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <p class="blog-title">${blog.title}</p>
        <p class="blog-slug">${blog.slug}</p>
        ${expandedCommentsByPost[blog.id]?.open ? renderCommentsBox(blog.id, expandedCommentsByPost[blog.id].comments) : ""}
      </td>
      <td>${blog.category}</td>
      <td>${blog.status}</td>
      <td>${formatDate(blog.publishedAt)}</td>
      <td>
        <div class="row-actions">
          <button class="btn btn--ghost" data-action="comments" data-id="${blog.id}">Comments</button>
          <button class="btn btn--ghost" data-action="edit" data-id="${blog.id}">Edit</button>
          <button class="btn btn--danger" data-action="delete" data-id="${blog.id}">Delete</button>
        </div>
      </td>
    `;
    blogsTableBody.appendChild(tr);
  });
}

function openEditDialog(blog) {
  editPostId.value = blog.id;
  editTitle.value = blog.title;
  editExcerpt.value = blog.excerpt;
  editContent.value = blog.content || "";
  editStatus.value = blog.status || "published";
  editCoverImageFile.value = "";
  setMessage(editMessage, "", "");
  editDialog.showModal();
}

async function loadDashboard() {
  setMessage(pageMessage, "Loading dashboard...", "");
  refreshBlogsBtn.disabled = true;
  try {
    const [feedPayload, totalVisits] = await Promise.all([
      apiFetch("/api/blogs/feed?page=1&limit=100"),
      fetchTotalVisits(),
    ]);

    blogsCache = normalizeBlogs(feedPayload);
    totalBlogsEl.textContent = `${blogsCache.length}`;
    totalVisitsEl.textContent = `${totalVisits}`;
    totalCommentsEl.textContent = `${commentsLoadedCount}`;
    renderBlogsTable();
    setMessage(pageMessage, "Dashboard updated.", "is-success");
  } catch (error) {
    setMessage(pageMessage, error.message || "Failed to load dashboard.", "is-error");
  } finally {
    refreshBlogsBtn.disabled = false;
  }
}

async function loadCommentsForBlog(blog) {
  const cached = expandedCommentsByPost[blog.id];
  if (cached && cached.open) {
    expandedCommentsByPost[blog.id] = { ...cached, open: false };
    renderBlogsTable();
    return;
  }

  setMessage(pageMessage, "Loading comments...", "");
  try {
    let payload = null;
    try {
      payload = await apiFetch(`/api/blogs/${encodeURIComponent(blog.id)}/comments`);
    } catch (error) {
      payload = await apiFetch(`/api/blogs/${encodeURIComponent(blog.slug)}/comments`);
    }
    const comments = Array.isArray(payload?.data) ? payload.data : [];
    commentsLoadedCount += comments.length;
    totalCommentsEl.textContent = `${commentsLoadedCount}`;
    expandedCommentsByPost[blog.id] = { open: true, comments };
    renderBlogsTable();
    setMessage(pageMessage, "Comments loaded.", "is-success");
  } catch (error) {
    setMessage(pageMessage, error.message || "Failed to load comments.", "is-error");
  }
}

async function deleteBlog(blog) {
  const confirmed = window.confirm(`Delete "${blog.title}"? This action cannot be undone.`);
  if (!confirmed) return;
  setMessage(pageMessage, "Deleting blog...", "");
  try {
    await apiFetch(`/api/blogs/${encodeURIComponent(blog.id)}`, { method: "DELETE" });
    blogsCache = blogsCache.filter((item) => item.id !== blog.id);
    delete expandedCommentsByPost[blog.id];
    totalBlogsEl.textContent = `${blogsCache.length}`;
    renderBlogsTable();
    setMessage(pageMessage, "Blog deleted.", "is-success");
  } catch (error) {
    setMessage(pageMessage, error.message || "Failed to delete blog.", "is-error");
  }
}

blogsTableBody.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const postId = button.dataset.id;
  const blog = blogsCache.find((item) => item.id === postId);
  if (!blog) return;

  if (action === "comments") {
    await loadCommentsForBlog(blog);
    return;
  }
  if (action === "edit") {
    openEditDialog(blog);
    return;
  }
  if (action === "delete") {
    await deleteBlog(blog);
  }
});

editBlogForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const postId = editPostId.value;
  if (!postId) return;

  const nextTitle = editTitle.value.trim();
  const nextExcerpt = editExcerpt.value.trim();
  const nextContent = editContent.value.trim();
  const nextStatus = editStatus.value;
  const nextCoverImageFile = editCoverImageFile.files[0] || null;

  saveEditBtn.disabled = true;
  setMessage(editMessage, "Saving changes...", "");
  try {
    const formData = new FormData();
    formData.append("title", nextTitle);
    formData.append("content", nextContent);
    formData.append("excerpt", nextExcerpt);
    formData.append("status", nextStatus);
    formData.append("isTopHeader", "false");
    if (nextCoverImageFile) {
      formData.append("coverImage", nextCoverImageFile);
    }

    await apiFetch(`/api/blogs/${encodeURIComponent(postId)}`, {
      method: "PUT",
      body: formData,
    });

    blogsCache = blogsCache.map((item) =>
      (item.id === postId
        ? {
            ...item,
            title: nextTitle,
            excerpt: nextExcerpt,
            content: nextContent,
            status: nextStatus,
          }
        : item)
    );
    renderBlogsTable();
    setMessage(editMessage, "Blog updated successfully.", "is-success");
    setTimeout(() => editDialog.close(), 450);
  } catch (error) {
    setMessage(editMessage, error.message || "Could not update blog.", "is-error");
  } finally {
    saveEditBtn.disabled = false;
  }
});

cancelEditBtn.addEventListener("click", () => editDialog.close());

refreshBlogsBtn.addEventListener("click", loadDashboard);
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.location.assign("./index.html");
});

if (!ensureAuthorizedOrRedirect()) {
  // redirected
} else {
  loadDashboard();
}
