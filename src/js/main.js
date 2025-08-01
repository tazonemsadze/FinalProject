"use strict";

// header

function initializeImageSlider() {
  const images = [
    "src/assets/images/person-1.avif",
    "src/assets/images/person-2.avif",
    "src/assets/images/person-3.avif",
  ];

  const backgroundImage = document.getElementById("backgroundImage");
  const counterNumber = document.getElementById("counterNumber");
  let currentImageIndex = 0;

  function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const nextIndex = currentImageIndex + 1;

    counterNumber.textContent = nextIndex.toString().padStart(2, "0");

    setTimeout(() => {
      backgroundImage.src = images[currentImageIndex];
    }, 500);
  }

  setTimeout(() => {
    setInterval(changeImage, 5000);
  }, 1000);
}

// TODO progress ANM
function animateProgressBar() {
  const progressFill = document.getElementById("progressFill");
  const progressPercentage = document.getElementById("progressPercentage");
  let progress = 0;
  const targetProgress = 100;
  const duration = 3000;
  const steps = 60;
  const increment = targetProgress / steps;
  const stepDuration = duration / steps;

  function updateProgress() {
    if (progress < targetProgress) {
      progress += increment;
      if (progress > targetProgress) progress = targetProgress;

      progressFill.style.width = progress + "%";
      progressPercentage.textContent = Math.round(progress) + "%";

      setTimeout(updateProgress, stepDuration);
    }
  }

  setTimeout(updateProgress, 500);
}

function initializePage() {
  initializeImageSlider();
  animateProgressBar();
}

//TODO wait for load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage);
} else {
  initializePage();
}
// ---------------------------------------------------------------------------------------------------------------------------

let activeSlide = 0;

function showSlide(slideIndex) {
  const slides = document.querySelectorAll(".slider__slide");
  const dots = document.querySelectorAll(".slider__dot");

  slides.forEach((slide) => {
    slide.classList.remove("slider__slide--active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("slider__dot--active");
  });

  if (slides[slideIndex]) {
    slides[slideIndex].classList.add("slider__slide--active");
    activeSlide = slideIndex;
  }

  // TODO dot active
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

document.addEventListener("DOMContentLoaded", function () {
  const dots = document.querySelectorAll(".slider__dot");

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      showSlide(slideIndex);
    });
  });
});

setInterval(function () {
  activeSlide = (activeSlide + 1) % 3;
  showSlide(activeSlide);
}, 5000);

// -------------------------------------------------------------------------------------------------------------

// three box grid wth pr barr

const skills = [
  { name: "design", percentage: 80 },
  { name: "photography", percentage: 65 },
  { name: "marketing", percentage: 50 },
  { name: "photoshop", percentage: 30 },
];

let animationStarted = false;

// skill animation
function animateSkill(skillName, targetPercentage) {
  const percentElement = document.getElementById(skillName + "-percent");
  const barElement = document.getElementById(skillName + "-bar");

  let currentPercentage = 0;

  // animation func
  const animate = () => {
    if (currentPercentage < targetPercentage) {
      currentPercentage++;
      percentElement.textContent = currentPercentage + "%";
      barElement.style.width = currentPercentage + "%";

      setTimeout(animate, 30);
    }
  };

  animate();
}

function startSkillAnimations() {
  if (animationStarted) return;

  animationStarted = true;

  skills.forEach((skill, index) => {
    setTimeout(() => {
      animateSkill(skill.name, skill.percentage);
    }, index * 200);
  });
}

// TODO check viewvport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// TODO Listen scr events
window.addEventListener("scroll", function () {
  const aboutSection = document.getElementById("aboutSection");

  if (isInViewport(aboutSection)) {
    startSkillAnimations();
  }
});

window.addEventListener("load", function () {
  const aboutSection = document.getElementById("aboutSection");
  if (isInViewport(aboutSection)) {
    startSkillAnimations();
  }
});
// ---------------------------------------------------------------------------------------------
// Projects section

const navButtons = document.querySelectorAll(".nav__button");
const projectCards = document.querySelectorAll(".card");

// TODO filter func
function filterProjects(category) {
  projectCards.forEach(function (card) {
    const cardCategory = card.getAttribute("data-category");

    if (category === "all" || cardCategory === category) {
      card.classList.remove("card--hidden");
    } else {
      card.classList.add("card--hidden");
    }
  });
}

// TODO func for dots
function updateActiveButton(activeButton) {
  navButtons.forEach(function (button) {
    button.classList.remove("nav__button--active");
  });
  activeButton.classList.add("nav__button--active");
}

navButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const category = this.getAttribute("data-category");
    filterProjects(category);
    updateActiveButton(this);
  });
});

filterProjects("all");
// -------------------------------------------------------------------------------------------------------------------------------

// footer

function submitForm() {
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".modal__close");
  const submitBtn = document.querySelector(".contact-form__button");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "SENDING...";

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      website: formData.get("website"),
      message: formData.get("message"),
    };

    try {
      let response = await fetch(
        "https://borjomi.loremipsum.ge/api/send-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Primary API failed");
      }

      const result = await response.json();

      if (result.status === 1) {
        showModal();
        form.reset();
      } else {
        throw new Error("API returned error status");
      }
    } catch (error) {
      try {
        const fallbackData = {
          title: `Contact from ${data.name}`,
          body: `Email: ${data.email}\nWebsite: ${data.website}\nMessage: ${data.message}`,
          userId: 1,
        };

        const fallbackResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fallbackData),
          }
        );

        if (fallbackResponse.ok) {
          showModal();
          form.reset();
        } else {
          throw new Error("Both APIs failed");
        }
      } catch (finalError) {
        alert(
          "Sorry, there was an error sending your message. Please try again later."
        );
      }
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "SEND MESSAGE";
  });

  function showModal() {
    modal.style.display = "block";
  }

  function hideModal() {
    modal.style.display = "none";
  }

  closeBtn.addEventListener("click", hideModal);

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      hideModal();
    }
  });
}

submitForm();
