const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});


// Certificate gallery modal
const certModal = document.getElementById("certModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalDescription = document.getElementById("modalDescription");
const modalGallery = document.getElementById("modalGallery");
const prevCert = document.getElementById("prevCert");
const nextCert = document.getElementById("nextCert");
const pageIndicator = document.getElementById("pageIndicator");

let currentImages = [];
let currentIndex = 0;

function renderCertificatePage() {
  modalGallery.innerHTML = "";
  const image = document.createElement("img");
  image.src = currentImages[currentIndex];
  image.alt = modalTitle.textContent;
  modalGallery.appendChild(image);

  pageIndicator.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  prevCert.style.visibility = currentImages.length > 1 ? "visible" : "hidden";
  nextCert.style.visibility = currentImages.length > 1 ? "visible" : "hidden";
}

function openCertificate(card) {
  modalTitle.textContent = card.dataset.title;
  modalType.textContent = card.dataset.type;
  modalDescription.textContent = card.dataset.description;
  currentImages = card.dataset.images.split(",").map(item => item.trim());
  currentIndex = 0;
  renderCertificatePage();
  certModal.classList.add("open");
  certModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCertificate() {
  certModal.classList.remove("open");
  certModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".certificate-clickable").forEach(card => {
  card.addEventListener("click", () => openCertificate(card));
});

modalClose.addEventListener("click", closeCertificate);
document.querySelector("[data-close-modal]").addEventListener("click", closeCertificate);

prevCert.addEventListener("click", () => {
  if (!currentImages.length) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  renderCertificatePage();
});

nextCert.addEventListener("click", () => {
  if (!currentImages.length) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  renderCertificatePage();
});

document.addEventListener("keydown", (event) => {
  if (!certModal.classList.contains("open")) return;
  if (event.key === "Escape") closeCertificate();
  if (event.key === "ArrowLeft") prevCert.click();
  if (event.key === "ArrowRight") nextCert.click();
});


// Lightweight scroll-reveal animation for the analytics portfolio.
const revealTargets = document.querySelectorAll(".section-heading, .skill-card, .path-item, .certificate-card, .project-card");
if ("IntersectionObserver" in window && revealTargets.length) {
  revealTargets.forEach((el) => el.classList.add("reveal-on-scroll"));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el) => revealObserver.observe(el));
}


// Modern hero typing effect.
const typingTarget = document.getElementById("typingText");
if (typingTarget) {
  const words = ["technology", "Python", "data", "Excel", "SQL"];
  let wordIndex = 0, charIndex = 0, deleting = false;
  const typeLoop = () => {
    const word = words[wordIndex];
    typingTarget.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);
    let delay = deleting ? 45 : 85;
    if (!deleting && charIndex > word.length) { deleting = true; delay = 1050; }
    if (deleting && charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
      delay = 280;
    }
    setTimeout(typeLoop, delay);
  };
  setTimeout(typeLoop, 900);
}

// Highlight the navigation item for the section currently in view.
const sectionsForNav = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...document.querySelectorAll("#navLinks a")];
if ("IntersectionObserver" in window && sectionsForNav.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
  sectionsForNav.forEach(section => navObserver.observe(section));
}
