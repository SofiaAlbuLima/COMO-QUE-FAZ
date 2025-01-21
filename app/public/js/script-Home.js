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
}

//------------------------------------------------------------------------------------

let countD = 1;

function nextImageD() {
    countD++;
    if (countD > 3) {
        countD = 1;
    }
    document.getElementById("radio" + countD + "D").checked = true;

    // Defina o background apenas para o botão correspondente
    const currentBtn = document.querySelector(".manual-btnD" + countD+"-D");
    currentBtn.style.background = "#cb218c";

    // Remova o background dos outros botões manuais
    for (let i = 1; i <= 3; i++) {
        if (i !== countD) {
            const otherBtn = document.querySelector(".manual-btnD" + i+"-D");
            otherBtn.style.background = "white";
        }
    }
}

// Inicie o carrossel automaticamente após o carregamento da página
window.addEventListener("load", function () {

  setInterval(nextImage, 2500);
  document.getElementById("radio1").checked = true;
  document.querySelector(".manual-btn1").style.background = "#cb218c";

  setInterval(nextImageD, 2500);
  document.getElementById("radio1D").checked = true;
  document.querySelector(".manual-btnD1-D").style.background = "#cb218c";
});

//------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {

    // Se você quiser estilizar com base em um parâmetro específico na URL:
    let urlParams = new URLSearchParams(window.location.search);
    let filtro = urlParams.get('filtro') || 'em-alta'; // Define 'em-alta' como padrão

    function limparSelecao() {
        document.querySelectorAll('[id="filtro-selecionado"]').forEach(el => el.removeAttribute('id'));
    }

    if (filtro === 'em-alta') {
        limparSelecao();
        let emAlta = document.querySelector('#Filtro-emAlta');
        if (emAlta) {
            emAlta.setAttribute('id', 'filtro-selecionado');
        }
    } else if (filtro === 'recente') {
        limparSelecao();
        let recente = document.querySelector('#Filtro-recente');
        if (recente) {
            recente.setAttribute('id', 'filtro-selecionado');
        }
    } else if (filtro === 'rapidos') {
        limparSelecao();
        let rapidas = document.querySelector('#Filtro-rapidas');
        if (rapidas) {
            rapidas.setAttribute('id', 'filtro-selecionado');
        }
    }
});