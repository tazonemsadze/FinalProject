"use strict";

// Menu functionality
const menuBtn = document.querySelector(".menu__toggle--btn");
const primaryNav = document.querySelector(".primary__nav--list");
const navLinks = document.querySelectorAll(".primary__nav--item a");

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  const isVisible = primaryNav.getAttribute("data-visible") === "true";
  primaryNav.setAttribute("data-visible", !isVisible);
  menuBtn.setAttribute("aria-expanded", !isVisible);
}

// Close menu when clicking on nav links (mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      toggleMenu();
    }
  });
});

// Close menu when clicking outside (mobile)
document.addEventListener("click", (e) => {
  if (
    window.innerWidth < 768 &&
    !menuBtn.contains(e.target) &&
    !primaryNav.contains(e.target) &&
    primaryNav.getAttribute("data-visible") === "true"
  ) {
    toggleMenu();
  }
});

// Carousel functionality
const carouselContainer = document.querySelector(".carousel__container");
const carouselItems = document.querySelectorAll(".carousel__item");
const indicators = document.querySelectorAll(".indicator");

let currentIndex = 0;
let carouselInterval;

function showSlide(index) {
  // Update carousel position
  carouselContainer.style.transform = `translateX(-${index * 100}%)`;

  // Update indicators
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });

  currentIndex = index;
}

function nextSlide() {
  const nextIndex = (currentIndex + 1) % carouselItems.length;
  showSlide(nextIndex);
}

function startCarousel() {
  carouselInterval = setInterval(nextSlide, 4000);
}

function stopCarousel() {
  clearInterval(carouselInterval);
}

// Initialize carousel
showSlide(0);
startCarousel();

// Indicator click handlers
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    showSlide(index);
    stopCarousel();
    startCarousel(); // Restart the interval
  });
});

// Pause carousel on hover
const heroSection = document.querySelector(".hero__section");
heroSection.addEventListener("mouseenter", stopCarousel);
heroSection.addEventListener("mouseleave", startCarousel);

// Header scroll effect
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 50;
  header.setAttribute("data-scrolled", scrolled);
});

// Keyboard navigation for carousel
document.addEventListener("keydown", (e) => {
  if (document.activeElement.classList.contains("indicator")) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex =
        currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1;
      showSlide(prevIndex);
      stopCarousel();
      startCarousel();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
      stopCarousel();
      startCarousel();
    }
  }
});
