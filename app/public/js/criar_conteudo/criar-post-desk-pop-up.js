function setupModal() {
    const openModalButton = document.querySelector("#open-modal");
    const closeModalButton = document.querySelector("#close-modal-criar-post");
    const modalElement = document.querySelector("#modal-criar-post");
    const fadeElement = document.querySelector("#fade-atras-cp");

    modalElement.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    const toggleModal = () => {
        modalElement.classList.toggle("hidden");
        fadeElement.classList.toggle("hidden");
    };

    [openModalButton, closeModalButton, fadeElement].forEach((el) => {
        el.addEventListener("click", () => toggleModal());
    });
}

document.addEventListener("DOMContentLoaded", function () {
    setupModal();
});

document.addEventListener("DOMContentLoaded", function () {
    const itens = document.querySelectorAll(".tarefa");
    const progresso = document.getElementById("progresso");
    const btnAvancar = document.getElementById("btnAvancar");
    const btnVoltar = document.getElementById("btnVoltar");
    const conteudos = document.querySelectorAll(".conteudo");

    let currentIndex = 0;

    function handleItemClick(event) {
        currentIndex = Array.from(itens).indexOf(event.target);
        // Remova a classe 'ativo' de todos os botões de tarefa
        itens.forEach(function (item) {
            item.classList.remove("ativo");
        });
        // Adicione a classe 'ativo' ao botão de tarefa atual
        event.target.classList.add("ativo");

        // Define a largura da linha de progresso para corresponder ao botão atual
        const itemWidth = 100 / itens.length;
        const progressoWidth = itemWidth * (itens.length - (currentIndex + 1)); // Calcula a largura do progresso de trás para frente
        progresso.style.width = progressoWidth + "%";

        // Altera o nome do botão "Avançar" para "Criar Post" na Tarefa 3
        if (currentIndex === 2) {
            btnAvancar.innerText = "CRIAR DICA";
            btnAvancar.type = "submit"; 
            btnAvancar.classList.remove("Avancar"); 
            btnAvancar.classList.add("submit-criar-conteudo"); 
        } else {
            btnAvancar.innerText = "PRÓXIMA ETAPA...";
            btnAvancar.type = "button"; 
            btnAvancar.classList.remove("submit-criar-conteudo"); 
            btnAvancar.classList.add("Avancar"); 
        }

        // Mostrar ou ocultar o botão de voltar com base na posição atual
        if (currentIndex === 0) {
            btnVoltar.style.display = "none";
        } else {
            btnVoltar.style.display = "block";
        }

        // Oculta todos os conteúdos de tarefas
        conteudos.forEach(function (conteudo, index) {
            if (index < currentIndex) {
                conteudo.style.transform = "translateX(-100%)"; // Esconde à esquerda
            } else if (index === currentIndex) {
                conteudo.style.transform = "translateX(0%)"; // Mostra o conteúdo atual
            } else {
                conteudo.style.transform = "translateX(100%)"; // Esconde à direita
            }
        });
    }

    // Adiciona um ouvinte de evento de clique ao botão "Avançar"
    btnAvancar.addEventListener("click", function (e) {
        const nextIndex = currentIndex + 1;
        if (nextIndex < itens.length) {
            e.preventDefault();
            handleItemClick({ target: itens[nextIndex] });
        }
    });

    // Adiciona um ouvinte de evento de clique ao botão "Voltar"
    btnVoltar.addEventListener("click", function () {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            handleItemClick({ target: itens[prevIndex] });
        }
    });

    // Inicialmente, definir a largura da linha de progresso e mostrar o conteúdo da Tarefa 1
    handleItemClick({ target: itens[currentIndex] });
});
function category(categoryId) {
    // Obtenha uma referência ao elemento de entrada
    var inputElement = document.querySelector('.dialogoselect');
    var itemElement = document.getElementById('item-select-detalhes-' + categoryId);

    // Remova a classe existente (se houver)
    inputElement.classList.remove('categoria-culinaria', 'categoria-limpeza', 'categoria-bemestar');

    // Adicione a classe com base no categoryId
    switch (categoryId) {
        case 1:
            inputElement.classList.add('categoria-culinaria');
            break;
        case 2:
            inputElement.classList.add('categoria-limpeza');
            break;
        case 3:
            inputElement.classList.add('categoria-bemestar');
            break;
    }

    // Atualize o valor do input com base no item selecionado
    inputElement.value = itemElement.innerText;
    mostrarElementoCulinaria();
}


function dropdown(action) {
    var dropdownElement = document.getElementsByClassName('dropDown')[0];
    var displayValues = ['block', 'none'];
    dropdownElement.style.display = displayValues[action];
}

