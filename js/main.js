/* ── AOS ── */
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
});

/* ── GSAP: hero entrance ── */
gsap.set(['.hero-tag', '.hero h1', '.hero-sub', '.hero-badges', '.hero-actions'], {
  opacity: 0, y: 40,
});
gsap.set('.hero-visual', { opacity: 0, y: 30 });
gsap.set('#navbar', { opacity: 0, y: -20 });

const heroTl = gsap.timeline({ delay: 0.15 });
heroTl
  .to('#navbar',        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
  .to('.hero-tag',      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
  .to('.hero h1',       { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.35')
  .to('.hero-sub',      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  .to('.hero-badges',   { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35')
  .to('.hero-actions',  { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
  .to('.hero-visual',   { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');

/* ── GSAP: hero-visual float (desktop only) ── */
if (window.innerWidth > 900) {
  gsap.to('.hero-visual', {
    y: -12,
    duration: 3.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 1.8,
  });
}

/* ── Progress bar ── */
const progressBar = document.getElementById('progress-bar');
function updateProgress() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollH   = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = (scrollTop / scrollH * 100) + '%';
}

/* ── Nav: shrink + active link on scroll ── */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function onScroll() {
  updateProgress();

  navbar.classList.toggle('scrolled', window.scrollY > 60);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });

/* ── Counter animation ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  if (isNaN(target)) return;
  const duration = 1800;
  let startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num[data-target], .badge-num[data-target]').forEach(el => counterObserver.observe(el));

/* ── Hamburger / mobile menu ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
});

document.querySelectorAll('.mobile-link, .mobile-menu-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

/* ── Tab switching with GSAP ── */
function switchTab(tier) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  document.querySelector(`[data-tier="${tier}"]`).classList.add('active');
  const target = document.getElementById('tab-' + tier);
  target.classList.add('active');

  gsap.fromTo(target,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
  );
}
