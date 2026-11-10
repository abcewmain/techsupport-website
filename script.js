"use strict";

const menuButton = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-link, .nav-cta");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Navigation öffnen" : "Navigation schliessen");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Navigation öffnen");
      navigation.classList.remove("is-open");
    });
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      document.querySelectorAll(".nav-link").forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isCurrent);
      });
    });
  }, { rootMargin: "-30% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
