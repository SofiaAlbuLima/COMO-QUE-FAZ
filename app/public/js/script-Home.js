let count = 1;

function nextImage() {
    count++;
    if (count > 3) {
        count = 1;
    }
    document.getElementById("radio" + count).checked = true;

    // Defina o background apenas para o botão correspondente
    const currentBtn = document.querySelector(".manual-btn" + count);
    currentBtn.style.background = "#cb218c";

    // Remova o background dos outros botões manuais
    for (let i = 1; i <= 3; i++) {
        if (i !== count) {
            const otherBtn = document.querySelector(".manual-btn" + i);
            otherBtn.style.background = "white";
        }
    }
    console.log("Next slide: " + count);
}


//------------------------------------------------------------------------------------

let countD = 1;
let intervalId;
let startX = 0;
let endX = 0;
const swipeThreshold = 50; // Distância mínima para considerar um swipe

function nextImageD() {
    countD++;
    if (countD > 3) {
        countD = 1;
    }
    updateSlide(countD);
}

function prevImageD() {
    countD--;
    if (countD < 1) {
        countD = 3;
    }
    updateSlide(countD);
}

function updateSlide(index) {
    document.getElementById("radio" + index + "D").checked = true;

    // Define o background apenas para o botão correspondente
    const currentBtn = document.querySelector(".manual-btnD" + index + "-D");
    currentBtn.style.background = "#cb218c";

    // Remove o background dos outros botões manuais
    for (let i = 1; i <= 3; i++) {
        if (i !== index) {
            const otherBtn = document.querySelector(".manual-btnD" + i + "-D");
            otherBtn.style.background = "white";
        }
    }
}

function startCarousel() {
    intervalId = setInterval(nextImageD, 2500);
}

function resetCarousel() {
    clearInterval(intervalId);
    startCarousel();
}

// Funções de touch
function handleTouchStart(event) {
    startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    endX = event.touches[0].clientX;
}

function handleTouchEnd() {
    if (startX - endX > swipeThreshold) {
        // Swiped left
        nextImageD();
    } else if (endX - startX > swipeThreshold) {
        // Swiped right
        prevImageD();
    }
    resetCarousel();
}

// Inicie o carrossel automaticamente após o carregamento da página
window.addEventListener("load", function () {
    console.log("Página carregada!");

    startCarousel();
    updateSlide(1); // Inicialize a cor do primeiro botão

    // Adiciona eventos de touch ao container do carrossel
    const slider = document.querySelector('.slider-D');
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
    slider.addEventListener('touchend', handleTouchEnd);
});

// Adiciona um evento de clique nos botões manuais para controlar o slide e reiniciar o intervalo
document.querySelectorAll(".manual-btnD").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        countD = index + 1;
        updateSlide(countD);
        resetCarousel();
    });
});

//------------------------------------------------------------------------------------

function VisiRecente() {
    var x = document.getElementById("Conteudo-Recente");
    var y = document.getElementById("Conteudo-EmAlta");
    var z = document.getElementById("Conteudo-Rapidas");
    var emAltaButton = document.querySelector(".EmAlta");

    if (x.style.display === "none") {
      x.style.display = "flex";
      y.style.display = "none";
      z.style.display = "none";
      emAltaButton.classList.remove("active");
    }
  }
  window.onload = function() {
    var emAltaButton = document.querySelector(".EmAlta");
    emAltaButton.classList.add("active");
};

function VisiEmAlta() {
    var x = document.getElementById("Conteudo-Recente");
    var y = document.getElementById("Conteudo-EmAlta");
    var z = document.getElementById("Conteudo-Rapidas");

    if (y.style.display === "none") {
        x.style.display = "none";
        y.style.display = "flex";
        z.style.display = "none";
    }
}
  function VisiRapidas() {
    var x = document.getElementById("Conteudo-Recente");
    var y = document.getElementById("Conteudo-EmAlta");
    var z = document.getElementById("Conteudo-Rapidas");
    var emAltaButton = document.querySelector(".EmAlta");

    if (z.style.display === "none") {
      x.style.display = "none";
      y.style.display = "none";
      z.style.display = "flex";
      emAltaButton.classList.remove("active");
    }
  }

  //------------------------------------------------------------------------------------

  function Filtro(filtro) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('filter', filtro);
    urlParams.set('pagina', 1);
    window.location.search = urlParams.toString();
}