document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('hamburguer');
  const navLateral = document.getElementById('menu-lateral');

  btn.addEventListener('click', () => {
    navLateral.classList.toggle('show');
    btn.classList.toggle('ativo');
  });
});

class ThemeController {
  constructor() {
    this.toggleThemeCheckbox = document.getElementById("toggle-theme");
    this.themeLabel = document.getElementById("theme-label");
    this.currentTheme = localStorage.getItem("theme") || "dark"; // começa no escuro

    this.init();
  }

  init() {
    // Aplicar tema salvo
    this.applyTheme(this.currentTheme);

    // Event listener para mudança de tema
    this.toggleThemeCheckbox.addEventListener("change", () => {
      this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
      this.applyTheme(this.currentTheme);
      localStorage.setItem("theme", this.currentTheme);
    });
  }

  applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light");   // aplica o claro
      this.toggleThemeCheckbox.checked = true;
      this.themeLabel.textContent = "Modo Escuro";
    } else {
      document.body.classList.remove("light"); // padrão é escuro
      this.toggleThemeCheckbox.checked = false;
      this.themeLabel.textContent = "Modo Claro";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ThemeController();
});


