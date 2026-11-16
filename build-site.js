#!/usr/bin/env node
/**
 * DigiKart Solutions — static site generator
 * Edit content in content/services.js or the business details below, then run:
 *   node build-site.js
 */
const fs = require("fs");
const path = require("path");
const SERVICES = require("./content/services.js");

const ROOT = __dirname;
const SITE_URL = "https://digikartsolutions.in";
const PHONE = "7528813511";
const PHONE_DISPLAY = "+91 75288 13511";
const WA = "917528813511";
const ADDRESS_LINES = ["Shop No. 01, Street No. 05,", "Saraswati Kunj, Hanuman Mandir Road,", "Greater Noida West, Uttar Pradesh - 201009"];
const ADDRESS_ONE = ADDRESS_LINES.join(" ");
const HOURS = "Working hours to be confirmed — please call before visiting";
const MAPS_QUERY = encodeURIComponent("Saraswati Kunj, Hanuman Mandir Road, Greater Noida West, Uttar Pradesh 201009");
const MAPS_EMBED = `https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

const GROUPS = {
  identity: "Identity & Documents",
  travel: "Travel & Vehicle",
  business: "Business & Finance",
};

const wa = (text = "Hello DigiKart Solutions, I would like to enquire about your services.") =>
  `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const rel = (depth, file) => "../".repeat(depth) + file;
const svcHref = (depth, s) => rel(depth, `services/${s.slug}.html`);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/* ---------- Icons ---------- */
const svg = (d, extra = "") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${d}</svg>`;

const I = {
  arrow: svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>', ' class="i-arrow"'),
  arrowUR: svg('<path d="M7 17 17 7"/><path d="M8 7h9v9"/>'),
  check: svg('<path d="m5 12.5 4.2 4.2L19 7"/>', ' stroke-width="2.6"'),
  chevron: svg('<path d="m6 9 6 6 6-6"/>', ' stroke-width="2.2"'),
  chevronR: svg('<path d="m9 6 6 6-6 6"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>', ' stroke-width="2.2"'),
  up: svg('<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>', ' stroke-width="2.2"'),
  phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
  pin: svg('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
  shield: svg('<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>'),
  info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
  file: svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'),
  fileCheck: svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="m9 14 2 2 4-4"/>'),
  chat: svg('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/>', ' stroke-width="2"'),
  send: svg('<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>'),
  store: svg('<path d="M4 9.5 5.5 4h13L20 9.5"/><path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"/><path d="M5 11.5V20h14v-8.5M10 20v-5h4v5"/>'),
  layers: svg('<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>'),
  user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
  lock: svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
  sparkle: svg('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),
  waFill: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.56 15.17L2 22l4.96-1.41A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.29-1.24l-.31-.19-3.04.87.88-2.91-.2-.32A8 8 0 1 1 12 20z"/></svg>`,
};

const SVC_ICON = {
  aadhaar: svg('<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16a3.4 3.4 0 0 1 6.4 0M14.5 10h3.5M14.5 13.5h3.5"/>'),
  "pan-card": svg('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 9.5h18M7 14h4M7 16.5h2.5"/><path d="M15.5 13.5h2.5v3h-2.5z"/>'),
  "voter-id": svg('<path d="M4 20h16"/><path d="M6 20V10h12v10"/><path d="m9.5 5.5 2.5 3 4-5"/><path d="M10 14h4"/>'),
  "driving-licence": svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.4"/><path d="M12 14.4V21M9.7 11.4 3.5 9.5M14.3 11.4l6.2-1.9"/>'),
  passport: svg('<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><circle cx="12" cy="10" r="3"/><path d="M9 10h6M12 7c-1 1.6-1 4.4 0 6M12 7c1 1.6 1 4.4 0 6M9 17h6"/>'),
  rto: svg('<path d="M5 16.5V12l1.8-4.6A2 2 0 0 1 8.7 6h6.6a2 2 0 0 1 1.9 1.4L19 12v4.5"/><path d="M3.5 16.5h17v2h-17zM5 12h14"/><circle cx="8" cy="14.3" r=".6"/><circle cx="16" cy="14.3" r=".6"/>'),
  "document-services": svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'),
  "printing-scanning": svg('<path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7zM17 12h.01"/>'),
  "ticket-booking": svg('<path d="M3.5 8.5V7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v1.5a3.5 3.5 0 0 0 0 7V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-1.5a3.5 3.5 0 0 0 0-7z"/><path d="M14 5v2.5M14 10.8v2.4M14 16.5V19"/>'),
  insurance: svg('<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="M12 8.5v7M8.5 12h7"/>'),
  "gst-tax": svg('<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M8 7h8M8.5 16.5l7-6"/><circle cx="9" cy="11.5" r="1"/><circle cx="15" cy="15.5" r="1"/>'),
  "business-services": svg('<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18M11 12.5v1.5h2v-1.5"/>'),
  "dsc-trademark": svg('<path d="M4 20c2.5-1 3.5-3.5 5-3.5s1.5 2 3 2 2.5-2.5 4-2.5c1 0 1.7.6 2 1.2"/><path d="m14 4 6 6-7.5 7.5-3.5.5.5-3.5z"/>'),
  fssai: svg('<path d="M7 3v8a3 3 0 0 0 3 3v7M10 3v6M13 3v8a3 3 0 0 1-3 3"/><path d="M17.5 21V3c-1.9 1.3-3 3.6-3 6.5v4h3"/>'),
};
const svcIcon = (s) => SVC_ICON[s.slug] || I.file;

/* ---------- Brand ---------- */
let markId = 0;
function brandMark() {
  const id = `dkg${++markId}`;
  return `<svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2157B0"/><stop offset="1" stop-color="#12336B"/></linearGradient></defs><rect width="48" height="48" rx="13" fill="url(#${id})"/><path fill="#fff" fill-rule="evenodd" d="M13 11.5h11.2c7.4 0 12.3 5 12.3 12.5s-4.9 12.5-12.3 12.5H13zm5.6 5.4v14.2h5.4c4.1 0 6.8-2.8 6.8-7.1s-2.7-7.1-6.8-7.1z"/><rect x="21.3" y="20.8" width="6.4" height="6.4" rx="1.8" fill="#D92732"/><circle cx="38.6" cy="9.4" r="2.6" fill="#D92732"/></svg>`;
}
function brand(depth, light = false) {
  return `<a class="brand${light ? " brand--light" : ""}" href="${rel(depth, "index.html")}" aria-label="DigiKart Solutions — Home">
        ${brandMark()}
        <span class="brand-text"><span class="brand-name">Digi<b>Kart</b></span><span class="brand-tag">Solutions</span></span>
      </a>`;
}

