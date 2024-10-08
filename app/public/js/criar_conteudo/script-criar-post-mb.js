const btnVoltar = document.getElementById('btnVoltar-mb');
const btnAvancar = document.getElementById('btnAvancar-mb');
const artigos = document.querySelectorAll('.tarefa-mb');
const progresso = document.getElementById('progresso-mb');

let currentIndex = 0;

function mostrarArtigo(index) {
    artigos.forEach((artigo) => {
        artigo.classList.remove('ativo');
    });

    artigos[index].classList.add('ativo');

    // Atualiza a largura da linha de progresso
    const progressoWidth = ((index + 1) / artigos.length) * 100;
    progresso.style.width = progressoWidth + "%";
}

btnAvancar.addEventListener('click', () => {
    if (currentIndex < artigos.length - 1) {
        currentIndex++;
        mostrarArtigo(currentIndex);
    }
});

btnVoltar.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        mostrarArtigo(currentIndex);
    }
});

mostrarArtigo(currentIndex);


// document.addEventListener("DOMContentLoaded", function () {
//     const itens = document.querySelectorAll(".tarefa-mb");
//     const progresso = document.getElementById("progresso-mb");
//     const btnAvancar = document.getElementById("btnAvancar-mb");
//     const btnVoltar = document.getElementById("btnVoltar-mb");
//     const conteudos = document.querySelectorAll(".conteudo-mb");

//     let currentIndex = 0;

//     function handleItemClick(event) {
//         currentIndex = Array.from(itens).indexOf(event.target);
//         // Remova a classe 'ativo' de todos os botões de tarefa
//         itens.forEach(function (item) {
//             item.classList.remove("ativo");
//         });
//         // Adicione a classe 'ativo' ao botão de tarefa atual
//         event.target.classList.add("ativo");

//         // Define a largura da linha de progresso para corresponder ao botão atual
//         const itemWidth = 100 / itens.length;
//         const progressoWidth = itemWidth * (itens.length - (currentIndex + 1)); // Calcula a largura do progresso de trás para frente
//         progresso.style.width = progressoWidth + "%";

//         // Altera o nome do botão "Avançar" para "Criar Post" na Tarefa 3
//         if (currentIndex === 2) {
//             btnAvancar.innerText = "CRIAR DICA";
//         } else {
//             btnAvancar.innerText = "PRÓXIMA ETAPA...";
//         }

//         // Mostrar ou ocultar o botão de voltar com base na posição atual
//         if (currentIndex === 0) {
//             btnVoltar.style.display = "none";
//         } else {
//             btnVoltar.style.display = "block";
//         }

//         // Oculta todos os conteúdos de tarefas
//         conteudos.forEach(function (conteudo, index) {
//             if (index < currentIndex) {
//                 conteudo.style.transform = "translateX(-100%)"; // Esconde à esquerda
//             } else if (index === currentIndex) {
//                 conteudo.style.transform = "translateX(0%)"; // Mostra o conteúdo atual
//             } else {
//                 conteudo.style.transform = "translateX(100%)"; // Esconde à direita
//             }
//         });
//     }

//     // Adiciona um ouvinte de evento de clique ao botão "Avançar"
//     btnAvancar.addEventListener("click", function () {
//         const nextIndex = currentIndex + 1;
//         if (nextIndex < itens.length) {
//             handleItemClick({ target: itens[nextIndex] });
//         }
//     });

//     // Adiciona um ouvinte de evento de clique ao botão "Voltar"
//     btnVoltar.addEventListener("click", function () {
//         const prevIndex = currentIndex - 1;
//         if (prevIndex >= 0) {
//             handleItemClick({ target: itens[prevIndex] });
//         }
//     });

//     // Inicialmente, definir a largura da linha de progresso e mostrar o conteúdo da Tarefa 1
//     handleItemClick({ target: itens[currentIndex] });
// });

function categor(categorId) {
    var inputElement = document.querySelector('.dialogoselect-mb');
    var itemElement = document.getElementById('item-select-detalhes-mb-' + categorId);
    const section = document.getElementById('tempo-detalhes-porcoes-mb');

    if (!itemElement) {
        console.error('Categoria não encontrada para o ID: ' + categorId);
        return;
    }

    inputElement.classList.remove('categoria-culinaria', 'categoria-limpeza', 'categoria-bemestar');

    switch (categorId) {
        case 1:
            inputElement.classList.add('categoria-culinaria');
            section.style.display = 'flex'; // Exibe a section
            break;
        case 2:
            inputElement.classList.add('categoria-limpeza');
            section.style.display = 'none';  // Oculta a section
            break;
        case 3:
            inputElement.classList.add('categoria-bemestar');
            section.style.display = 'none';  // Oculta a section
            break;
        default:
            console.warn('ID de categoria inválido: ' + categorId);
            return;
    }

    inputElement.placeholder = itemElement.innerText;

    inputElement.value = '';

}

