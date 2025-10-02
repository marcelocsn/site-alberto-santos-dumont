// ========================
// MENU HAMBURGUER
// ========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ========================
// FADE-IN DAS SEÇÕES
// ========================
const items = document.querySelectorAll('.item');

function checkVisible() {
  const triggerBottom = window.innerHeight * 0.85;
  items.forEach(item => {
    if (item.getBoundingClientRect().top < triggerBottom) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkVisible);
window.addEventListener('load', checkVisible);

// ========================
// BOTÃO VOLTAR AO TOPO
// ========================
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================
// SCROLL SUAVE NO MENU
// ========================
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = document.querySelector('header').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    navLinks.classList.remove('active'); // fecha menu mobile
  });
});

// ========================
// LIGHTBOX POR SEÇÃO
// ========================
const overlay = document.createElement('div');
overlay.id = 'image-overlay';

const imgElement = document.createElement('img');
const btnPrev = document.createElement('button');
const btnNext = document.createElement('button');

btnPrev.id = 'prev';
btnPrev.textContent = '⟨';
btnNext.id = 'next';
btnNext.textContent = '⟩';

overlay.appendChild(btnPrev);
overlay.appendChild(imgElement);
overlay.appendChild(btnNext);
document.body.appendChild(overlay);

let currentIndex = 0;
let currentGroup = []; // guarda as imagens da seção atual

function openImage(index, group) {
  currentGroup = Array.from(group); // define o grupo da seção
  currentIndex = index;
  imgElement.src = currentGroup[currentIndex].src;
  overlay.style.display = 'flex';
  document.body.classList.add('no-scroll');
}

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }
});

btnPrev.addEventListener('click', e => { 
  e.stopPropagation(); 
  currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length; 
  imgElement.src = currentGroup[currentIndex].src; 
});

btnNext.addEventListener('click', e => { 
  e.stopPropagation(); 
  currentIndex = (currentIndex + 1) % currentGroup.length; 
  imgElement.src = currentGroup[currentIndex].src; 
});

// Para cada seção .item, pega todas as imagens dentro dela
document.querySelectorAll('.item').forEach(section => {
  const images = section.querySelectorAll('img'); // pode ter 1 ou várias
  images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openImage(index, images));
  });
});

// Teclado
document.addEventListener('keydown', e => {
  if (overlay.style.display === 'flex') {
    if (e.key === 'Escape') {
      overlay.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }
    if (e.key === 'ArrowLeft') btnPrev.click();
    if (e.key === 'ArrowRight') btnNext.click();
  }
});

// Swipe mobile
let touchStartX = 0;
let touchEndX = 0;

imgElement.addEventListener('touchstart', e => { 
  touchStartX = e.changedTouches[0].screenX; 
});
imgElement.addEventListener('touchend', e => { 
  touchEndX = e.changedTouches[0].screenX; 
  handleGesture(); 
});

function handleGesture() {
  if (touchEndX < touchStartX - 50) btnNext.click();
  if (touchEndX > touchStartX + 50) btnPrev.click();
}