/* ---------- Layout ---------- */
function header(depth, active) {
  const link = (label, file, key) =>
    `<a class="nav-link${active === key ? " active" : ""}" href="${rel(depth, file)}"${active === key ? ' aria-current="page"' : ""}>${label}</a>`;
  const mega = SERVICES.map(
    (s) => `<a class="mega-item" href="${svcHref(depth, s)}"><span class="mega-icon">${svcIcon(s)}</span>${s.name}</a>`
  ).join("");
  return `<div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-group">
        <span class="topbar-note">Digital &amp; Online Service Provider</span>
        <span class="topbar-hide-md">${I.pin}Saraswati Kunj, Greater Noida West</span>
      </div>
      <div class="topbar-group">
        <a href="tel:${PHONE}">${I.phone}${PHONE_DISPLAY}</a>
        <a class="topbar-hide-md" href="${wa()}" target="_blank" rel="noopener">${I.chat}WhatsApp us</a>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="container header-inner">
      ${brand(depth)}
      <nav class="nav" id="primary-nav" aria-label="Primary">
        ${link("Home", "index.html", "home")}
        ${link("About", "about.html", "about")}
        <div class="nav-dropdown">
          <button class="nav-trigger${active === "services" ? " active" : ""}" type="button" aria-expanded="false" aria-haspopup="true">Services ${I.chevron}</button>
          <div class="mega">
            <div class="mega-grid">${mega}</div>
            <div class="mega-foot"><span>Not sure which service you need? We'll guide you.</span><a href="${rel(depth, "services.html")}">View all services ${I.arrow}</a></div>
          </div>
        </div>
        ${link("How It Works", "how-it-works.html", "how")}
        ${link("FAQs", "faqs.html", "faqs")}
        ${link("Contact", "contact.html", "contact")}
        <div class="nav-mobile-cta">
          <a class="btn btn-light" href="tel:${PHONE}">${I.phone}Call ${PHONE_DISPLAY}</a>
          <a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">${I.waFill}WhatsApp Enquiry</a>
        </div>
      </nav>
      <div class="header-actions">
        <a class="header-call" href="tel:${PHONE}">
          <span class="header-call-icon">${I.phone}</span>
          <span><small>Call us</small><strong>${PHONE_DISPLAY}</strong></span>
        </a>
        <a class="btn btn-wa btn-sm" href="${wa()}" target="_blank" rel="noopener" aria-label="WhatsApp Enquiry">${I.waFill}<span>WhatsApp Enquiry</span></a>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span></button>
      </div>
    </div>
    <div class="nav-backdrop"></div>
  </header>`;
}

function footer(depth) {
  return `<footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          ${brand(depth, true)}
          <p class="footer-about">DigiKart Solutions is a Digital &amp; Online Service Provider in Greater Noida West, helping customers with documentation, government-related application assistance, financial and business services.</p>
          <div class="socials">
            <a href="${wa()}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.waFill}</a>
            <a href="tel:${PHONE}" aria-label="Call DigiKart">${I.phone}</a>
            <a href="${MAPS_LINK}" target="_blank" rel="noopener" aria-label="Find us on Google Maps">${I.pin}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <a href="${rel(depth, "index.html")}">Home</a>
          <a href="${rel(depth, "about.html")}">About Us</a>
          <a href="${rel(depth, "services.html")}">Services</a>
          <a href="${rel(depth, "how-it-works.html")}">How It Works</a>
          <a href="${rel(depth, "faqs.html")}">FAQs</a>
          <a href="${rel(depth, "contact.html")}">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Our Services</h4>
          <div class="footer-services">${SERVICES.map((s) => `<a href="${svcHref(depth, s)}">${s.name}</a>`).join("")}</div>
        </div>
        <div class="footer-col">
          <h4>Get in Touch</h4>
          <ul class="footer-contact">
            <li>${I.phone}<span>Phone: <a href="tel:${PHONE}">${PHONE_DISPLAY}</a></span></li>
            <li>${I.chat}<span>WhatsApp: <a href="${wa()}" target="_blank" rel="noopener">${PHONE_DISPLAY}</a></span></li>
            <li>${I.pin}<span>${ADDRESS_LINES.join("<br>")}</span></li>
            <li>${I.clock}<span>${HOURS}</span></li>
          </ul>
        </div>
      </div>
      <p class="footer-disclaimer">DigiKart Solutions is an independent assistance provider and is not affiliated with any government department. Official processing, approvals and issuance remain with the respective authorities.</p>
      <div class="footer-bottom">
        <p>&copy; <span data-year>2026</span> DigiKart Solutions. All rights reserved.</p>
        <div class="footer-legal">
          <a href="${rel(depth, "privacy-policy.html")}">Privacy Policy</a>
          <a href="${rel(depth, "terms.html")}">Terms &amp; Conditions</a>
          <a href="${rel(depth, "disclaimer.html")}">Disclaimer</a>
        </div>
      </div>
    </div>
  </footer>
  <button class="to-top" type="button" aria-label="Back to top">${I.up}</button>
  <a class="float-wa" href="${wa()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${I.waFill}<span>Chat with us</span></a>`;
}

