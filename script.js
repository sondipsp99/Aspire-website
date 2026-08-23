  document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Drawer Toggle
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // 2. Sticky Header Effect on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Duplicate Marquee Content for Infinite Loop
  const marquee = document.getElementById('marquee');
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
  }

  // 4. Destination Country Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const destPanels = document.querySelectorAll('.dest-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      destPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = `tab-${btn.dataset.target}`;
      document.getElementById(targetId)?.classList.add('active');
    });
  });

  // 5. FAQ Accordion Expand/Collapse
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 6. Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 7. Animated Numbers Stats Counter
  const counters = document.querySelectorAll('.counter');
  let counterStarted = false;

  const statsSection = document.getElementById('statsCounter');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counterStarted) {
        counterStarted = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.innerText = target.toLocaleString();
              clearInterval(timer);
            } else {
              counter.innerText = Math.ceil(current).toLocaleString();
            }
          }, stepTime);
        });
      }
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }

  // 8. Partner Certificate Lightbox
  const certLightbox = document.getElementById('certLightbox');
  const certLightboxImg = document.getElementById('certLightboxImg');
  const certLightboxClose = document.getElementById('certLightboxClose');

  window.openCertLightbox = (cardEl) => {
    if (!certLightbox || !certLightboxImg) return;
    const img = typeof cardEl === 'string' ? null : cardEl.querySelector('img');
    if (img) {
      certLightboxImg.src = img.src;
      certLightboxImg.alt = img.alt || 'Partner certificate';
    }
    certLightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeCertLightbox = () => {
    if (!certLightbox) return;
    certLightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  certLightboxClose?.addEventListener('click', closeCertLightbox);
  certLightbox?.addEventListener('click', (e) => {
    if (e.target === certLightbox) closeCertLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertLightbox();
  });

  // 9. Lead Form Submission Toast Alert
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🎉 Thank you! Your appointment request has been submitted successfully. Our senior consultant will call you within 24 hours.');
      leadForm.reset();
    });
  }
});
