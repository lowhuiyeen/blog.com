
const BLOG_PASSWORD = "mySecret123";
const SESSION_KEY = "blog_pass_ok";

function alreadyUnlocked(){ try{return sessionStorage.getItem(SESSION_KEY)==="1";}catch(e){return false;}}
function unlock(){try{sessionStorage.setItem(SESSION_KEY,"1");}catch(e){};revealContent();hideModal();}
function showModal(){const o=document.getElementById("pw-overlay");if(!o)return;o.classList.remove("hidden");setTimeout(()=>document.getElementById("pw-input")?.focus(),50);}
function hideModal(){const o=document.getElementById("pw-overlay");if(o)o.classList.add("hidden");}
function revealContent(){document.getElementById("content")?.classList.remove("hidden");document.getElementById("mask")?.remove();}
function handleSubmit(){const i=document.getElementById("pw-input"),h=document.getElementById("pw-hint");if(!i||!h)return;if(i.value===BLOG_PASSWORD){unlock();}else{h.textContent="密码不正确，请再试一次。";i.value="";i.focus();}}
document.addEventListener("DOMContentLoaded",()=>{alreadyUnlocked()?revealContent():showModal();document.getElementById("pw-btn")?.addEventListener("click",handleSubmit);document.getElementById("pw-input")?.addEventListener("keydown",e=>{"Enter"===e.key&&handleSubmit()});});