document.addEventListener("DOMContentLoaded", function () {
    const inputSelect = document.getElementById("dialogoselect-mb");
    const dropdownMenu = document.getElementById("dropdown-mb");
    const categoryItems = document.querySelectorAll(".item-select-detalhes-mb");

    // Evento para abrir/fechar o dropdown ao clicar no input
    inputSelect.addEventListener("click", function () {
        // Alterna o display do dropdown (mostra ou oculta)
        dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
    });

    // Evento para selecionar uma categoria
    categoryItems.forEach(item => {
        item.addEventListener("click", function () {
            const selectedCategory = item.getAttribute("data-category");
            inputSelect.value = selectedCategory; // Atualiza o valor do input com a categoria selecionada
            dropdownMenu.style.display = "none"; // Fecha o dropdown após a seleção
        });
    });

    // Fecha o dropdown ao clicar fora do mesmo
    document.addEventListener("click", function (event) {
        if (!inputSelect.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});


function adicionarMensagem() {
    const inputText = document.getElementById('input-text-subcategoria-mb');
    const messageList = document.getElementById('messageList-mb');

    // Obter o valor do input
    const inputValue = inputText.value.trim();

    // Verificar se o valor não está vazio
    if (inputValue !== '') {
        // Criar um novo elemento de div para exibir a mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = 'div-etiqueta-subcategoria-mb';
        messageDiv.textContent = inputValue;

        // Adicionar a div à lista de mensagens
        messageList.appendChild(messageDiv);

        // Limpar o valor do input
        inputText.value = '';

        // Atualizar o campo oculto
        atualizarCampoOculto();

        // Adicionar evento de clique para remover a subcategoria
        messageDiv.addEventListener("click", function () {
            messageDiv.remove();
            atualizarCampoOculto();
        });
    }
}

function atualizarCampoOculto() {
    const messageList = document.getElementById('messageList-mb');
    const hiddenInput = document.getElementById('dica_subcategorias-mb');

    // Obter todas as subcategorias da lista
    const subcategorias = Array.from(messageList.getElementsByClassName('div-etiqueta-subcategoria-mb'))
        .map(div => div.textContent.trim());

    // Atualizar o valor do campo oculto
    hiddenInput.value = subcategorias.join(', ');
}

window.onload = function () {

    // Check File API support
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

var contadorDivs = 0;

function duplicarDiv() {
    var divOriginal = document.getElementById('ingredientes-elementos-mb');
    var clone = divOriginal.cloneNode(true);
    contadorDivs++;
    clone.id = "ingredientes-elementos-mb-" + contadorDivs;
    document.getElementById('clonados-ou-nao-mb').appendChild(clone);
    atualizarNumeracaoIngredientes()

}

function apagarDiv(element) {
    var parent = element.parentNode;
    if (parent.id !== 'ingredientes-elementos-mb') {
        parent.parentNode.removeChild(parent);
        atualizarNumeracaoIngredientes()
    }
}

function atualizarNumeracaoIngredientes() {
    var divs = document.querySelectorAll('[id^="ingredientes-mb-"]');
    divs.forEach(function (div, index) {
        var numeroDoIngrediente = div.querySelector("#numero-do-ingrediente-mb");
        if (numeroDoIngrediente) {
            numeroDoIngrediente.innerText = index + 1;
        }
    });
}

//botoes de criar e tirar modo de preparo

document.getElementById("botao-de-add-modo-mb").addEventListener("click", function () {
    duplicarDivModo();
});

document.getElementById("botao-de-tirar-modo-mb").addEventListener("click", function () {
    var element = this.parentNode;
    apagarDivModo(element);
});

var contadorDivsModo = 0;

function duplicarDivModo() {
    var divOriginal = document.getElementById('modo-de-preparo-mb');
    var clone = divOriginal.cloneNode(true);
    contadorDivsModo++;
    clone.id = "modo-de-preparo-mb-" + contadorDivsModo;
    document.getElementById('tudo-dos-clones-mb').appendChild(clone);
    atualizarNumeracao();
}

function apagarDivModo(element) {
    var parent = element.parentNode;
    if (parent.id !== 'modo-de-preparo-mb') {
        parent.parentNode.removeChild(parent);
        atualizarNumeracao();
    }
}

function atualizarNumeracao() {
    var divs = document.querySelectorAll('[id^="modo-de-preparo-mb-"]');
    divs.forEach(function (div, index) {
        var numeroDoModo = div.querySelector("#numero-do-modo-de-preparo-mb");
        if (numeroDoModo) {
            numeroDoModo.value = index + 1;
        }
    });
}
