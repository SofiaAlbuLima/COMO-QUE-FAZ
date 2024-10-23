const btnVoltar = document.getElementById('btnVoltar-mb'); 
const btnAvancar = document.getElementById('btnAvancar-mb');
const artigos = document.querySelectorAll('.tarefa-mb');
const progresso = document.getElementById('progresso-mb');
const form = document.getElementById('form-criar-mb'); // Pegue o formulário se ele existir na página

let currentIndex = 0;

function mostrarArtigo(index) {
    artigos.forEach((artigo) => {
        artigo.classList.remove('ativo');
    });

    artigos[index].classList.add('ativo');

    // Atualiza a largura da linha de progresso
    const itemWidth = 100 / artigos.length;
    const progressoWidth = itemWidth * (artigos.length - (currentIndex + 1)); 
    progresso.style.width = progressoWidth + "%";

    // Se estiver no último artigo, muda o texto do botão para "CRIAR DICA"
    if (currentIndex === artigos.length - 1) {
        btnAvancar.innerText = "CRIAR DICA";
    } else {
        btnAvancar.innerText = "PRÓXIMA ETAPA...";
    }
}

btnAvancar.addEventListener('click', () => {
    if (currentIndex < artigos.length - 1) {
        currentIndex++;
        mostrarArtigo(currentIndex);
    } else {
        // Caso esteja no último artigo, envie o formulário
        form.submit(); // Submete o formulário
    }
});

btnVoltar.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        mostrarArtigo(currentIndex);
    }
});
mostrarArtigo(currentIndex);

function adicionarMensagemmb() {
    const inputText = document.getElementById('input-text-subcategoria-mb');
    const messageList = document.getElementById('messageList-mb');

    const inputValue = inputText.value.trim();

    if (inputValue !== '') {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'div-etiqueta-subcategoria-mb';
        messageDiv.textContent = inputValue;

        messageList.appendChild(messageDiv);

        inputText.value = '';

        atualizarCampoOculto();

        messageDiv.addEventListener("click", function () {
            messageDiv.remove();
            atualizarCampoOculto();
        });
    }
}

function atualizarCampoOculto() {
    const messageList = document.getElementById('messageList-mb');
    const hiddenInput = document.getElementById('dica_subcategorias-mb');

    const subcategorias = Array.from(messageList.getElementsByClassName('div-etiqueta-subcategoria-mb'))
        .map(div => div.textContent.trim());

    hiddenInput.value = subcategorias.join(', ');
}

//botoes de criar e tirar ingredientes

document.getElementById("botao-de-add-ingrediente-mb").addEventListener("click", function () {
    duplicarDiv();
});

document.getElementById("botao-de-tirar-ingrediente-mb").addEventListener("click", function () {
    var element = this.parentNode;
    apagarDiv(element);
});

function dropdownmedidas(p) {
    var dropdownElement = document.querySelector('.dropDown-medidas-mb');
    dropdownElement.style.display = p === 0 ? 'block' : 'none';
}

var medidasElemento = document.getElementById('medidas-elementos-mb');
medidasElemento.addEventListener('focus', function () {
    dropdownmedidas(0);
});

medidasElemento.addEventListener('blur', function () {
    dropdownmedidas(1);
});

function qmedidas(pega) {
    var oitemedidas = document.getElementById('itemedidas-mb-' + pega).innerText;
    document.getElementById('medidas-elementos-mb').value = oitemedidas;
}
var contadorDivs = 1; // O primeiro já conta, então começamos com 1

function duplicarDivmb() {
    var divOriginal = document.getElementById('ingredientes-elementos-mb');
    var clone = divOriginal.cloneNode(true); // Clona o elemento
    contadorDivs++; // Incrementa o contador de divs

    // Atualiza o ID da div clonada
    clone.id = "ingredientes-elementos-mb-" + contadorDivs;
    
    // Limpa o campo de input do ingrediente e ajusta o número
    var numeroDoIngrediente = clone.querySelector("#numero-do-ingrediente-mb");
    if (numeroDoIngrediente) {
        numeroDoIngrediente.innerText = contadorDivs; // Atualiza o número do ingrediente
    }
    
    clone.querySelector('#input-nome-do-ingrediente-mb').value = ''; // Limpa o nome do ingrediente
    clone.querySelector('#input-quantidade-do-ingrediente-mb').value = ''; // Limpa a quantidade

    // Adiciona o clone ao container
    document.getElementById('clonados-ou-nao-mb').appendChild(clone);

    atualizarNumeracaoIngredientes(); // Atualiza a numeração de todos os ingredientes
}

function apagarDivmb(element) {
    var parent = element.closest('article'); // Pegamos o elemento pai "article"
    
    // Verifica se o elemento pai é o ingrediente original
    if (parent && parent.id !== 'ingredientes-elementos-mb') {
        parent.parentNode.removeChild(parent); // Remove o clone
        atualizarNumeracaoIngredientes(); // Atualiza a numeração após apagar
    }
    // Se for o original (id = 'ingredientes-elementos-mb'), não faz nada.
}