function adicionarMensagem() {
    const inputText = document.getElementById('input-text-subcategoria');
    const messageList = document.getElementById('messageList');

    // Obter o valor do input
    const inputValue = inputText.value.trim();

    // Verificar se o valor não está vazio
    if (inputValue !== '') {
        // Criar um novo elemento de div para exibir a mensagem
        const messageDiv = document.createElement('div');
        messageDiv.id = 'div-etiqueta-subcategoria';
        messageDiv.textContent = inputValue;
        messageDiv.style.paddingLeft = '3%';
        messageDiv.style.paddingRight = '3%';

        // Adicionar a div à lista de mensagens
        messageList.appendChild(messageDiv);

        // Limpar o valor do input
        inputText.value = '';
        
        messageDiv.addEventListener("click", function () {
        messageDiv.remove();
    })
    }
    
}

window.onload = function () {

    // Check File API support
    if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById("files");
        var output = document.getElementById("result");
        var retanguloAdicionarMidia = document.getElementById("retangulo-adicionar-midia");

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
                    thumbnailContainer.className = "thumbnail-container";

                    var closeButton = document.createElement("span");
                    closeButton.className = "close-button";
                    closeButton.innerHTML = "X";

                    closeButton.addEventListener("click", function () {
                        thumbnailContainer.remove();
                    });

                    var thumbnail = document.createElement("img");
                    thumbnail.className = 'thumbnail';
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

document.getElementById("botao-de-add-ingrediente").addEventListener("click", function () {
    duplicarDiv();
});

document.getElementById("botao-de-tirar-ingrediente").addEventListener("click", function () {
    var element = this.parentNode;
    apagarDiv(element);
});


function dropdownmedidas(p) {
    var dropdownElement = document.querySelector('.dropDown-medidas');
    dropdownElement.style.display = p === 0 ? 'block' : 'none';
}

var medidasElemento = document.getElementById('medidas-elementos');
medidasElemento.addEventListener('focus', function () {
    dropdownmedidas(0);
});

medidasElemento.addEventListener('blur', function () {
    dropdownmedidas(1);
});
function qmedidas(pega) {
    var oitemedidas = document.getElementById('itemedidas-' + pega).innerText;
    document.getElementById('medidas-elementos').value = oitemedidas;
}

var contadorDivs = 0;

function duplicarDiv() {
    var divOriginal = document.getElementById('ingredientes-elementos');
    var clone = divOriginal.cloneNode(true);
    contadorDivs++;
    clone.id = "ingredientes-elementos-" + contadorDivs;
    document.getElementById('clonados-ou-nao').appendChild(clone);
    atualizarNumeracaoIngredientes()

}

function apagarDiv(element) {
    var parent = element.parentNode;
    if (parent.id !== 'ingredientes-elementos') {
        parent.parentNode.removeChild(parent);
        atualizarNumeracaoIngredientes()
    }
}

function atualizarNumeracaoIngredientes() {
    var divs = document.querySelectorAll('[id^="ingredientes-"]');
    divs.forEach(function (div, index) {
        var numeroDoIngrediente = div.querySelector("#numero-do-ingrediente");
        if (numeroDoIngrediente) {
            numeroDoIngrediente.innerText = index + 1;
        }
    });
}

//botoes de criar e tirar modo de preparo

document.getElementById("botao-de-add-modo").addEventListener("click", function () {
    duplicarDivModo();
});

document.getElementById("botao-de-tirar-modo").addEventListener("click", function () {
    var element = this.parentNode;
    apagarDivModo(element);
});

var contadorDivsModo = 0;

function duplicarDivModo() {
    var divOriginal = document.getElementById('modo-de-preparo');
    var clone = divOriginal.cloneNode(true);
    contadorDivsModo++;
    clone.id = "modo-de-preparo-" + contadorDivsModo;
    document.getElementById('tudo-dos-clones').appendChild(clone);
    atualizarNumeracao();
}

function apagarDivModo(element) {
    var parent = element.parentNode;
    if (parent.id !== 'modo-de-preparo') {
        parent.parentNode.removeChild(parent);
        atualizarNumeracao();
    }
}

function atualizarNumeracao() {
    var divs = document.querySelectorAll('[id^="modo-de-preparo-"]');
    divs.forEach(function (div, index) {
        var numeroDoModo = div.querySelector("#numero-do-modo-de-preparo");
        if (numeroDoModo) {
            numeroDoModo.value = index + 1;
        }
    });
}

function mostrarElementoCulinaria() {
    var input = document.getElementById("dialogoselect");
    var elemento = document.getElementById("tempo-detalhes-porcoes");

    // Verifica se uma opção foi selecionada
    if (input.className.includes("dialogoselect") && input.className.includes("categoria-culinaria")) {
        elemento.style.display = "block"; // Mostra o elemento
    } else {
        elemento.style.display = "none"; // Esconde o elemento se nenhuma opção estiver selecionada
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('a');
    const charCount = document.getElementById('b');
    const maxLength = textInput.maxLength;
    console.log("seilar ner");

    textInput.addEventListener('input', function() {
        const remaining = maxLength - textInput.value.length;
        charCount.textContent = `${remaining}/300`;
    });
});