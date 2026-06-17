// Год в футере
document.getElementById('year').textContent = new Date().getFullYear();

// Переключение темы (светлая / тёмная)
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const setThemeState = () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  themeToggle.setAttribute('aria-pressed', isDark);
};

setThemeState();

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';

  if (isDark) {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', 'dark');
  }

  try {
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  } catch (e) {
    // localStorage недоступен
  }

  setThemeState();
});

// Мобильное меню
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

const closeNav = () => {
  nav.classList.remove('is-open');
  navToggle.classList.remove('is-active');
  navToggle.setAttribute('aria-expanded', false);
};

const openNav = () => {
  nav.classList.add('is-open');
  navToggle.classList.add('is-active');
  navToggle.setAttribute('aria-expanded', true);
};

navToggle.addEventListener('click', (event) => {
  event.stopPropagation();
  const isOpen = nav.classList.contains('is-open');
  if (isOpen) {
    closeNav();
  } else {
    openNav();
  }
});

// Закрытие меню при клике на ссылку (актуально для мобильных)
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

// Закрытие меню при клике вне его области
document.addEventListener('click', (event) => {
  const isClickInsideNav = nav.contains(event.target);
  const isClickOnToggle = navToggle.contains(event.target);
  if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('is-open')) {
    closeNav();
  }
});

// Закрытие меню по клавише Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    closeNav();
  }
});

// Сброс состояния меню при переходе на десктопную ширину
const mobileMediaQuery = window.matchMedia('(max-width: 720px)');
mobileMediaQuery.addEventListener('change', (event) => {
  if (!event.matches) {
    closeNav();
  }
});

// Анимация появления блоков при скролле
const animatedItems = document.querySelectorAll('[data-animate]');

// Небольшая задержка по очереди для карточек навыков
document.querySelectorAll('.skills-list__item').forEach((item, index) => {
  item.style.setProperty('--delay', `${index * 0.06}s`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

animatedItems.forEach((item) => observer.observe(item));


const heroWrap = document.getElementById('heroWrap');
const hoverSound = new Audio('./assets/card-taken.mp3');
const dropSound = new Audio('./assets/card-dropped.mp3');

heroWrap.addEventListener('mouseenter', function() {
  const img = this.querySelector('img');
  if (img) img.src = './assets/image_hover.jpg';

  hoverSound.currentTime = 0.1;
  hoverSound.volume = 0.5;
  hoverSound.play().catch(error => {

  });
});

heroWrap.addEventListener('mouseleave', function() {
  const img = this.querySelector('img');
  if (img) img.src = './assets/image.jfif';

  dropSound.currentTime = 0;
  dropSound.volume = 0.5;
  dropSound.play().catch(error => {

  });
});