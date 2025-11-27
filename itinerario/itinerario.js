// define data de atualização
document.getElementById("updateDate").innerText = new Date().toLocaleDateString("pt-BR")

// habilita interação dos botões de ano
document.querySelectorAll(".year-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const itin = btn.dataset.itin
    const ano = btn.dataset.ano
    const id = `${itin}-det-${ano}`
    const el = document.getElementById(id)

    if (!el) return

    // Check if this detail is currently visible
    const isCurrentlyVisible = el.style.display === "block" || (!el.style.display && !el.hidden)

    // Hide all details of the same itinerary first
    document.querySelectorAll(`#${itin} .details`).forEach((d) => {
      d.style.display = "none"
      d.classList.remove("expanding", "collapsing")
    })

    // Reset all buttons in this itinerary group
    const group = document.querySelectorAll(`.year-btn[data-itin="${itin}"]`)
    group.forEach((g) => g.setAttribute("aria-selected", "false"))

    // If the clicked detail was visible, hide it (toggle off)
    if (isCurrentlyVisible) {
      el.classList.add("collapsing")
      setTimeout(() => {
        el.style.display = "none"
        el.classList.remove("collapsing")
      }, 300)
    } else {
      // Show the clicked detail (toggle on)
      el.style.display = "block"
      el.classList.add("expanding")
      btn.setAttribute("aria-selected", "true")

      // Remove expanding class after animation
      setTimeout(() => {
        el.classList.remove("expanding")
      }, 300)

      // Scroll to the detail for better mobile experience
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 120)
    }
  })
})

// ações principais
function downloadResumo() {
  const text =
    "Resumo dos Itinerários - Exatas e TI\n\n2º ano - Exatas: Álgebra, Geometria, Estatística.\n3º ano - Exatas: Pré-cálculo, Física.\n2º ano - TI: Lógica, HTML/CSS.\n3º ano - TI: OOP, BD, Redes."
  const blob = new Blob([text], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "resumo-itinerarios.txt"
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function inscrever() {
  try {
    window.parent.postMessage({ type: "itinerario-inscricao", source: "itinerarios_escolar" }, "*")
  } catch (e) {
    console.warn(e)
  }
  alert("Obrigado! Sua intenção de inscrição foi registrada. (Simulação)")
}
// destacar a partir da query ?open=exatas:2
;(function highlightFromQuery() {
  const qs = new URLSearchParams(location.search)
  const itin = qs.get("open") // ex: ?open=ti:3
  if (itin) {
    const parts = itin.split(":")
    if (parts.length === 2) {
      const btn = document.querySelector(`.year-btn[data-itin="${parts[0]}"][data-ano="${parts[1]}"]`)
      if (btn) {
        btn.click() // simula clique para abrir
        btn.closest(".card").style.outline = "3px solid var(--accent)"
        btn.closest(".card").style.transition = "outline 0.5s ease"
      }
    }
  }
})()

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".wrap").classList.add("visible")
})

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hamburguer")
  const navLateral = document.getElementById("menu-lateral")

  btn.addEventListener("click", () => {
    navLateral.classList.toggle("show")
    btn.classList.toggle("ativo")
  })
})

class ThemeController {
  constructor() {
    this.toggleThemeCheckbox = document.getElementById("toggle-theme")
    this.themeLabel = document.getElementById("theme-label")
    this.currentTheme = localStorage.getItem("theme") || "dark" // começa no escuro

    this.init()
  }

  init() {
    // Aplicar tema salvo
    this.applyTheme(this.currentTheme)

    // Event listener para mudança de tema
    this.toggleThemeCheckbox.addEventListener("change", () => {
      this.currentTheme = this.currentTheme === "dark" ? "light" : "dark"
      this.applyTheme(this.currentTheme)
      localStorage.setItem("theme", this.currentTheme)
    })
  }

  applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light") // aplica o claro
      this.toggleThemeCheckbox.checked = true
      this.themeLabel.textContent = "Modo Escuro"
    } else {
      document.body.classList.remove("light") // padrão é escuro
      this.toggleThemeCheckbox.checked = false
      this.themeLabel.textContent = "Modo Claro"
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ThemeController()
})

// Carrossel da Galeria
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const indicators = document.querySelectorAll(".indicator")

  if (!track || !prevBtn || !nextBtn) return

  let currentIndex = 0
  const totalSlides = document.querySelectorAll(".carousel-slide").length

  function updateCarousel() {
    const offset = -currentIndex * 100
    track.style.transform = `translateX(${offset}%)`

    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex)
    })
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides
    updateCarousel()
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides
    updateCarousel()
  }

  // Event listeners dos botões
  nextBtn.addEventListener("click", nextSlide)
  prevBtn.addEventListener("click", prevSlide)

  // Event listeners dos indicadores
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      currentIndex = Number.parseInt(indicator.dataset.index)
      updateCarousel()
    })
  })

  // Suporte para teclado (setas)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide()
    if (e.key === "ArrowRight") nextSlide()
  })

  // Suporte para swipe em mobile
  let touchStartX = 0
  let touchEndX = 0

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX
  })

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  })

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide() // Swipe left
    if (touchEndX > touchStartX + 50) prevSlide() // Swipe right
  }
})
