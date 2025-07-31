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

// three box grid wth pr barr

const skills = [
  { name: "design", percentage: 80 },
  { name: "photography", percentage: 65 },
  { name: "marketing", percentage: 50 },
  { name: "photoshop", percentage: 30 },
];

// Variable to track if animation has already run
let animationStarted = false;

// Function to animate a single skill
function animateSkill(skillName, targetPercentage) {
  const percentElement = document.getElementById(skillName + "-percent");
  const barElement = document.getElementById(skillName + "-bar");

  let currentPercentage = 0;

  // Animation function
  const animate = () => {
    if (currentPercentage < targetPercentage) {
      currentPercentage++;
      percentElement.textContent = currentPercentage + "%";
      barElement.style.width = currentPercentage + "%";

      // Continue animation
      setTimeout(animate, 30); // Adjust speed here (lower = faster)
    }
  };

  animate();
}

// Function to start all skill animations
function startSkillAnimations() {
  if (animationStarted) return; // Don't run animation twice

  animationStarted = true;

  // Start each skill animation with a small delay
  skills.forEach((skill, index) => {
    setTimeout(() => {
      animateSkill(skill.name, skill.percentage);
    }, index * 200); // 200ms delay between each skill
  });
}

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Listen for scroll events
window.addEventListener("scroll", function () {
  const aboutSection = document.getElementById("aboutSection");

  // Check if the about section is visible
  if (isInViewport(aboutSection)) {
    startSkillAnimations();
  }
});

// Also check when page loads (in case section is already visible)
window.addEventListener("load", function () {
  const aboutSection = document.getElementById("aboutSection");
  if (isInViewport(aboutSection)) {
    startSkillAnimations();
  }
});