function layout({ title, description, file, depth = 0, active = "", body, jsonLd = [] }) {
  const canonical = file === undefined ? "" : `${SITE_URL}/${file}`;
  const ld = (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
    .join("\n  ");
  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="theme-color" content="#173F82" />
  <meta name="robots" content="${file === undefined ? "noindex" : "index, follow"}" />
  ${canonical ? `<link rel="canonical" href="${canonical}" />` : ""}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="DigiKart Solutions" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  ${canonical ? `<meta property="og:url" content="${canonical}" />` : ""}
  <meta property="og:image" content="${SITE_URL}/assets/hero-assist.jpg" />
  <meta property="og:locale" content="en_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="${rel(depth, "assets/favicon.svg")}" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${rel(depth, "css/styles.css")}" />
  ${ld}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${header(depth, active)}
  <main id="main">
${body}
  </main>
  ${footer(depth)}
  <script src="${rel(depth, "js/main.js")}" defer></script>
</body>
</html>
`;
}

/* ---------- Components ---------- */
function svcCard(depth, s, { featured = false, index = 0 } = {}) {
  const tags = featured
    ? `<ul class="svc-tags">${s.options.slice(0, 3).map((o) => `<li>${o.replace(/ (assistance|guidance|support)$/i, "")}</li>`).join("")}</ul>`
    : "";
  return `<a class="svc-card reveal${featured ? " is-featured" : ""}" href="${svcHref(depth, s)}" data-group="${s.group}" style="--d:${(index % 4) * 0.06}s">
          <div class="svc-top"><span class="svc-icon">${svcIcon(s)}</span><span class="svc-arrow">${I.arrowUR}</span></div>
          <h3>${s.name}</h3>
          <p>${s.short}</p>
          ${tags}
          ${featured ? `<span class="svc-num">0${index + 1}</span>` : ""}
        </a>`;
}

function faqItems(list) {
  return list
    .map(
      ([q, a]) => `<div class="faq-item">
            <button class="faq-q" type="button" aria-expanded="false">${q}<span class="faq-icon">${I.plus}</span></button>
            <div class="faq-a"><div><p>${a}</p></div></div>
          </div>`
    )
    .join("\n          ");
}

function pageHero(depth, title, text, crumbs) {
  const trail = [`<a href="${rel(depth, "index.html")}">Home</a>`]
    .concat(crumbs.map(([label, href]) => (href ? `<a href="${rel(depth, href)}">${label}</a>` : `<span aria-current="page">${label}</span>`)))
    .join(I.chevronR);
  return `<section class="page-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">${trail}</nav>
        <h1>${title}</h1>
        <p>${text}</p>
      </div>
    </section>`;
}

function ctaBlock(depth, title = "Need help with a digital service today?", text = "Send us a WhatsApp message or give us a call. We'll explain what's required and guide you on the next steps.") {
  return `<section class="section-sm">
      <div class="container">
        <div class="cta reveal">
          <div>
            <h2>${title}</h2>
            <p>${text}</p>
            <a class="cta-phone" href="tel:${PHONE}"><span>${I.phone}</span>${PHONE_DISPLAY}</a>
          </div>
          <div class="btn-group">
            <a class="btn btn-wa btn-lg" href="${wa()}" target="_blank" rel="noopener">${I.waFill}WhatsApp Enquiry</a>
            <a class="btn btn-white btn-lg" href="${rel(depth, "contact.html")}">Send an enquiry ${I.arrow}</a>
          </div>
        </div>
      </div>
    </section>`;
}

const GENERAL_FAQS = [
  ["Is DigiKart Solutions a government office?", "No. DigiKart Solutions is a private Digital &amp; Online Service Provider offering assistance. Official processing and approvals remain with the respective government departments and authorised agencies."],
  ["How can I start an enquiry?", `You can call or WhatsApp us on ${PHONE_DISPLAY}, visit our shop at Saraswati Kunj, Greater Noida West, or submit the enquiry form on our Contact page.`],
  ["Do you guarantee approval of applications?", "No. Approvals depend on official rules, document validity and verification by the concerned authority. We help you prepare correctly and apply through the right channels."],
  ["Which areas do you serve?", "We are based in Greater Noida West, Uttar Pradesh, and assist customers from Greater Noida West and the surrounding areas."],
  ["What should I bring when I visit?", "Requirements differ by service. Message us on WhatsApp with the service you need and we'll share a document checklist before you visit."],
];
const MORE_FAQS = [
  ["What information should I share in an enquiry?", "Your name, mobile number, the service you need and a short message about your requirement. Email is optional."],
  ["Can I pay online on this website?", "No. This website is for information and enquiries only — there is no online payment or checkout."],
  ["How is my personal information handled?", "Information you share is used only to respond to your enquiry and assist with your request. Please read our Privacy Policy for details."],
];

const write = (file, content) => {
  const full = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("Wrote", file);
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "DigiKart Solutions",
  slogan: "Digital Services Made Simple.",
  description: "Digital & Online Service Provider in Greater Noida West offering documentation and online application assistance.",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/assets/hero-assist.jpg`,
  logo: `${SITE_URL}/assets/logo.svg`,
  telephone: `+91${PHONE}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No. 01, Street No. 05, Saraswati Kunj, Hanuman Mandir Road",
    addressLocality: "Greater Noida West",
    addressRegion: "Uttar Pradesh",
    postalCode: "201009",
    addressCountry: "IN",
  },
  areaServed: ["Greater Noida West", "Greater Noida", "Noida"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital & Online Services",
    itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, url: `${SITE_URL}/services/${s.slug}.html` } })),
  },
};
const faqLd = (list) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: list.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/&amp;/g, "&") } })),
});

/* =========================================================
   HOME
   ========================================================= */
const finderLinks = SERVICES.map((s) => {
  const kw = [s.name, s.slug, ...s.options, s.short].join(" ").toLowerCase().replace(/"/g, "");
  return `<a href="services/${s.slug}.html" data-keywords="${kw}"><span class="mega-icon">${svcIcon(s)}</span>${s.name}<small>${GROUPS[s.group]}</small></a>`;
}).join("");
const groupCount = (g) => SERVICES.filter((s) => s.group === g).length;

write(
  "index.html",
  layout({
    title: "DigiKart Solutions | Digital Services Made Simple — Greater Noida West",
    description: "DigiKart Solutions is a Digital & Online Service Provider in Greater Noida West. Get assistance with Aadhaar, PAN, Passport, Driving Licence, RTO, GST, FSSAI and more. Call or WhatsApp 7528813511.",
    file: "",
    active: "home",
    jsonLd: [localBusinessLd, faqLd(GENERAL_FAQS)],
    body: `
    <section class="hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="pill"><span class="pill-badge">Local</span>Digital &amp; Online Service Provider · Greater Noida West</span>
            <h1>Digital Services <span class="hl">Made Simple.<svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path d="M4 15C70 6 180 2 296 9" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round"/></svg></span></h1>
            <p class="lead">From Aadhaar and PAN to passports, RTO work, GST and business registrations — we guide you through every step with clear checklists and honest advice.</p>
            <div class="btn-group">
              <a class="btn btn-primary btn-lg" href="services.html">Explore Our Services ${I.arrow}</a>
              <a class="btn btn-wa btn-lg" href="${wa()}" target="_blank" rel="noopener">${I.waFill}WhatsApp Enquiry</a>
            </div>
            <ul class="trust-list">
              <li><span class="check">${I.check}</span>Clear document guidance</li>
              <li><span class="check">${I.check}</span>Official channels only</li>
              <li><span class="check">${I.check}</span>Easy to reach locally</li>
            </ul>
          </div>
          <div class="hero-media">
            <span class="hero-deco hero-deco--block" aria-hidden="true"></span>
            <span class="hero-deco hero-deco--dots" aria-hidden="true"></span>
            <div class="hero-photo">
              <img src="assets/hero-assist.jpg" alt="DigiKart team member helping a customer with application documents at the service desk" width="1024" height="768" fetchpriority="high" />
            </div>
            <div class="float-card fc-1">
              <span class="fc-icon">${I.layers}</span>
              <div><strong>${SERVICES.length} service categories</strong><span>Identity · Travel · Business</span></div>
            </div>
            <div class="float-card fc-2">
              <span class="fc-icon">${I.waFill}</span>
              <div><strong><i class="live-dot"></i>WhatsApp support</strong><span>${PHONE_DISPLAY}</span></div>
            </div>
            <div class="float-card fc-3">
              <span class="fc-icon">${I.shield}</span>
              <div><strong>Honest assistance</strong></div>
            </div>
          </div>
        </div>

        <div class="finder">
          <div class="finder-label">
            <span class="fc-icon">${I.search}</span>
            <div><strong>What do you need help with?</strong><span>Find the right service in seconds</span></div>
          </div>
          <div class="finder-field">
            <label class="finder-input-wrap">
              <span class="sr-only">Search services</span>
              ${I.search}
              <input id="finder-input" type="search" placeholder="Try “PAN correction”, “passport” or “GST”" autocomplete="off" />
              <a class="btn btn-primary btn-sm" href="services.html">Browse all</a>
            </label>
            <div class="finder-results" id="finder-results">${finderLinks}<div class="finder-empty" style="display:none">No matching service — <a href="contact.html" style="display:inline;padding:0;color:var(--blue)">ask us directly</a>.</div></div>
            <div class="finder-chips">
              <small>Popular:</small>
              ${["aadhaar", "pan-card", "passport", "driving-licence", "gst-tax"].map((slug) => { const s = SERVICES.find((x) => x.slug === slug); return `<a class="chip" href="services/${slug}.html">${s.name.replace(" Services", "")}</a>`; }).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head-row">
          <div class="section-head reveal">
            <span class="eyebrow">Popular Services</span>
            <h2 class="h2">The services our customers <em>ask for most</em></h2>
          </div>
          <a class="btn btn-outline reveal" href="services.html">View all services ${I.arrow}</a>
        </div>
        <div class="grid-4">
          ${["aadhaar", "pan-card", "passport", "rto"].map((slug, i) => svcCard(0, SERVICES.find((s) => s.slug === slug), { featured: true, index: i })).join("\n        ")}
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head center reveal">
          <span class="eyebrow">All Services</span>
          <h2 class="h2">Everything you need, <em>under one roof</em></h2>
          <p class="lead">Browse by category to find the assistance you need — from identity documents to business compliance.</p>
        </div>
        <div style="text-align:center;margin-bottom:2.25rem" class="reveal">
          <div class="tabs" data-tabs="#svc-grid" role="tablist">
            <button class="tab active" type="button" role="tab" aria-selected="true" data-filter="all">All<span class="count">${SERVICES.length}</span></button>
            ${Object.entries(GROUPS).map(([k, v]) => `<button class="tab" type="button" role="tab" aria-selected="false" data-filter="${k}">${v}<span class="count">${groupCount(k)}</span></button>`).join("")}
          </div>
        </div>
        <div class="grid-4" id="svc-grid">
          ${SERVICES.map((s, i) => svcCard(0, s, { index: i })).join("\n        ")}
          <div class="svc-help reveal">
            <div>
              <h3>Not sure which service you need?</h3>
              <p>Tell us your situation and we'll point you in the right direction.</p>
            </div>
            <a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">${I.waFill}Ask on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container about-grid">
        <div class="about-media reveal">
          <img src="assets/about-docs.jpg" alt="Customer filling in an application form with a laptop and phone on the desk" width="1024" height="768" loading="lazy" />
          <div class="about-badge"><strong>${SERVICES.length}+</strong><span>service categories handled from one local desk</span></div>
        </div>
        <div class="about-copy reveal">
          <span class="eyebrow">About DigiKart</span>
          <h2 class="h2" style="margin-bottom:1rem">Your neighbourhood partner for <em>digital paperwork</em></h2>
          <p class="lead">DigiKart Solutions helps individuals, families and small businesses in Greater Noida West complete essential online services — without the confusion.</p>
          <ul class="checklist">
            <li><span class="check">${I.check}</span><div><strong>Step-by-step guidance</strong><span>We explain exactly what's needed before you begin.</span></div></li>
            <li><span class="check">${I.check}</span><div><strong>Careful document preparation</strong><span>Forms and papers checked so your application is complete.</span></div></li>
            <li><span class="check">${I.check}</span><div><strong>Transparent about our role</strong><span>We assist — official decisions stay with the authorities.</span></div></li>
          </ul>
          <a class="btn btn-primary" href="about.html">More about us ${I.arrow}</a>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head center reveal">
          <span class="eyebrow">How It Works</span>
          <h2 class="h2">Getting help is <em>simple</em></h2>
          <p class="lead">Four clear steps from your first message to a properly submitted application.</p>
        </div>
        <div class="process">
          <div class="step reveal"><div class="step-icon">${I.chat}</div><h3>Share your requirement</h3><p>Call, WhatsApp, visit us or fill the enquiry form.</p></div>
          <div class="step reveal" style="--d:.08s"><div class="step-icon">${I.fileCheck}</div><h3>Get a document checklist</h3><p>We tell you exactly which papers are required.</p></div>
          <div class="step reveal" style="--d:.16s"><div class="step-icon">${I.send}</div><h3>Assisted application</h3><p>We help prepare and submit through official channels.</p></div>
          <div class="step reveal" style="--d:.24s"><div class="step-icon">${I.shield}</div><h3>Follow-up guidance</h3><p>Know what to expect next, with tracking support.</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center reveal">
          <span class="eyebrow">Why DigiKart</span>
          <h2 class="h2">Why customers <em>choose us</em></h2>
        </div>
        <div class="bento">
          <div class="bento-card bento-lg reveal">
            <div>
              <span class="eyebrow">Our promise</span>
              <h3>Assistance you can trust — clear, careful and honest about what we do.</h3>
              <p>We never claim government affiliation or guaranteed approvals. Instead, we make sure you understand the process and apply correctly the first time.</p>
            </div>
            <div class="btn-group" style="margin-top:2rem">
              <a class="btn btn-white" href="how-it-works.html">See how we work ${I.arrow}</a>
            </div>
          </div>
          <div class="bento-card reveal"><span class="svc-icon">${I.fileCheck}</span><h3>Clear checklists</h3><p>Know exactly what to bring before you start.</p></div>
          <div class="bento-card reveal" style="--d:.06s"><span class="svc-icon">${I.chat}</span><h3>Quick WhatsApp help</h3><p>Ask questions and share details from your phone.</p></div>
          <div class="bento-card reveal"><span class="svc-icon">${I.store}</span><h3>Local &amp; accessible</h3><p>Visit our Saraswati Kunj shop in Greater Noida West.</p></div>
          <div class="bento-card bento-red reveal" style="--d:.06s"><span class="svc-icon">${I.lock}</span><h3>Respect for your data</h3><p>Your information is used only for your request.</p></div>
          <div class="bento-card bento-wide reveal"><span class="bento-stat">${SERVICES.length}+</span><div><h3>Service categories in one place</h3><p>Identity documents, travel, vehicle, tax and business services — no running between offices.</p></div></div>
          <div class="bento-card bento-wide reveal" style="--d:.06s"><span class="svc-icon">${I.user}</span><div><h3>Personal, patient guidance</h3><p>Whether it's your first application or a correction, we take time to explain each step.</p></div></div>
        </div>
      </div>
    </section>

    <section class="section-sm">
      <div class="container">
        <div class="stats-band reveal">
          <div class="stat"><strong>${SERVICES.length}<sup>+</sup></strong><span>Service categories</span></div>
          <div class="stat"><strong>GN West</strong><span>Saraswati Kunj, Hanuman Mandir Road</span></div>
          <div class="stat"><strong>75288 13511</strong><span>Phone &amp; WhatsApp enquiries</span></div>
          <div class="stat"><strong>3</strong><span>Ways to enquire — call, WhatsApp or visit</span></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container faq-layout">
        <div class="faq-aside reveal">
          <span class="eyebrow">FAQs</span>
          <h2 class="h2" style="margin-bottom:1rem">Questions? <em>We have answers.</em></h2>
          <p class="lead">Quick answers to what customers usually ask before getting started.</p>
          <div class="help-card">
            <div class="help-card-head"><span class="help-avatar">${I.waFill}</span><div><strong>Still have a question?</strong><span>Chat with our team on WhatsApp</span></div></div>
            <a class="btn btn-wa btn-block" href="${wa()}" target="_blank" rel="noopener">Start a chat ${I.arrow}</a>
          </div>
        </div>
        <div class="faq-list reveal">
          ${faqItems(GENERAL_FAQS)}
        </div>
      </div>
    </section>

    ${ctaBlock(0)}
    <div style="height:3rem"></div>
`,
  })
);

/* =========================================================
   ABOUT
   ========================================================= */
write(
  "about.html",
  layout({
    title: "About Us | DigiKart Solutions, Greater Noida West",
    description: "DigiKart Solutions is a Digital & Online Service Provider in Greater Noida West helping customers with documentation, government-related application assistance and business services.",
    file: "about.html",
    active: "about",
    jsonLd: localBusinessLd,
    body: `
    ${pageHero(0, "Making digital services simple for our community", "DigiKart Solutions is a Digital &amp; Online Service Provider based in Greater Noida West, Uttar Pradesh.", [["About Us"]])}
    <section class="section">
      <div class="container about-grid">
        <div class="about-media reveal">
          <img src="assets/hero-assist.jpg" alt="DigiKart team member assisting a customer at the service desk" width="1024" height="768" loading="lazy" />
          <div class="about-badge"><strong>GN West</strong><span>Serving Greater Noida West and nearby areas</span></div>
        </div>
        <div class="reveal">
          <span class="eyebrow">Who we are</span>
          <h2 class="h2" style="margin-bottom:1rem">A trusted local desk for <em>online services</em></h2>
          <p class="lead" style="margin-bottom:1rem">We support individuals and local businesses with digital documentation, government-related application assistance, financial and business service guidance, and everyday online service needs.</p>
          <p class="text-muted">Our goal is simple: make essential digital services easier to understand and complete — with trustworthy guidance and convenient enquiry options via WhatsApp, phone or our website.</p>
          <div class="notice">${I.info}<span>For regulated services such as Aadhaar, PAN, Passport and Driving Licence, DigiKart acts as an assistance provider. We are not a government office and do not claim official affiliation or guaranteed approvals.</span></div>
        </div>
      </div>
    </section>
    <section class="section section-alt">
      <div class="container">
        <div class="section-head center reveal">
          <span class="eyebrow">What we stand for</span>
          <h2 class="h2">Trust. Accessibility. <em>Convenience.</em></h2>
        </div>
        <div class="values">
          <div class="value-card reveal"><span class="svc-icon">${I.shield}</span><h3>Trust</h3><p>Clear communication about what we assist with — and what the official authorities decide.</p></div>
          <div class="value-card reveal" style="--d:.08s"><span class="svc-icon">${I.store}</span><h3>Accessibility</h3><p>A local shop plus easy phone and WhatsApp access for quick questions.</p></div>
          <div class="value-card reveal" style="--d:.16s"><span class="svc-icon">${I.sparkle}</span><h3>Convenience</h3><p>Organised document guidance so applications feel simple, not stressful.</p></div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container about-grid">
        <div class="reveal">
          <span class="eyebrow">Business details</span>
          <h2 class="h2" style="margin-bottom:1rem">Visit or <em>reach us</em></h2>
          <p class="lead">Drop by our shop or get in touch — we're happy to help you figure out the right service.</p>
        </div>
        <div class="info-list reveal">
          <div class="info-row"><span class="svc-icon">${I.store}</span><div><small>Business</small><strong>DigiKart Solutions — Digital &amp; Online Service Provider</strong></div></div>
          <div class="info-row"><span class="svc-icon">${I.pin}</span><div><small>Address</small><strong>${ADDRESS_ONE}</strong></div></div>
          <div class="info-row"><span class="svc-icon">${I.phone}</span><div><small>Phone / WhatsApp</small><strong><a href="tel:${PHONE}">${PHONE_DISPLAY}</a></strong></div></div>
        </div>
      </div>
    </section>
    ${ctaBlock(0)}
    <div style="height:3rem"></div>
`,
  })
);

/* =========================================================
   SERVICES
   ========================================================= */
write(
  "services.html",
  layout({
    title: "Our Services | Aadhaar, PAN, Passport, RTO, GST & More — DigiKart Solutions",
    description: "Explore all DigiKart Solutions services in Greater Noida West — Aadhaar, PAN, Voter ID, Driving Licence, Passport, RTO, documents, printing, tickets, insurance, GST, business, DSC, trademark and FSSAI.",
    file: "services.html",
    active: "services",
    body: `
    ${pageHero(0, "Our services", "Every category we assist with — each page explains available options, typical documents, the process and how to enquire.", [["Services"]])}
    ${Object.entries(GROUPS).map(([k, v], gi) => `
    <section class="section${gi % 2 ? " section-alt" : ""}">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">${String(gi + 1).padStart(2, "0")} · Category</span>
          <h2 class="h2">${v}</h2>
        </div>
        <div class="grid-3">
          ${SERVICES.filter((s) => s.group === k).map((s, i) => svcCard(0, s, { index: i })).join("\n          ")}
        </div>
      </div>
    </section>`).join("")}
    ${ctaBlock(0, "Can't find what you're looking for?", "Tell us what you need on WhatsApp — we'll let you know if and how we can help.")}
    <div style="height:3rem"></div>
`,
  })
);

/* =========================================================
   HOW IT WORKS
   ========================================================= */
const detailedSteps = [
  [I.chat, "Enquire", "Contact us on WhatsApp, by phone, visit the shop, or use the website enquiry form with your requirement."],
  [I.search, "Requirement check", "We confirm the service type and explain whether it involves official portals, appointments or documentation only."],
  [I.fileCheck, "Document readiness", "You receive a checklist of papers typically required for that service, so nothing is missed."],
  [I.send, "Assisted application", "We help with form filling and submission through the appropriate official channels."],
  [I.clock, "Follow-up guidance", "Where applicable, we guide you on acknowledgements, tracking and what to expect next."],
  [I.shield, "Transparent outcome", "Official decisions remain with the concerned authority — we keep the process clear throughout."],
];
write(
  "how-it-works.html",
  layout({
    title: "How It Works | DigiKart Solutions",
    description: "See how DigiKart Solutions assists with digital service enquiries — from your first message to document checklists and assisted applications through official channels.",
    file: "how-it-works.html",
    active: "how",
    body: `
    ${pageHero(0, "How it works", "A straightforward assistance journey designed around clarity and convenience.", [["How It Works"]])}
    <section class="section">
      <div class="container">
        <div class="process" style="margin-bottom:4.5rem">
          ${detailedSteps.slice(0, 4).map(([ic, t, d], i) => `<div class="step reveal" style="--d:${i * 0.08}s"><div class="step-icon">${ic}</div><h3>${t}</h3><p>${d.split(".")[0]}.</p></div>`).join("")}
        </div>
        <div class="about-grid" style="align-items:start">
          <div class="reveal faq-aside">
            <span class="eyebrow">In detail</span>
            <h2 class="h2" style="margin-bottom:1rem">What happens at <em>each step</em></h2>
            <p class="lead" style="margin-bottom:1.5rem">We keep every stage transparent, so you always know where your request stands.</p>
            <a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">${I.waFill}Start on WhatsApp</a>
          </div>
          <div class="process-list">
            ${detailedSteps.map(([ic, t, d], i) => `<div class="process-row reveal"><div class="step-icon">${ic}</div><div><h3>${String(i + 1).padStart(2, "0")}. ${t}</h3><p>${d}</p></div></div>`).join("\n            ")}
          </div>
        </div>
      </div>
    </section>
    ${ctaBlock(0, "Ready to begin?", "Message us on WhatsApp with the service you need and we'll take it from there.")}
    <div style="height:3rem"></div>
`,
  })
);

/* =========================================================
   FAQS
   ========================================================= */
const allFaqs = [...GENERAL_FAQS, ...MORE_FAQS];
write(
  "faqs.html",
  layout({
    title: "FAQs | DigiKart Solutions",
    description: "Frequently asked questions about DigiKart Solutions — our assistance services, enquiries, approvals and visiting our Greater Noida West shop.",
    file: "faqs.html",
    active: "faqs",
    jsonLd: faqLd(allFaqs),
    body: `
    ${pageHero(0, "Frequently asked questions", "Answers to common questions about our assistance model and how to reach us.", [["FAQs"]])}
    <section class="section">
      <div class="container faq-layout">
        <div class="faq-aside reveal">
          <span class="eyebrow">Need more help?</span>
          <h2 class="h2" style="margin-bottom:1rem">Talk to <em>a real person</em></h2>
          <p class="lead">If your question isn't answered here, reach us directly — we're happy to help.</p>
          <div class="help-card">
            <div class="help-card-head"><span class="help-avatar">${I.waFill}</span><div><strong>WhatsApp us</strong><span>${PHONE_DISPLAY}</span></div></div>
            <a class="btn btn-wa btn-block" href="${wa()}" target="_blank" rel="noopener">Start a chat ${I.arrow}</a>
            <a class="btn btn-light btn-block" style="margin-top:.6rem" href="tel:${PHONE}">${I.phone}Call us</a>
          </div>
        </div>
        <div class="faq-list reveal">
          ${faqItems(allFaqs)}
        </div>
      </div>
    </section>
    ${ctaBlock(0)}
    <div style="height:3rem"></div>
`,
  })
);

/* =========================================================
   CONTACT
   ========================================================= */
write(
  "contact.html",
  layout({
    title: "Contact Us | DigiKart Solutions, Greater Noida West",
    description: `Contact DigiKart Solutions in Greater Noida West. Call or WhatsApp ${PHONE}, visit our shop at Saraswati Kunj, or send an enquiry form.`,
    file: "contact.html",
    active: "contact",
    jsonLd: localBusinessLd,
    body: `
    ${pageHero(0, "Let's get your work done", "Call, WhatsApp, visit our shop, or send an enquiry — choose whatever is easiest for you.", [["Contact"]])}
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="contact-cards">
          <a class="contact-card reveal" href="tel:${PHONE}"><span class="svc-icon">${I.phone}</span><h3>Call us</h3><p>${PHONE_DISPLAY}</p></a>
          <a class="contact-card wa reveal" style="--d:.06s" href="${wa()}" target="_blank" rel="noopener"><span class="svc-icon">${I.waFill}</span><h3>WhatsApp</h3><p>Click to chat</p></a>
          <a class="contact-card red reveal" style="--d:.12s" href="${MAPS_LINK}" target="_blank" rel="noopener"><span class="svc-icon">${I.pin}</span><h3>Visit</h3><p>Saraswati Kunj, Greater Noida West</p></a>
          <div class="contact-card reveal" style="--d:.18s"><span class="svc-icon">${I.clock}</span><h3>Working hours</h3><p>To be confirmed</p></div>
        </div>
      </div>
    </section>
    <section class="section" style="padding-top:1rem">
      <div class="container contact-layout">
        <div class="form-card reveal">
          <span class="eyebrow">Enquiry form</span>
          <h2>Send us an enquiry</h2>
          <p>Fill in your details and we'll open WhatsApp with your message ready to send, so our team can reply quickly.</p>
          <div id="form-success" class="form-success" role="status">${I.check}<span>Thank you! Your enquiry is ready — please press send in WhatsApp and our team will get back to you shortly.</span></div>
          <form id="enquiry-form" novalidate>
            <div class="form-grid">
              <div class="form-row">
                <div class="form-field">
                  <label for="name">Full name <span class="req">*</span></label>
                  <input id="name" name="name" type="text" autocomplete="name" placeholder="Your full name" required />
                  <span class="error">Please enter your full name.</span>
                </div>
                <div class="form-field">
                  <label for="mobile">Mobile number <span class="req">*</span></label>
                  <input id="mobile" name="mobile" type="tel" inputmode="numeric" autocomplete="tel" placeholder="10-digit mobile number" required />
                  <span class="error">Enter a valid 10-digit Indian mobile number.</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-field">
                  <label for="email">Email <span style="color:var(--subtle);font-weight:500">(optional)</span></label>
                  <input id="email" name="email" type="email" autocomplete="email" placeholder="you@example.com" />
                  <span class="error">Enter a valid email or leave it blank.</span>
                </div>
                <div class="form-field">
                  <label for="service">Interested service <span class="req">*</span></label>
                  <select id="service" name="service" required>
                    <option value="">Select a service</option>
                    ${SERVICES.map((s) => `<option value="${s.name}">${s.name}</option>`).join("")}
                    <option value="Other">Other / Not sure</option>
                  </select>
                  <span class="error">Please select a service.</span>
                </div>
              </div>
              <div class="form-field">
                <label for="message">Message <span class="req">*</span></label>
                <textarea id="message" name="message" placeholder="Briefly describe what you need help with" required></textarea>
                <span class="error">Please enter a short message.</span>
              </div>
              <div class="hp-field" aria-hidden="true"><label for="website">Website</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off" /></div>
              <button class="btn btn-primary btn-lg btn-block" type="submit">Submit enquiry ${I.arrow}</button>
              <p class="form-note">${I.lock}Your details are used only to respond to your enquiry.</p>
            </div>
          </form>
        </div>
        <div class="map-card reveal">
          <iframe title="DigiKart Solutions location on Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${MAPS_EMBED}"></iframe>
          <div class="map-card-foot">
            <strong>DigiKart Solutions</strong>
            <p>${ADDRESS_LINES.join("<br>")}</p>
            <a class="btn btn-outline btn-sm" href="${MAPS_LINK}" target="_blank" rel="noopener">${I.pin}Get directions</a>
          </div>
        </div>
      </div>
    </section>
`,
  })
);

/* =========================================================
   LEGAL
   ========================================================= */
const LEGAL = [
  ["privacy-policy.html", "Privacy Policy"],
  ["terms.html", "Terms &amp; Conditions"],
  ["disclaimer.html", "Disclaimer"],
];
function legalPage(file, title, description, intro, content) {
  write(
    file,
    layout({
      title: `${title.replace("&amp;", "&")} | DigiKart Solutions`,
      description,
      file,
      body: `
    ${pageHero(0, title, intro, [[title]])}
    <section class="section">
      <div class="container legal-wrap">
        <nav class="legal-nav" aria-label="Legal pages">${LEGAL.map(([f, t]) => `<a href="${f}"${f === file ? ' class="active" aria-current="page"' : ""}>${t}</a>`).join("")}</nav>
        <article class="legal-content">
          <span class="updated">Last updated: November 2026</span>
          ${content}
        </article>
      </div>
    </section>
`,
    })
  );
}

legalPage("privacy-policy.html", "Privacy Policy", "Privacy Policy for the DigiKart Solutions website and enquiry communications.", "How DigiKart Solutions handles information shared through this website and our enquiry channels.", `
          <p>DigiKart Solutions (“we”, “us”) respects your privacy. This policy explains what information we may receive when you use our website or contact us, and how we use it.</p>
          <h2>Information you provide</h2>
          <p>When you submit an enquiry, you may share your name, mobile number, email (optional), service interest and message. Phone or WhatsApp conversations may also include details needed to assist your request.</p>
          <h2>How we use information</h2>
          <ul>
            <li>To respond to enquiries and provide requested assistance</li>
            <li>To communicate about service requirements and visits</li>
            <li>To improve the clarity of our website and services</li>
          </ul>
          <h2>Sharing</h2>
          <p>We do not sell your personal information. Details may be shared only as needed to process your request through official portals, with service partners you authorise, or if required by law.</p>
          <h2>Official applications</h2>
          <p>When assisting with government or regulated applications, information is submitted through official channels as instructed by you. Those systems are governed by the respective authorities' own policies.</p>
          <h2>Data retention &amp; security</h2>
          <p>We keep information only as long as needed to assist you and take reasonable care to protect documents and details you share with us.</p>
          <h2>Contact</h2>
          <p>For privacy questions, contact us at <a href="tel:${PHONE}">${PHONE_DISPLAY}</a> or visit ${ADDRESS_ONE}.</p>`);

legalPage("terms.html", "Terms &amp; Conditions", "Terms and conditions for using the DigiKart Solutions website and assistance services.", "Please read these terms before using our website or requesting assistance.", `
          <h2>Nature of services</h2>
          <p>DigiKart Solutions provides digital and online service assistance. We are not a government authority and do not issue official documents.</p>
          <h2>No guarantee of approval</h2>
          <p>Application outcomes depend on the relevant authority's rules, verification and processing. Any assistance charges are for our support and do not guarantee approval or timelines.</p>
          <h2>Accurate information</h2>
          <p>You agree to provide accurate information and genuine documents. DigiKart does not support fraudulent or forged documentation and may decline any such request.</p>
          <h2>Website use</h2>
          <p>Content on this website is for general information. Service availability and requirements may change; please confirm details when you enquire.</p>
          <h2>No online payments</h2>
          <p>This website does not process payments. Any charges are discussed and settled directly with DigiKart Solutions.</p>
          <h2>Contact</h2>
          <p><a href="tel:${PHONE}">${PHONE_DISPLAY}</a> · ${ADDRESS_ONE}</p>`);

legalPage("disclaimer.html", "Disclaimer", "Important disclaimer about DigiKart Solutions assistance services and government-related applications.", "Important information about our role as an independent assistance provider.", `
          <p>DigiKart Solutions is a private Digital &amp; Online Service Provider. We assist customers with documentation and applications related to services such as Aadhaar, PAN, Voter ID, Driving Licence, Passport, RTO matters, GST and the other categories listed on this website.</p>
          <h2>No government affiliation</h2>
          <p>DigiKart is not affiliated with, authorised by, or an agent of UIDAI, the Income Tax Department, Passport Seva, any RTO, the Election Commission of India, FSSAI or any other government body, unless expressly stated and independently verified.</p>
          <h2>Official channels</h2>
          <p>Official enrolment, updates, licensing and approvals take place only through the respective authorised systems and offices. DigiKart provides guidance and assistance around those processes.</p>
          <h2>Information accuracy</h2>
          <p>We aim to keep website information helpful and current, but official processes and requirements can change. Always confirm critical details during your enquiry.</p>`);

/* =========================================================
   404
   ========================================================= */
write(
  "404.html",
  layout({
    title: "Page Not Found | DigiKart Solutions",
    description: "The page you requested could not be found on the DigiKart Solutions website.",
    body: `
    <section class="error-page">
      <div>
        <div class="error-code">404</div>
        <h1>This page took a wrong turn</h1>
        <p>The page you're looking for doesn't exist or has moved. Let's get you back on track.</p>
        <div class="btn-group">
          <a class="btn btn-primary" href="/index.html">Go to homepage ${I.arrow}</a>
          <a class="btn btn-light" href="/services.html">Browse services</a>
          <a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">${I.waFill}WhatsApp us</a>
        </div>
      </div>
    </section>
`,
  })
);

/* =========================================================
   SERVICE DETAIL PAGES
   ========================================================= */
SERVICES.forEach((s, idx) => {
  const sameGroup = SERVICES.filter((x) => x.group === s.group && x.slug !== s.slug);
  const related = [...sameGroup, ...SERVICES.filter((x) => x.group !== s.group)].slice(0, 3);
  const enquiry = wa(`Hello DigiKart Solutions, I need help with ${s.name}.`);
  const lower = s.name.replace(/ Services$/, "");

  write(
    `services/${s.slug}.html`,
    layout({
      depth: 1,
      file: `services/${s.slug}.html`,
      active: "services",
      title: `${s.name} in Greater Noida West | DigiKart Solutions`,
      description: `${s.short} Assistance from DigiKart Solutions, Greater Noida West. Call or WhatsApp ${PHONE}.`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.intro,
          serviceType: s.name,
          areaServed: "Greater Noida West",
          provider: { "@id": `${SITE_URL}/#business`, "@type": "LocalBusiness", name: "DigiKart Solutions", telephone: `+91${PHONE}` },
        },
        faqLd(s.faqs),
      ],
      body: `
    <section class="page-hero">
      <div class="container svc-hero-grid">
        <div>
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a>${I.chevronR}<a href="../services.html">Services</a>${I.chevronR}<span aria-current="page">${s.name}</span></nav>
          <div class="svc-hero-icon">${svcIcon(s)}</div>
          <h1>${s.name}</h1>
          <p>${s.short} Guided support from our Greater Noida West desk.</p>
          <div class="btn-group">
            <a class="btn btn-wa btn-lg" href="${enquiry}" target="_blank" rel="noopener">${I.waFill}WhatsApp Enquiry</a>
            <a class="btn btn-ghost-light btn-lg" href="tel:${PHONE}">${I.phone}Call ${PHONE_DISPLAY}</a>
          </div>
        </div>
        <div class="glance">
          <h2>Available options</h2>
          <ul>${s.options.map((o) => `<li><span class="check">${I.check}</span>${o}</li>`).join("")}</ul>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container detail-layout">
        <div class="detail-main">
          <div class="panel reveal">
            <div class="panel-head"><span class="num">01</span><h2>Overview</h2></div>
            <p>${s.intro}</p>
            <p style="margin-top:1rem">Visit our Greater Noida West desk or message us on WhatsApp — our team explains what's required in simple terms, helps you organise the right documents, and supports you through each step.</p>
            <div class="notice">${I.info}<span>DigiKart Solutions provides assistance and process guidance only. Official processing and approvals remain with the respective authorities. We do not claim government affiliation or guaranteed outcomes.</span></div>
          </div>
          <div class="panel reveal">
            <div class="panel-head"><span class="num">02</span><h2>Service options</h2></div>
            <div class="option-grid">${s.options.map((o) => `<div class="option"><span class="check">${I.check}</span>${o}</div>`).join("")}</div>
          </div>
          <div class="panel reveal">
            <div class="panel-head"><span class="num">03</span><h2>Documents typically required</h2></div>
            <ul class="doc-list">${s.docs.map((d) => `<li>${I.fileCheck}<span>${d}</span></li>`).join("")}</ul>
            <p style="margin-top:1rem;font-size:.88rem;color:var(--subtle)">Requirements can vary by case — we'll confirm the exact list when you enquire.</p>
          </div>
          <div class="panel reveal">
            <div class="panel-head"><span class="num">04</span><h2>How the process works</h2></div>
            <div class="timeline">${s.process.map((p, i) => `<div class="tl-item"><span class="tl-dot">${i + 1}</span><p>${p}</p></div>`).join("")}</div>
          </div>
          <div class="panel reveal">
            <div class="panel-head"><span class="num">05</span><h2>Frequently asked questions</h2></div>
            <div class="faq-list">${faqItems(s.faqs)}</div>
          </div>
        </div>
        <aside class="sidebar">
          <div class="side-cta">
            <h3>Need help with ${lower}?</h3>
            <p>Message us with your requirement and we'll share the document checklist.</p>
            <a class="btn btn-wa" href="${enquiry}" target="_blank" rel="noopener">${I.waFill}WhatsApp Enquiry</a>
            <a class="btn btn-white" href="../contact.html?service=${encodeURIComponent(s.name)}">Enquiry form ${I.arrow}</a>
          </div>
          <div class="side-card">
            <h4>Contact</h4>
            <ul class="side-info">
              <li>${I.phone}<a href="tel:${PHONE}">${PHONE_DISPLAY}</a></li>
              <li>${I.pin}<span>${ADDRESS_ONE}</span></li>
              <li>${I.clock}<span>${HOURS}</span></li>
            </ul>
          </div>
          <div class="side-card">
            <h4>Related services</h4>
            ${related.map((r) => `<a class="mega-item" href="${r.slug}.html"><span class="mega-icon">${svcIcon(r)}</span>${r.name}</a>`).join("")}
          </div>
        </aside>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head-row">
          <div class="section-head reveal"><span class="eyebrow">Explore more</span><h2 class="h2">Related <em>services</em></h2></div>
          <a class="btn btn-outline reveal" href="../services.html">All services ${I.arrow}</a>
        </div>
        <div class="grid-3">${related.map((r, i) => svcCard(1, r, { index: i })).join("")}</div>
      </div>
    </section>
    ${ctaBlock(1, `Get started with ${lower} today`, "Send us a WhatsApp message or call — we'll explain the requirements and next steps.")}
    <div style="height:3rem"></div>
`,
    })
  );
});

