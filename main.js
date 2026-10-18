/* =========================================================
   AdmitOne – shared script (used by every page)
   Each feature only runs if its elements exist on the page.
   ========================================================= */

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// Footer year
document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));

// Toast message
const toast = document.createElement("div");
toast.className = "toast";
toast.setAttribute("role", "status");
document.body.appendChild(toast);
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

// "Get tickets" buttons (checkout is not built yet)
document.querySelectorAll("[data-buy]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    showToast("Checkout isn’t built yet. Check back soon.");
  });
});

// Events page: filter by category
const filterButtons = document.querySelectorAll(".filter");
if (filterButtons.length) {
  const cards = document.querySelectorAll("#event-grid .ticket");
  const empty = document.querySelector(".empty");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.filter;
      filterButtons.forEach((b) => b.setAttribute("aria-pressed", b === btn));
      let shown = 0;
      cards.forEach((card) => {
        const match = category === "All" || card.dataset.category === category;
        card.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.style.display = shown ? "none" : "block";
    });
  });
}

// Pricing page: monthly / yearly toggle
const billingButtons = document.querySelectorAll(".billing button");
if (billingButtons.length) {
  const amounts = document.querySelectorAll("[data-monthly]");
  billingButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      billingButtons.forEach((b) => b.setAttribute("aria-pressed", b === btn));
      const mode = btn.dataset.billing;
      amounts.forEach((el) => (el.textContent = el.dataset[mode]));
    });
  });
}

// Contact page: front-end only form handling
const form = document.querySelector("#contact-form");
if (form) {
  const status = document.querySelector(".form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements["name"].value.trim();
    status.textContent = `Thanks${name ? ", " + name : ""}. We’ve got your message and will reply within two working days.`;
    status.style.display = "block";
    form.reset();
    status.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}
