// Seleciona o ícone do menu hamburguer
const menuHamburguer = document.querySelector('.menu-hamburguer');

// Adiciona o evento de clique
menuHamburguer.addEventListener('click', () => {
    toggleMenu();
});

function toggleMenu() {
    const nav = document.querySelector('.nav-responsive');

    // Alterna a classe "change" no ícone
    menuHamburguer.classList.toggle('change');

    // Mostra ou esconde o menu com base na classe "change"
    if (menuHamburguer.classList.contains('change')) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
}
