document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('hamburguer');
  const navLateral = document.getElementById('menu-lateral');

  btn.addEventListener('click', () => {
    navLateral.classList.toggle('show');
    btn.classList.toggle('ativo');
  });
});

