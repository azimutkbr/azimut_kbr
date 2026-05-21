const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle__icon');
const themeText = document.querySelector('.theme-toggle__text');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-menu');

const savedTheme = localStorage.getItem('azimut-theme') || 'light';
setTheme(savedTheme);

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('azimut-theme', theme);
  if (themeIcon && themeText) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeText.textContent = theme === 'dark' ? 'Светлая' : 'Тёмная';
  }
}

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
});

menuToggle?.addEventListener('click', () => {
  const isOpen = menu?.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
