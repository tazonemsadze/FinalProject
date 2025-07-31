"use strict";

// Keep track of current slide (starting from 0)
let activeSlide = 0;

// Function to show specific slide
function showSlide(slideIndex) {
  // Get all slides and dots
  const slides = document.querySelectorAll(".slider__slide");
  const dots = document.querySelectorAll(".slider__dot");

  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove("slider__slide--active");
  });

  // Remove active class from all dots
  dots.forEach((dot) => {
    dot.classList.remove("slider__dot--active");
  });

  // Show selected slide and activate corresponding dot
  if (slides[slideIndex]) {
    slides[slideIndex].classList.add("slider__slide--active");
    activeSlide = slideIndex;
  }

  // Activate dots for the current slide
  const currentSlideElement = slides[slideIndex];
  if (currentSlideElement) {
    const currentSlideDots =
      currentSlideElement.querySelectorAll(".slider__dot");
    currentSlideDots.forEach((dot, index) => {
      if (index === slideIndex) {
        dot.classList.add("slider__dot--active");
      }
    });
  }
}

// Add event listeners when page loads
document.addEventListener("DOMContentLoaded", function () {
  const dots = document.querySelectorAll(".slider__dot");

  // Add click event listener to each dot
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      showSlide(slideIndex);
    });
  });
});

// Optional: Auto-slide every 5 seconds
// Uncomment the lines below if you want automatic sliding

setInterval(function () {
  activeSlide = (activeSlide + 1) % 3;
  showSlide(activeSlide);
}, 5000);
