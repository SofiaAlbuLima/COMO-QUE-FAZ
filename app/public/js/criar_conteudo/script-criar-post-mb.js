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

// Exibe o primeiro artigo ao carregar a página
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
