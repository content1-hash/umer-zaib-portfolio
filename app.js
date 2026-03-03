// =========
// Work data
// =========
// Tip for Google Drive:
// - Set file to "Anyone with the link" → Viewer
// - Use either the Drive link OR export to PDF and upload PDFs in the repo
const WORK_ITEMS = [
  {
    title: "Landing Page Copy — Lead Gen",
    category: "web",
    label: "Web Copy",
    context: "Conversion-focused landing page with clear CTA and benefits.",
    link: "https://example.com/published-piece",
    linkLabel: "View (Published)"
  },
  {
    title: "SEO Blog — Long-form Guide",
    category: "seo",
    label: "SEO Blog",
    context: "Search-optimized blog with clean structure and user-friendly flow.",
    link: "https://drive.google.com/file/d/XXXXXXXX/view?usp=sharing",
    linkLabel: "View (Drive)"
  },
  {
    title: "Article — Thought Leadership",
    category: "article",
    label: "Article",
    context: "Industry-focused article with strong narrative and clarity.",
    link: "https://drive.google.com/file/d/YYYYYYYY/view?usp=sharing",
    linkLabel: "View (Drive)"
  },
  {
    title: "Website Copy — Services Page",
    category: "web",
    label: "Web Copy",
    context: "Service page copy designed for scannability and trust building.",
    link: "https://example.com/services-page",
    linkLabel: "View (Published)"
  },
  {
    title: "SEO Blog — Product Comparison",
    category: "seo",
    label: "SEO Blog",
    context: "Comparison post with headings, FAQs, and conversion intent.",
    link: "https://drive.google.com/file/d/ZZZZZZZZ/view?usp=sharing",
    linkLabel: "View (Drive)"
  },
  {
    title: "Email — Short Promo Sequence",
    category: "email",
    label: "Email",
    context: "3-email promo flow with hooks, urgency, and clean CTAs.",
    link: "https://drive.google.com/file/d/AAAAAAAA/view?usp=sharing",
    linkLabel: "View (Drive)"
  }
];

// =========
// UI logic
// =========
const grid = document.getElementById("workGrid");
const chips = document.querySelectorAll(".chip");
const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

function renderWork(filter = "all") {
  const items = filter === "all"
    ? WORK_ITEMS
    : WORK_ITEMS.filter(i => i.category === filter);

  grid.innerHTML = items.map(item => `
    <article class="card soft work-card" data-cat="${item.category}">
      <div class="work-top">
        <span class="badge">${escapeHtml(item.label)}</span>
        <span class="badge">${escapeHtml(item.category.toUpperCase())}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.context)}</p>
      <div class="work-actions">
        <a class="btn btn-ghost" href="${item.link}" target="_blank" rel="noopener noreferrer">
          ${escapeHtml(item.linkLabel)}
        </a>
      </div>
    </article>
  `).join("");

  if (!items.length) {
    grid.innerHTML = `<p class="muted">No samples in this category yet.</p>`;
  }
}

function setActiveChip(activeBtn) {
  chips.forEach(b => b.classList.remove("active"));
  activeBtn.classList.add("active");
}

chips.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    setActiveChip(btn);
    renderWork(filter);
  });
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.hidden = expanded;
});

// Close mobile menu when clicking links
mobileMenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  });
});

// Basic HTML escaping to keep rendering safe
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Initial render
renderWork("all");
