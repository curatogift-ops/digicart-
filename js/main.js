/* DigiKart Solutions — site interactions */
(function () {
  "use strict";

  const WHATSAPP_NUMBER = "917528813511";
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const desktop = window.matchMedia("(min-width: 961px)");

  /* Header shadow on scroll + back to top */
  const header = $(".site-header");
  const toTop = $(".to-top");
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (toTop) toTop.classList.toggle("show", y > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* Mobile drawer */
  const toggle = $(".menu-toggle");
  const nav = $(".nav");
  const backdrop = $(".nav-backdrop");
  const setNav = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle("open", open);
    if (backdrop) backdrop.classList.toggle("show", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  if (toggle) toggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));
  if (backdrop) backdrop.addEventListener("click", () => setNav(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setNav(false);
      $$(".nav-dropdown.open").forEach(closeDropdown);
    }
  });
  desktop.addEventListener("change", () => setNav(false));

  /* Services mega menu */
  function closeDropdown(d) {
    d.classList.remove("open");
    const b = $(".nav-trigger", d);
    if (b) b.setAttribute("aria-expanded", "false");
  }
  function openDropdown(d) {
    d.classList.add("open");
    const b = $(".nav-trigger", d);
    if (b) b.setAttribute("aria-expanded", "true");
  }
  $$(".nav-dropdown").forEach((d) => {
    const trigger = $(".nav-trigger", d);
    let timer;
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      d.classList.contains("open") ? closeDropdown(d) : openDropdown(d);
    });
    d.addEventListener("mouseenter", () => {
      if (!desktop.matches) return;
      clearTimeout(timer);
      openDropdown(d);
    });
    d.addEventListener("mouseleave", () => {
      if (!desktop.matches) return;
      timer = setTimeout(() => closeDropdown(d), 160);
    });
  });
  document.addEventListener("click", (e) => {
    $$(".nav-dropdown.open").forEach((d) => {
      if (!d.contains(e.target)) closeDropdown(d);
    });
  });

  /* FAQ accordion */
  $$(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const list = btn.closest(".faq-list");
      const open = item.classList.contains("open");
      if (list) $$(".faq-item.open", list).forEach((i) => {
        i.classList.remove("open");
        $(".faq-q", i).setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* Reveal on scroll */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* Service category tabs */
  $$("[data-tabs]").forEach((tabs) => {
    const target = $(tabs.dataset.tabs);
    if (!target) return;
    $$(".tab", tabs).forEach((tab) => {
      tab.addEventListener("click", () => {
        $$(".tab", tabs).forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        const f = tab.dataset.filter;
        $$(".svc-card", target).forEach((card) => {
          const show = f === "all" || card.dataset.group === f;
          card.classList.toggle("is-hidden", !show);
          if (show) card.classList.add("visible");
        });
      });
    });
  });

  /* Service finder */
  const finder = $("#finder-input");
  const results = $("#finder-results");
  if (finder && results) {
    const items = $$("a", results);
    const empty = $(".finder-empty", results);
    let focusIdx = -1;
    const visible = () => items.filter((a) => a.style.display !== "none");
    const setFocus = (idx) => {
      const v = visible();
      items.forEach((a) => a.classList.remove("focus"));
      if (!v.length) return;
      focusIdx = (idx + v.length) % v.length;
      v[focusIdx].classList.add("focus");
      v[focusIdx].scrollIntoView({ block: "nearest" });
    };
    const filter = () => {
      const q = finder.value.trim().toLowerCase();
      let count = 0;
      items.forEach((a) => {
        const match = !q || a.dataset.keywords.includes(q);
        a.style.display = match ? "" : "none";
        if (match) count++;
      });
      if (empty) empty.style.display = count ? "none" : "block";
      results.classList.add("show");
      focusIdx = -1;
    };
    finder.addEventListener("focus", filter);
    finder.addEventListener("input", filter);
    finder.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setFocus(focusIdx + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setFocus(focusIdx - 1); }
      else if (e.key === "Enter") {
        const v = visible();
        const pick = v[focusIdx] || v[0];
        if (pick) { e.preventDefault(); window.location.href = pick.href; }
      } else if (e.key === "Escape") {
        results.classList.remove("show");
      }
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".finder-field")) results.classList.remove("show");
    });
  }

  /* Enquiry form */
  const form = $("#enquiry-form");
  if (form) {
    const rules = {
      name: (v) => v.trim().length >= 2,
      mobile: (v) => /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "").replace(/^(\+?91)/, "")),
      email: (v) => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      service: (v) => v.trim().length > 0,
      message: (v) => v.trim().length >= 5,
    };
    const startedAt = Date.now();

    const preselect = new URLSearchParams(window.location.search).get("service");
    if (preselect) {
      const sel = $("#service", form);
      const opt = sel && $$("option", sel).find((o) => o.value === preselect);
      if (opt) sel.value = preselect;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstInvalid = null;
      Object.entries(rules).forEach(([id, test]) => {
        const el = $("#" + id, form);
        const ok = test(el.value || "");
        el.closest(".form-field").classList.toggle("invalid", !ok);
        el.setAttribute("aria-invalid", String(!ok));
        if (!ok && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      const honeypot = $("#website", form);
      if ((honeypot && honeypot.value.trim()) || Date.now() - startedAt < 2500) return;

      const val = (id) => $("#" + id, form).value.trim();
      const text = [
        "*New Enquiry — DigiKart Solutions website*",
        "",
        `Name: ${val("name")}`,
        `Mobile: ${val("mobile")}`,
        val("email") ? `Email: ${val("email")}` : null,
        `Service: ${val("service")}`,
        `Message: ${val("message")}`,
      ].filter((l) => l !== null).join("\n");

      const success = $("#form-success");
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      form.reset();
    });

    $$("input, select, textarea", form).forEach((el) => {
      el.addEventListener("input", () => {
        const f = el.closest(".form-field");
        if (f) f.classList.remove("invalid");
      });
    });
  }

  /* Year */
  $$("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
})();
