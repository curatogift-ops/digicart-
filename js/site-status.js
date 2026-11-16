/* Site availability notice — set SITE_LOCKED to false to restore normal access. */
(function () {
  "use strict";

  var SITE_LOCKED = true;
  var TITLE = "Website temporarily unavailable";
  var MESSAGE = "This website is currently unavailable. Please check back later.";

  if (!SITE_LOCKED) return;

  var css =
    "html.site-locked,html.site-locked body{overflow:hidden!important;height:100%}" +
    "html.site-locked body>*:not(#site-lock){filter:blur(6px);pointer-events:none;user-select:none}" +
    "#site-lock{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:1.5rem;" +
    "background:rgba(11,31,69,.72);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);" +
    "font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif}" +
    "#site-lock .sl-card{max-width:440px;width:100%;background:#fff;border-radius:22px;padding:2.5rem 2rem;text-align:center;" +
    "box-shadow:0 30px 60px -20px rgba(0,0,0,.45)}" +
    "#site-lock .sl-icon{width:64px;height:64px;margin:0 auto 1.25rem;border-radius:18px;display:grid;place-items:center;" +
    "background:#FDEDEE;color:#D92732}" +
    "#site-lock .sl-icon svg{width:30px;height:30px}" +
    "#site-lock h2{font-size:1.45rem;line-height:1.25;letter-spacing:-.02em;color:#0B1F45;margin:0 0 .6rem;font-weight:800}" +
    "#site-lock p{color:#5B6577;font-size:1rem;line-height:1.6;margin:0}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
  document.documentElement.classList.add("site-locked");

  function mount() {
    if (document.getElementById("site-lock")) return;
    var overlay = document.createElement("div");
    overlay.id = "site-lock";
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "site-lock-title");
    overlay.innerHTML =
      '<div class="sl-card">' +
      '<div class="sl-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></div>' +
      '<h2 id="site-lock-title"></h2><p></p></div>';
    overlay.querySelector("h2").textContent = TITLE;
    overlay.querySelector("p").textContent = MESSAGE;
    document.body.appendChild(overlay);
    document.querySelectorAll("body > *:not(#site-lock)").forEach(function (el) {
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
    });
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
