// ===== 修改为你的密码 =====
const BLOG_PASSWORD = "huiyeen2025"; // ← set your password here
// =========================
const SESSION_KEY = "blog_pass_ok";

function isUnlocked() {
  try { return sessionStorage.getItem(SESSION_KEY) === "1"; }
  catch (e) { return false; }
}

function setUnlocked() {
  try { sessionStorage.setItem(SESSION_KEY, "1"); }
  catch (e) {}
}

// 公共登出函数（header 的 Logout 按钮会调用）
function logout() {
  try { sessionStorage.removeItem(SESSION_KEY); }
  catch (e) {}
  // 跳回主页并强制重新要求密码
  location.href = "index.html";
}

function revealContent() {
  const el = document.getElementById("content");
  if (el) el.classList.remove("hidden");
  const mask = document.getElementById("mask");
  if (mask) mask.remove();
}

function hideModal() {
  const overlay = document.getElementById("pw-overlay");
  if (overlay) {
    overlay.classList.add("hidden");
    // 从 DOM 中移除，确保不会残留在页面上
    overlay.parentNode && overlay.parentNode.removeChild(overlay);
  }
}

function handleSubmit() {
  const input = document.getElementById("pw-input");
  const hint = document.getElementById("pw-hint");
  if (!input || !hint) return;

  // trim 避免输入前后空格造成匹配失败
  if ((input.value || "").trim() === BLOG_PASSWORD) {
    setUnlocked();
    revealContent();
    hideModal();
  } else {
    hint.textContent = "密码不正确，请再试一次。";
    input.value = "";
    input.focus();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // 如果本次会话已解锁，则直接显示内容（在同一浏览器会话切换页面不需重输）
  if (isUnlocked()) {
    revealContent();
  } else {
    // 否则显示 modal 要求输入密码
    const modal = document.getElementById("pw-overlay");
    if (modal) modal.classList.remove("hidden");
  }

  const btn = document.getElementById("pw-btn");
  const input = document.getElementById("pw-input");
  if (btn) btn.addEventListener("click", handleSubmit);
  if (input) {
    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") handleSubmit();
    });
    setTimeout(() => input.focus(), 50);
  }
});

// on success:
window.onPasswordGranted();

