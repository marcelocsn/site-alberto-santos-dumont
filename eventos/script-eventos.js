document.addEventListener("DOMContentLoaded", () => {
  // hamburguer menu
  const btn = document.getElementById("hamburguer")
  const navLateral = document.getElementById("menu-lateral")
  btn.addEventListener("click", () => {
    navLateral.classList.toggle("show")
    btn.classList.toggle("ativo")
  })

  // botão topo
  const btnTopo = document.getElementById("btn-topo")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) btnTopo.classList.add("show")
    else btnTopo.classList.remove("show")
  })
  btnTopo.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }))

  function initSlider(slidesId, interval = 5000) {
    const slidesEl = document.getElementById(slidesId)
    if (!slidesEl) return

    const total = slidesEl.children.length
    let idx = 0
    const sliderInterval = setInterval(nextSlide, interval)

    function goto(i) {
      idx = (i + total) % total
      slidesEl.style.transform = `translateX(-${idx * 100}%)`
    }

    function nextSlide() {
      goto(idx + 1)
    }

    return { goto, nextSlide }
  }

  initSlider("slides", 5000)
  initSlider("slides-bottom", 5000)

  // Lightbox para imagens dos cards
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const closeBtn = lightbox.querySelector(".close")
  const prevBtn = lightbox.querySelector(".prev")
  const nextBtn = lightbox.querySelector(".next")

  let imagensAtuais = []
  let idxAtual = 0

  document.querySelectorAll(".evento-card").forEach((card) => {
    const imgs = Array.from(card.querySelectorAll("img"))
    imgs.forEach((img, i) => {
      img.style.cursor = "pointer"
      img.addEventListener("click", () => {
        imagensAtuais = imgs.map((im) => im.src)
        idxAtual = i
        mostrarImagem()
        lightbox.style.display = "flex"
      })
    })
  })

  const sliderBottom = document.getElementById("slider-bottom")
  if (sliderBottom) {
    const slidesBottom = sliderBottom.querySelectorAll(".slide img")
    const imagensCarrossel = Array.from(slidesBottom).map((img) => img.src)

    slidesBottom.forEach((img, index) => {
      img.style.cursor = "pointer"
      img.addEventListener("click", (e) => {
        e.stopPropagation()
        console.log("[v0] Imagem do carrossel clicada, índice:", index)
        imagensAtuais = imagensCarrossel
        idxAtual = index
        mostrarImagem()
        lightbox.style.display = "flex"
      })
    })
  }

  function mostrarImagem() {
    console.log("[v0] Mostrando imagem:", imagensAtuais[idxAtual])
    lightboxImg.src = imagensAtuais[idxAtual]
  }

  closeBtn.addEventListener("click", () => (lightbox.style.display = "none"))
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none"
  })

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") lightbox.style.display = "none"
      if (e.key === "ArrowLeft") {
        idxAtual = (idxAtual - 1 + imagensAtuais.length) % imagensAtuais.length
        mostrarImagem()
      }
      if (e.key === "ArrowRight") {
        idxAtual = (idxAtual + 1) % imagensAtuais.length
        mostrarImagem()
      }
    }
  })

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    idxAtual = (idxAtual - 1 + imagensAtuais.length) % imagensAtuais.length
    mostrarImagem()
  })
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    idxAtual = (idxAtual + 1) % imagensAtuais.length
    mostrarImagem()
  })
})
