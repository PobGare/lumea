const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal sections as they enter the viewport.
if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px' });

  $$('.reveal').forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 55}ms`;
    observer.observe(element);
  });
} else {
  $$('.reveal').forEach((element) => element.classList.add('in'));
}

// Mobile navigation.
const menuButton = $('.menu-toggle');
const mobileMenu = $('#mobileMenu');

function setMenu(open) {
  menuButton?.classList.toggle('is-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
  mobileMenu?.classList.toggle('open', open);
  mobileMenu?.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
}

menuButton?.addEventListener('click', () => {
  const nextState = !mobileMenu?.classList.contains('open');
  setMenu(nextState);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1120) setMenu(false);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

// Prevent past dates in the appointment form.
const dateInput = $('input[type="date"]', $('#bookingForm'));
if (dateInput) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  dateInput.min = localDate;
}

// Portfolio/demo booking form behavior.
const bookingForm = $('#bookingForm');
const formNote = $('#formNote');

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (formNote) {
    formNote.textContent = 'Request captured in the demo. Connect this form to WhatsApp, email or your booking platform for live use.';
    formNote.style.color = '#7b293e';
  }

  const submitButton = bookingForm.querySelector('button[type="submit"] span');
  if (submitButton) {
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Request captured';
    window.setTimeout(() => {
      submitButton.textContent = originalText;
    }, 2200);
  }
});
