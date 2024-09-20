function toggleLike(button) {
  const heart = document.getElementById('coracao-preenchido');

  if (heart.style.display === 'block') {
    heart.style.display = 'none';
  } else {
    heart.style.display = 'block';
  }
}
function toggleLike1(button) {
  const heart = document.getElementById('coracao-preenchido1');

  if (heart.style.display === 'block') {
    heart.style.display = 'none';
  } else {
    heart.style.display = 'block';
  }
}


function AbrirOpcoes() {
  var x = document.getElementById("hide-opcoes");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function AbrirOpcoesComentario() {
  var x = document.getElementById("hide-opcoes-comentario");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function AbrirOpcoesDesktop(event) {
  event.stopPropagation();  // Impede que o clique propague para o document
  var x = document.getElementById("hide-opcoes-Desktop");

  if (x.style.display === "none" || x.style.display === "") {
    x.style.display = "block";

    // Adiciona o evento para fechar ao clicar fora
    document.addEventListener("click", fecharOpcoesAoClicarFora);
  } else {
    x.style.display = "none";
    document.removeEventListener("click", fecharOpcoesAoClicarFora);
  }
}

function fecharOpcoesAoClicarFora(event) {
  var x = document.getElementById("hide-opcoes-Desktop");
  var tres_pontinhos = document.getElementById("opcoes");

  // Verifica se o clique foi fora do menu de opções e do botão de opções
  if (!x.contains(event.target) && !tres_pontinhos.contains(event.target)) {
    x.style.display = "none";
    document.removeEventListener("click", fecharOpcoesAoClicarFora);
  }
}

// Garante que o clique no botão não feche imediatamente as opções
document.getElementById("opcoes").addEventListener("click", function (event) {
  event.stopPropagation();
});
function AbrirOpcoesComentarioDesktop() {
  var x = document.getElementById("hide-opcoes-comentario-Desktop");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}



function visibility1() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function visibility2() {
  var x = document.getElementById("myDIV2");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function visibility3() {
  var x = document.getElementById("myDIV3");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function visibility4() {
  var x = document.getElementById("myDIV4");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function visibility5() {
  var x = document.getElementById("myDIV5");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function visibility6() {
  var x = document.getElementById("myDIV6");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function visibility7() {
  var x = document.getElementById("myDIV7");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function visibility8() {
  var x = document.getElementById("myDIV8");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function visibility9() {
  var x = document.getElementById("myDIV9");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function switchImage(source) {
  document.querySelector(".imagemprincipal").src = source;
}
function switchImageDesktop(source) {
  document.querySelector(".imagemprincipalDesktop").src = source;
}

//icon-heart-interações
function mudarcor(e) {
  if (e.className == "azul") {
    e.className = "vermelho";
  } else {
    e.className = "azul";
  }
}


function visibility1D() {
  var x = document.getElementById("myDIVD");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function Hidden1D() {
  var x = document.getElementById("myDIVD");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
}


function visibility2D() {
  var x = document.getElementById("myDIV2D");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function Hidden2D() {
  var x = document.getElementById("myDIV2D");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
}

function visibility3D() {
  var x = document.getElementById("myDIV3D");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function Hidden3D() {
  var x = document.getElementById("myDIV3D");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
}

function visibility4D() {
  var x = document.getElementById("myDIV4D");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function Hidden4D() {
  var x = document.getElementById("myDIV4D");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
}

function visibility5D() {
  var x = document.getElementById("myDIV5D");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function Hidden5D() {
  var x = document.getElementById("myDIV5D");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
}

function visibility6D() {
  var x = document.getElementById("myDIV6D");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function Hidden6D() {
  var x = document.getElementById("myDIV6D");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
}

function visibility7D() {
  var x = document.getElementById("myDIV7D");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function Hidden7D() {
  var x = document.getElementById("myDIV7D");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
}

function visibility8D() {
  var x = document.getElementById("myDIV8D");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function Hidden8D() {
  var x = document.getElementById("myDIV8D");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
}

function visibility9D() {
  var x = document.getElementById("myDIV9D");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function Hidden9D() {
  var x = document.getElementById("myDIV9D");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
}

// denuncia ------------------------------------------------------------

function AbrirDenunciar() {
  var popup = document.getElementById("hide-denuncia-Desktop");

  if (popup.style.display === "block") {
    popup.style.display = "none";
  } else {
    popup.style.display = "block";
  }
}

document.getElementById("fechar-pop-up-denuncia").addEventListener("click", AbrirDenunciar);

document.addEventListener('DOMContentLoaded', () => {
  const ratingContainer = document.getElementById('rating-container');
  const asideElement = document.querySelector('.estrelas_culinaria');
  const conteudoId = asideElement.dataset.conteudoId; // Pega o conteudo_id
  const categoriasId = asideElement.dataset.categoriasId; // Pega o categorias_id
  const clientesId = asideElement.dataset.userId; // Substitua pelo ID do cliente logado

  console.log(conteudoId + " e " + categoriasId + " e " + clientesId);

  ratingContainer.addEventListener('change', async (event) => {
    const nota = event.target.value;
    if (nota) {
      try {
        const response = await fetch('/avaliar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            conteudo_id: conteudoId,
            nota: nota,
            clientes_id: clientesId,
            categorias_id: categoriasId
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Avaliação enviada com sucesso:', result);
        } else if (!response.ok) {
          const errorData = await response.json(); // Tente obter a resposta de erro
          console.error('Erro ao enviar avaliação:', errorData);
        }
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
    }
  });
});