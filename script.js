/* ========================================
   BERNARDO FARIA ACADEMY BRAZILIAN JIU-JITSU - SCRIPTS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========== Mobile Navigation Toggle ==========
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const spans = navToggle.querySelectorAll('span');
      navToggle.classList.toggle('open');
      if (navToggle.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        // Don't close if it's the dropdown parent on mobile
        if (link.closest('.navbar__dropdown') && link === link.closest('.navbar__dropdown').querySelector(':scope > a')) return;
        navLinks.classList.remove('active');
        navToggle.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ========== Mobile Dropdown Toggle ==========
  document.querySelectorAll('.navbar__dropdown > a').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.closest('.navbar__dropdown').classList.toggle('open');
      }
    });
  });

  // ========== Scroll Animations ==========
  const animateElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
  animateElements.forEach(el => observer.observe(el));

  // ========== Smooth Scroll ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = this.getAttribute('href');
      if (target === '#') return;
      const el = document.querySelector(target);
      if (el) {
        e.preventDefault();
        const navH = document.querySelector('.navbar').offsetHeight;
        window.scrollTo({ top: el.offsetTop - navH, behavior: 'smooth' });
      }
    });
  });

  // Contact form is now handled by each page's inline script (redirects to choose-program.html)


  // ========== GoHighLevel / LeadConnector Form Submit Tracking ==========
  window.addEventListener("message", function(event) {
    // Check if message is from a GoHighLevel form submission
    if (event.data && (
      event.data === 'FORM_SUBMITTED' || 
      event.data.type === 'FORM_SUBMITTED' || 
      (typeof event.data === 'string' && event.data.indexOf('FORM_SUBMITTED') !== -1)
    )) {
      // Facebook Pixel Lead Event
      if (typeof fbq === 'function') {
        fbq('track', 'Lead');
      }
    }
  });

});

// ========== Mobile Sticky CTA (show on scroll) ==========
(function() {
  var stickyCta = document.getElementById('mobile-sticky-cta');
  if (!stickyCta) return;

  var topBar = document.querySelector('.top-bar');
  var navbar = document.querySelector('.navbar');
  var triggerPoint = 0;

  // Calculate when to show: after top-bar + navbar scroll out of view
  if (topBar) triggerPoint += topBar.offsetHeight;
  if (navbar) triggerPoint += navbar.offsetHeight;

  window.addEventListener('scroll', function() {
    if (window.scrollY > triggerPoint) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  });
})();
