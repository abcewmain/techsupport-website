"use strict";

document.documentElement.classList.add("js");

const menuButton = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-link, .nav-cta");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const guideSearch = document.querySelector("#guide-search");
const guideCards = [...document.querySelectorAll(".guide-card")];
const guideCount = document.querySelector("#guide-count");
const guideEmpty = document.querySelector("#guide-empty");
const faqSearch = document.querySelector("#faq-search");
const faqItems = [...document.querySelectorAll("#faq-list .faq-item")];
const faqEmpty = document.querySelector("#faq-empty");
const supportForm = document.querySelector("#support-form");

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Navigation öffnen");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Navigation öffnen" : "Navigation schliessen");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-30% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (guideCards.length > 0) {
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  let activeCategory = "all";

  const filterGuides = () => {
    const query = guideSearch.value.trim().toLocaleLowerCase("de-CH");
    let visibleCount = 0;

    guideCards.forEach((card) => {
      const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
      const searchableText = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase("de-CH");
      const matchesSearch = query === "" || searchableText.includes(query);
      const isVisible = matchesCategory && matchesSearch;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    guideCount.textContent = `${visibleCount} ${visibleCount === 1 ? "Anleitung gefunden" : "Anleitungen gefunden"}`;
    guideEmpty.hidden = visibleCount !== 0;
  };

  guideSearch.addEventListener("input", filterGuides);
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.filter;
      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("is-active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });
      filterGuides();
    });
  });
  filterGuides();

  const guideId = window.location.hash.slice(1);
  const linkedGuide = guideCards.find((card) => card.id === guideId);
  if (linkedGuide) {
    const guideDetails = linkedGuide.querySelector("details");
    if (guideDetails) guideDetails.open = true;
  }
}

if (faqSearch && faqItems.length > 0 && faqEmpty) {
  faqSearch.addEventListener("input", () => {
    const query = faqSearch.value.trim().toLocaleLowerCase("de-CH");
    let visibleCount = 0;

    faqItems.forEach((item) => {
      const searchableText = `${item.dataset.search} ${item.textContent}`.toLocaleLowerCase("de-CH");
      const isVisible = query === "" || searchableText.includes(query);
      item.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    faqEmpty.hidden = visibleCount !== 0;
  });
}

if (supportForm) {
  const formStatus = document.querySelector("#form-status");
  const draftLink = document.querySelector("#draft-link");
  const submitButton = supportForm.querySelector('button[type="submit"]');

  submitButton.disabled = false;

  supportForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!supportForm.reportValidity()) return;

    const fields = new FormData(supportForm);
    const name = String(fields.get("name")).trim();
    const email = String(fields.get("email")).trim();
    const subjectLine = String(fields.get("subject")).trim() || "Supportanfrage";
    const message = [
      `Name: ${name}`,
      `Antwort-E-Mail: ${email}`,
      `Thema: ${String(fields.get("category"))}`,
      "",
      "Beschreibung:",
      String(fields.get("description")).trim()
    ].join("\n");
    const subject = encodeURIComponent(`TechSupport: ${subjectLine}`);
    const body = encodeURIComponent(message);

    draftLink.href = `mailto:abceww@proton.me?subject=${subject}&body=${body}`;
    draftLink.hidden = false;
    formStatus.textContent = "Dein Entwurf ist bereit. Die Website hat nichts versendet oder gespeichert. Öffne dein Mailprogramm und sende die Nachricht dort selbst.";
    draftLink.focus();
  });
}
