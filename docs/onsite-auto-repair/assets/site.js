document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-service-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const phone = data.get('phone') || '';
      const email = data.get('email') || '';
      const vehicle = data.get('vehicle') || '';
      const service = data.get('service') || '';
      const location = data.get('location') || '';
      const message = data.get('message') || '';
      const body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nVehicle: ${vehicle}\nService needed: ${service}\nService location: ${location}\n\nMessage:\n${message}\n\nSent from the Onsite Auto website.`;
      const subject = `Service request from ${name || 'website visitor'}`;
      window.location.href = `mailto:Mike@onsiteauto303.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const nav = document.getElementById('main-nav');
  if (nav) {
    const setNavState = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    setNavState();
    window.addEventListener('scroll', setNavState, { passive: true });
  }

  const menu = document.getElementById('site-menu');
  const overlay = document.querySelector('[data-menu-overlay]');
  const toggles = document.querySelectorAll('[data-menu-toggle]');
  const closeButtons = document.querySelectorAll('[data-menu-close]');
  const setMenuOpen = (open) => {
    if (!menu) return;
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    overlay?.classList.toggle('open', open);
    document.body.classList.toggle('body-menu-open', open);
    toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', String(open)));
  };
  toggles.forEach((toggle) => toggle.addEventListener('click', () => setMenuOpen(!menu?.classList.contains('open'))));
  closeButtons.forEach((button) => button.addEventListener('click', () => setMenuOpen(false)));
  overlay?.addEventListener('click', () => setMenuOpen(false));
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animatedSelectors = [
    '.section > .wrap',
    '.card',
    '.route-strip > *',
    '.feature-band',
    '.story-photo',
    '.contact-card',
    '.footer-cta-panel',
    '.footer-col',
    '.metric-card'
  ];
  const animatedElements = Array.from(document.querySelectorAll(animatedSelectors.join(',')))
    .filter((element) => !element.closest('.mobile-menu'));

  if (!reduceMotion && animatedElements.length) {
    animatedElements.forEach((element, index) => {
      const isPhoto = element.classList.contains('story-photo');
      const isPanel = element.classList.contains('footer-cta-panel') || element.classList.contains('feature-band');
      element.classList.add(isPhoto ? 'anim-left' : isPanel ? 'anim-scale' : 'anim-fade');
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 60}ms`;
    });
    document.documentElement.classList.add('anim-ready');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
      animatedElements.forEach((element) => observer.observe(element));
    } else {
      animatedElements.forEach((element) => element.classList.add('visible'));
    }
  }


  const counters = Array.from(document.querySelectorAll('[data-counter]'));
  const finishCounter = (counter) => {
    const target = Number(counter.dataset.count || counter.textContent || 0);
    counter.textContent = String(target);
    counter.classList.add('counted');
  };
  const animateCounter = (counter) => {
    const target = Number(counter.dataset.count || 0);
    const duration = 1050;
    const start = performance.now();
    counter.textContent = '0';
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
      else finishCounter(counter);
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach(finishCounter);
    } else {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.45 });
      counters.forEach((counter) => counterObserver.observe(counter));
    }
  }

  const floatingCta = document.getElementById('floating-cta');
  if (floatingCta) {
    const setFloatingState = () => floatingCta.classList.toggle('show', window.scrollY > window.innerHeight * 0.7);
    setFloatingState();
    window.addEventListener('scroll', setFloatingState, { passive: true });
  }
});
