document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // CONFIGURACIÓN FÁCIL DE PERSONALIZAR
  // =========================================================
  const CONFIG = {
    musicVolume: 0.55,
    progressSteps: [20, 40, 60, 80, 90, 100],

    messages: {
      0: "Toca el corazón",
      20: "Toca otra vez",
      40: "Algo se está encendiendo",
      60: "Sigue que esto se calienta",
      80: "Un poquito más",
      90: "No pares ahora",
      100: "Una última vez ❤️"
    }
  };

  // =========================================================
  // ELEMENTOS
  // =========================================================
  const cover = document.getElementById("portada");
  const mainContent = document.getElementById("mainContent");
  const heartButton = document.getElementById("heartButton");
  const heartMessage = document.getElementById("heartMessage");
  const progressBar = document.getElementById("progressBar");
  const progressPercent = document.getElementById("progressPercent");
  const music = document.getElementById("backgroundMusic");

  let progress = 0;
  let finalStep = false;

  // La portada aparece siempre al recargar.
  document.body.classList.add("lock-scroll");

  function updateProgress(value) {
    progress = value;
    progressBar.style.width = `${value}%`;
    progressPercent.textContent = `${value}%`;
    heartMessage.textContent = CONFIG.messages[value] || CONFIG.messages[0];
  }

  function startExperience() {
    cover.classList.add("hidden");
    mainContent.classList.remove("is-locked");
    document.body.classList.remove("lock-scroll");

    music.volume = CONFIG.musicVolume;

    // Los navegadores modernos permiten reproducir audio
    // después de una interacción del usuario.
    music.play().catch(() => {
      console.log("El navegador bloqueó el audio. El usuario puede iniciarlo manualmente.");
    });

    setTimeout(() => {
      document.getElementById("fotos").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 250);
  }

  heartButton.addEventListener("click", () => {
    if (progress < 100) {
      const next = CONFIG.progressSteps.find(step => step > progress);
      updateProgress(next || 100);
      return;
    }

    if (!finalStep) {
      finalStep = true;
      heartMessage.textContent = "Una última vez ❤️";
      heartButton.classList.add("final-pulse");
      return;
    }

    startExperience();
  });

  // =========================================================
  // ÁLBUM DE FOTOS
  // =========================================================
  const photoTrack = document.getElementById("photoTrack");
  const photos = [...photoTrack.querySelectorAll("img")];
  const prevPhoto = document.getElementById("prevPhoto");
  const nextPhoto = document.getElementById("nextPhoto");
  const photoDots = document.getElementById("photoDots");

  let currentPhoto = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  photos.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "photo-dot";
    dot.setAttribute("aria-label", `Ir a foto ${index + 1}`);
    dot.addEventListener("click", () => showPhoto(index));
    photoDots.appendChild(dot);
  });

  const dots = [...photoDots.children];

  function showPhoto(index) {
    currentPhoto = (index + photos.length) % photos.length;
    photoTrack.style.transform = `translateX(-${currentPhoto * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentPhoto);
    });
  }

  prevPhoto.addEventListener("click", () => showPhoto(currentPhoto - 1));
  nextPhoto.addEventListener("click", () => showPhoto(currentPhoto + 1));

  photoTrack.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  photoTrack.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) > 45) {
      if (distance < 0) showPhoto(currentPhoto + 1);
      else showPhoto(currentPhoto - 1);
    }
  }, { passive: true });

  showPhoto(0);

  // =========================================================
  // CARTA
  // =========================================================
  const letter = document.getElementById("letter");
  const openLetter = document.getElementById("openLetter");

  openLetter.addEventListener("click", () => {
    letter.classList.toggle("open");
  });

  // =========================================================
  // BRINDIS
  // =========================================================
  const toastScene = document.getElementById("toastScene");
  const sparkles = document.getElementById("sparkles");

  // Crear partículas decorativas.
  for (let i = 0; i < 55; i++) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${48 + (Math.random() * 4 - 2)}%`;
    spark.style.top = `${42 + (Math.random() * 10 - 5)}%`;
    spark.style.setProperty("--x", `${(Math.random() - .5) * 300}px`);
    spark.style.setProperty("--y", `${(Math.random() - .5) * 230}px`);
    spark.style.animationDelay = `${Math.random() * .3}s`;
    sparkles.appendChild(spark);
  }

  let toastTriggered = false;

  const toastObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !toastTriggered) {
        toastTriggered = true;
        toastScene.classList.add("active");
      }
    });
  }, {
    threshold: 0.45
  });

  toastObserver.observe(document.getElementById("brindis"));

  // =========================================================
  // CENA
  // =========================================================
  const discoverDinner = document.getElementById("discoverDinner");
  const dinnerCard = document.getElementById("dinnerCard");

  discoverDinner.addEventListener("click", () => {
    const isOpen = dinnerCard.classList.toggle("open");
    discoverDinner.textContent = isOpen ? "Ocultar" : "Descubrir";

    if (isOpen) {
      setTimeout(() => {
        dinnerCard.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 100);
    }
  });

  // =========================================================
  // SEGURIDAD / FALLBACK PARA IMÁGENES NO CARGADAS
  // =========================================================
  photos.forEach(img => {
    img.addEventListener("error", () => {
      img.style.background = "linear-gradient(135deg, #6d2845, #180914)";
      img.style.objectFit = "none";
      img.alt = "Agrega tu fotografía en la carpeta fotos";
    });
  });

  const toastPhoto = document.querySelector(".toast-photo img");
  toastPhoto.addEventListener("error", () => {
    toastPhoto.style.background = "linear-gradient(135deg, #6d2845, #180914)";
    toastPhoto.alt = "Agrega tu fotografía de brindis en la carpeta fotos";
  });
});
