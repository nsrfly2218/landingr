// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMobile = document.querySelector(".nav-mobile");
  const nav = document.querySelector(".nav");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      nav.style.display = nav.style.display === "block" ? "none" : "block";

      // Toggle animation for hamburger icon
      this.classList.toggle("active");

      if (this.classList.contains("active")) {
        this.querySelector("span:nth-child(1)").style.transform =
          "rotate(45deg) translate(5px, 5px)";
        this.querySelector("span:nth-child(2)").style.opacity = "0";
        this.querySelector("span:nth-child(3)").style.transform =
          "rotate(-45deg) translate(7px, -7px)";
      } else {
        this.querySelector("span:nth-child(1)").style.transform = "none";
        this.querySelector("span:nth-child(2)").style.opacity = "1";
        this.querySelector("span:nth-child(3)").style.transform = "none";
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      nav.style.display === "block" &&
      !nav.contains(event.target) &&
      !navMobile.contains(event.target)
    ) {
      nav.style.display = "none";

      if (navToggle.classList.contains("active")) {
        navToggle.classList.remove("active");
        navToggle.querySelector("span:nth-child(1)").style.transform = "none";
        navToggle.querySelector("span:nth-child(2)").style.opacity = "1";
        navToggle.querySelector("span:nth-child(3)").style.transform = "none";
      }
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (window.innerWidth <= 768 && nav.style.display === "block") {
        nav.style.display = "none";

        if (navToggle.classList.contains("active")) {
          navToggle.classList.remove("active");
          navToggle.querySelector("span:nth-child(1)").style.transform = "none";
          navToggle.querySelector("span:nth-child(2)").style.opacity = "1";
          navToggle.querySelector("span:nth-child(3)").style.transform = "none";
        }
      }

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Sticky header on scroll
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.style.padding = "10px 0";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.padding = "20px 0";
      header.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    }

    lastScrollTop = scrollTop;
  });

  // Initialize CounterUp animation
  initCounterUp();

  // Initialize FAQ Accordion
  initAccordion();

  // Initialize Testimonial Slider
  initTestimonialSlider();

  // Video Play Button Functionality
  initVideoPlayer();
});

// CounterUp Animation
function initCounterUp() {
  const counters = document.querySelectorAll(".counter-value");
  const speed = 200; // The lower the value, the faster the animation

  function animateCounter(counter) {
    const target = +counter.getAttribute("data-count");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 1);
    } else {
      counter.innerText = target;
    }
  }

  // Use Intersection Observer to start counter animation when counters are in view
  const observerOptions = {
    threshold: 0.25,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// FAQ Accordion Functionality
function initAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });

  // Open the first FAQ item by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add("active");
  }
}

// Testimonial Slider Functionality
function initTestimonialSlider() {
  const slider = document.querySelector(".testimonial-slider");
  const slides = document.querySelectorAll(".testimonial-slide");
  const dotsContainer = document.querySelector(".testimonial-dots");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!slider || slides.length === 0) return;

  let currentIndex = 0;

  // Create dot navigation
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      goToSlide(index);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  // Show only the current slide
  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.style.display = index === currentIndex ? "block" : "none";
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  function goToNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function goToPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  // Button event listeners
  prevBtn.addEventListener("click", goToPrevSlide);
  nextBtn.addEventListener("click", goToNextSlide);

  // Initialize slider
  updateSlider();

  // Auto-advance slides every 5 seconds
  setInterval(goToNextSlide, 5000);
}

// Video Player Functionality
function initVideoPlayer() {
  const videoThumbnail = document.querySelector(".video-thumbnail");
  const playButton = document.querySelector(".play-button");

  if (!videoThumbnail || !playButton) return;

  playButton.addEventListener("click", function () {
    // This would normally play a video, but for this example,
    // we'll just replace the thumbnail with a YouTube embed
    const videoId = "your-video-id"; // Replace with your actual YouTube video ID
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", embedUrl);
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "100%");

    // Replace thumbnail with iframe
    videoThumbnail.innerHTML = "";
    videoThumbnail.appendChild(iframe);
    videoThumbnail.style.paddingBottom = "56.25%"; // 16:9 aspect ratio
    videoThumbnail.style.height = "0";
  });
}

// Reveal animations when elements come into view
document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(
    ".feature-card, .team-member, .pricing-card, .blog-card"
  );

  function reveal() {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);

  // Call reveal on initial load
  reveal();
});
