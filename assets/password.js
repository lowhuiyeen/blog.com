// ======= 设置你的密码（修改下行） =======
const BLOG_PASSWORD = "mySecret123";
// ======================================

const SESSION_KEY = "blog_pass_ok";

function alreadyUnlocked() {
  try { return sessionStorage.getItem(SESSION_KEY) === "1"; }
  catch (e) { return false; }
}

function unlock() {
  try { sessionStorage.setItem(SESSION_KEY, "1"); } catch(e){}
  revealContent();
  hideModal();
}

function showModal() {
  const overlay = document.getElementById("pw-overlay");
  if (!overlay) return;
  overlay.classList.remove("hidden");
  const input = document.getElementById("pw-input");
  if (input) setTimeout(() => input.focus(), 50);
}

function hideModal() {
  const overlay = document.getElementById("pw-overlay");
  if (overlay) overlay.classList.add("hidden");
}

function revealContent() {
  const el = document.getElementById("content");
  if (el) el.classList.remove("hidden");
  const mask = document.getElementById("mask");
  if (mask) mask.remove();
}

function handleSubmit() {
  const input = document.getElementById("pw-input");
  const hint = document.getElementById("pw-hint");
  if (!input || !hint) return;

  if (input.value === BLOG_PASSWORD) {
    unlock();
  } else {
    hint.textContent = "密码不正确，请再试一次。";
    input.value = "";
    input.focus();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (alreadyUnlocked()) {
    revealContent();
  } else {
    showModal();
  }
  const btn = document.getElementById("pw-btn");
  const input = document.getElementById("pw-input");
  if (btn) btn.addEventListener("click", handleSubmit);
  if (input) input.addEventListener("keydown", function(e){
    if (e.key === "Enter") handleSubmit();
  });
});