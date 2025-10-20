// Menu Hambúrguer e Overlay
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".hamburguer");
  const navLateral = document.getElementById("menu-lateral");
  const overlay = document.getElementById("overlay");

  // Toggle menu lateral
  btn.addEventListener("click", () => {
    navLateral.classList.toggle("show");
    btn.classList.toggle("ativo");
    overlay.classList.toggle("show");
  });

  // Fechar menu ao clicar no overlay
  overlay.addEventListener("click", () => {
    navLateral.classList.remove("show");
    btn.classList.remove("ativo");
    overlay.classList.remove("show");
  });

  // Fechar menu ao clicar em um link
  const menuLinks = navLateral.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLateral.classList.remove("show");
      btn.classList.remove("ativo");
      overlay.classList.remove("show");
    });
  });
});

// Botão Voltar ao Topo
const btnTopo = document.getElementById("btn-topo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTopo.classList.add("show");
  } else {
    btnTopo.classList.remove("show");
  }
});

btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animação suave ao rolar para seções
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
