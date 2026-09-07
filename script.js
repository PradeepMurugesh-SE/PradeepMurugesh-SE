const body = document.body;
const themeButton = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.remove('light');
  themeLabel.textContent = 'Dark mode';
} else {
  body.classList.add('light');
  themeLabel.textContent = 'Light mode';
}

const toggleTheme = () => {
  const isLight = body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeLabel.textContent = isLight ? 'Light mode' : 'Dark mode';
};

themeButton.addEventListener('click', toggleTheme);

const textSlides = document.querySelector('.typed-text');
if (textSlides) {
  const phrases = textSlides.dataset.text.split(',');
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const current = phrases[phraseIndex];
    if (!current) return;

    if (!deleting) {
      charIndex += 1;
      textSlides.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      charIndex -= 1;
      textSlides.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const speed = deleting ? 35 : 85;
    setTimeout(type, speed);
  };

  type();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