/* =========================================================
   SEO + brand assets
   ========================================================= */
write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /404.html\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

const urls = ["", "about.html", "services.html", "how-it-works.html", "faqs.html", "contact.html", ...SERVICES.map((s) => `services/${s.slug}.html`), "privacy-policy.html", "terms.html", "disclaimer.html"];
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}/${u}</loc><changefreq>monthly</changefreq><priority>${u === "" ? "1.0" : u.startsWith("services") ? "0.8" : u.includes("html") && LEGAL.some(([f]) => f === u) ? "0.3" : "0.7"}</priority></url>`).join("\n")}
</urlset>
`
);

const MARK_PATHS = `<rect width="48" height="48" rx="13" fill="url(#g)"/><path fill="#fff" fill-rule="evenodd" d="M13 11.5h11.2c7.4 0 12.3 5 12.3 12.5s-4.9 12.5-12.3 12.5H13zm5.6 5.4v14.2h5.4c4.1 0 6.8-2.8 6.8-7.1s-2.7-7.1-6.8-7.1z"/><rect x="21.3" y="20.8" width="6.4" height="6.4" rx="1.8" fill="#D92732"/><circle cx="38.6" cy="9.4" r="2.6" fill="#D92732"/>`;
const GRAD = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2157B0"/><stop offset="1" stop-color="#12336B"/></linearGradient></defs>`;
write("assets/favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${GRAD}${MARK_PATHS}</svg>\n`);
write(
  "assets/logo.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 48" role="img" aria-label="DigiKart Solutions">${GRAD}${MARK_PATHS}<text x="60" y="27" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="23" font-weight="800" letter-spacing="-0.8" fill="#173F82">Digi<tspan fill="#D92732">Kart</tspan></text><text x="61" y="42" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="9" font-weight="700" letter-spacing="3.4" fill="#8A93A3">SOLUTIONS</text></svg>\n`
);

console.log(`\nBuilt ${urls.length + 1} pages.`);
