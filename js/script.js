
// script.js - light client-side utilities

// Bootstrap form validation pattern
(() => {
  'use strict';
  const forms = document.querySelectorAll('#contactForm');
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
      }
      // Form will submit normally
    }, false);
  });
})();

// Smooth scroll for internal links (if any)
document.querySelectorAll('a[href^="#"]:not(#backToTop)').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});



// ============================================
// ========== HERO IMAGE SLIDER ===============
// ============================================
let slides = document.querySelectorAll(".hero-slider .slide");
let current = 0;

function nextSlide() {
  if (slides.length === 0) return;
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}

setInterval(nextSlide, 5000); // Auto sliding every 5 seconds


  // Scroll animation observer
const animatedElements = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

animatedElements.forEach(el => observer.observe(el));





const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {

  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }

});

scrollTopBtn.addEventListener("click", function(e){

  e.preventDefault();

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

});








const form = document.getElementById('contactForm');
const result = document.getElementById('result');
const btn = document.getElementById('submitBtn');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Button loading state
  btn.innerText = "Sending...";
  btn.disabled = true;

  const formData = new FormData(form);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      result.innerHTML = "<p style='color:green;'>✅ Message sent successfully!</p>";
      form.reset();
    } else {
      result.innerHTML = "<p style='color:red;'>❌ Something went wrong!</p>";
    }
  })
  .catch(() => {
    result.innerHTML = "<p style='color:red;'>❌ Network error!</p>";
  })
  .finally(() => {
    btn.innerText = "Send Message";
    btn.disabled = false;
  });
});






 AOS.init({
    duration: 1000,
    once: true
  });