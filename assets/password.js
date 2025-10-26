
// ======= 设置你的密码（修改下行） =======
const BLOG_PASSWORD = "huiyeen2025";
// ======================================

function askPasswordIfNeeded() {
  try {
    const key = "blog_pass_ok";
    const ok = sessionStorage.getItem(key);
    if (ok === "1") { revealContent(); return; }
    const input = prompt("请输入密码查看此页内容：");
    if (input === BLOG_PASSWORD) {
      sessionStorage.setItem(key, "1");
      revealContent();
    } else {
      alert("密码错误。");
      // 简单处理：停留在空页。可根据需要跳转到 404。
    }
  } catch (e) {
    console.error(e);
  }
}

function revealContent() {
  const el = document.getElementById("content");
  if (el) el.classList.remove("hidden");
  const mask = document.getElementById("mask");
  if (mask) mask.remove();
}

document.addEventListener("DOMContentLoaded", askPasswordIfNeeded);