function atualizarNumeracaoIngredientes() {
    var divs = document.querySelectorAll('[id^="ingredientes-elementos-mb"], [id^="ingredientes-elementos-mb-"]'); // Inclui o original e os clones
    divs.forEach(function (div, index) {
        var numeroDoIngrediente = div.querySelector("#numero-do-ingrediente-mb");
        if (numeroDoIngrediente) {
            numeroDoIngrediente.innerText = index + 1; // Atualiza o número do ingrediente para cada clone
        }
    });
}

// No carregamento da página, já numeramos o primeiro ingrediente
document.addEventListener('DOMContentLoaded', function() {
    atualizarNumeracaoIngredientes();
});


//----------------------------------------------------------------------------------------------botoes de criar e tirar modo de preparo

// Muda o evento para o container dos clones
document.getElementById('tudo-dos-clones-mb').addEventListener("click", function (event) {
    if (event.target && event.target.matches("#apagar-modo-de-preparo-mb")) {
        var elementmb = event.target.closest('section'); // Pega o elemento pai mais próximo
        apagarDivModombmb(elementmb);
    }
});

var contadorDivsModombmb = 1; // Contador começa em 1, pois já existe o primeiro modo de preparo

function duplicarDivModombmb() {
    var divOriginalmb = document.getElementById('modo-de-preparo-mb');
    
    if (divOriginalmb) {
        var clonemb = divOriginalmb.cloneNode(true); 
        
        contadorDivsModombmb++;
        
        clonemb.id = "modo-de-preparo-mb-" + contadorDivsModombmb; 
        clonemb.style.marginLeft = '5vw';

        var textarea = clonemb.querySelector('input[name="etapas_modo_preparo"]');
        if (textarea) {
            textarea.value = ''; 
        }

        var numeroDoModombmb = clonemb.querySelector("#numero-do-modo-de-preparo-mb");
        if (numeroDoModombmb) {
            numeroDoModombmb.value = contadorDivsModombmb;
        }

        var botaoApagar = clonemb.querySelector("#apagar-modo-de-preparo-mb");
        if (botaoApagar) {
            botaoApagar.style.display = 'inline-block'; 
            botaoApagar.onclick = function(event) {
                event.stopPropagation(); 
                apagarDivModombmb(clonemb); 
            };
        }

        // Adiciona o clone ao container
        document.getElementById('tudo-dos-clones-mb').appendChild(clonemb);

        atualizarNumeracaombmb(); // Atualiza a numeração de todos os modos de preparo
    }
}

function apagarDivModombmb(elementmb) {
    // Verifica se o elemento a ser removido é um clone (não é o original)
    if (elementmb && elementmb.id !== 'modo-de-preparo-mb') {
        elementmb.parentNode.removeChild(elementmb); // Remove o clone
        atualizarNumeracaombmb(); // Atualiza a numeração após apagar
    }
}

function atualizarNumeracaombmb() {
    var divsmb = document.querySelectorAll('[id^="modo-de-preparo-mb-"], [id="modo-de-preparo-mb"]');
    
    divsmb.forEach(function (divmb, indexmb) {
        var numeroDoModombmb = divmb.querySelector("#numero-do-modo-de-preparo-mb");
        if (numeroDoModombmb) {
            numeroDoModombmb.value = indexmb + 1; // Atualiza a numeração corretamente
        }
    });
}

// Já numeramos o primeiro modo de preparo ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    atualizarNumeracaombmb();
});

// Função para pegar os parâmetros da URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        perguntaId: params.get('perguntaId'),
        perguntaTitulo: params.get('perguntaTitulo')
    };
}

window.onload = function() {
    // Função de obter parâmetros da URL e atualizar o título
    const { perguntaId, perguntaTitulo } = getQueryParams();
    if (perguntaTitulo) {
        document.getElementById('titulo-criar-post-mb').innerText = `CRIAR PATINHA: ${perguntaTitulo}`;
    }

    // Função para lidar com o File API
    if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById("files-mb");
        var output = document.getElementById("result-mb");
        var retanguloAdicionarMidia = document.getElementById("retangulo-adicionar-midia-mb");

        retanguloAdicionarMidia.addEventListener("click", function () {
            filesInput.click(); // Clique no input de arquivo
        });

        filesInput.addEventListener("change", function (event) {
            var files = event.target.files; // FileList object

            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // Only pics
                if (!file.type.match('image')) continue;

                var picReader = new FileReader();

                picReader.addEventListener("load", function (event) {
                    var picFile = event.target;
                    var thumbnailContainer = document.createElement("div");
                    thumbnailContainer.className = "thumbnail-container-mb";

                    var closeButton = document.createElement("span");
                    closeButton.className = "close-button-mb";
                    closeButton.innerHTML = "X";

                    closeButton.addEventListener("click", function () {
                        thumbnailContainer.remove();
                    });

                    var thumbnail = document.createElement("img");
                    thumbnail.className = 'thumbnail-mb';
                    thumbnail.src = picFile.result;
                    thumbnail.title = picFile.name;

                    thumbnailContainer.appendChild(thumbnail);
                    thumbnailContainer.appendChild(closeButton);
                    output.appendChild(thumbnailContainer);
                });

                // Read the image
                picReader.readAsDataURL(file);
            }
        });
    } else {
        console.log("Your browser does not support File API");
    }
};
