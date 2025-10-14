document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('hamburguer');
  const navLateral = document.getElementById('menu-lateral');

  btn.addEventListener('click', () => {
    navLateral.classList.toggle('show');
    btn.classList.toggle('ativo');
  });
});



// Botão voltar ao topo
const btnTopo = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btnTopo.classList.add("show");
  } else {
    btnTopo.classList.remove("show");
  }
});

btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// FADE-IN DAS SEÇÕES
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

// SCROLL SUAVE NO MENU
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
    document.getElementById('nav-links')?.classList.remove('active');
  });
});

// LIGHTBOX POR SEÇÃO
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
let currentGroup = [];

function openImage(index, group) {
  currentGroup = Array.from(group);
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

document.querySelectorAll('.item').forEach(section => {
  const images = section.querySelectorAll('img');
  images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openImage(index, images));
  });
});

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
