
// ===== 修改为你的密码 =====
const BLOG_PASSWORD = "huiyeen2025"; // ← your current password
// =======================

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
    // 保险起见，直接从 DOM 移除，彻底消失
    overlay.parentNode && overlay.parentNode.removeChild(overlay);
  }
}

// Handle submit
function handleSubmit() {
  const input = document.getElementById("pw-input");
  const hint = document.getElementById("pw-hint");
  if (!input || !hint) return;
  if ((input.value || "").trim() === BLOG_PASSWORD) {
    revealContent();
    hideModal();
  } else {
    hint.textContent = "密码不正确，请再试一次。";
    input.value = "";
    input.focus();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Always show modal on load (no remember)
  const modal = document.getElementById("pw-overlay");
  if (modal) modal.classList.remove("hidden");

  const btn = document.getElementById("pw-btn");
  const input = document.getElementById("pw-input");
  if (btn) btn.addEventListener("click", handleSubmit);
  if (input) {
    input.addEventListener("keydown", function(e){
      if (e.key === "Enter") handleSubmit();
    });
    setTimeout(() => input.focus(), 50);
  }
});
