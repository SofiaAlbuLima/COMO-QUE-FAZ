document.addEventListener('DOMContentLoaded', function () {
    function updateCharCount(inputElement, counterElement) {
        const maxLength = inputElement.getAttribute('maxlength');
        inputElement.addEventListener('input', function () {
            const currentLength = inputElement.value.length;
            counterElement.textContent = `${currentLength}/${maxLength}`;
        });
    }

    const descricaoDetalhes = document.getElementById('descricao-detalhes');
    const descricaoCharCount = document.getElementById('b-descricao-detalhes');
    updateCharCount(descricaoDetalhes, descricaoCharCount);

    const tituloPostagem = document.getElementById('input-titulo-da-postagem');
    const tituloCharCount = document.getElementById('b-titulo-da-postagem');
    updateCharCount(tituloPostagem, tituloCharCount);
});

let etapaCount = 0;
function adicionarEtapa() {
    etapaCount++;
    const modoDePreparoDiv = document.getElementById('modo-de-preparo');
    const etapaDiv = document.createElement('article');
    etapaDiv.classList.add('etapa-' + etapaCount);
    etapaDiv.innerHTML = `
        <article class="step-passoApasso">
            <span id="arruma-numero-simbolo">
                <input type="text" id="numero-do-modo-de-preparo" placeholder="${etapaCount}"
                disabled="disabled">
                <h2 id="simbolo-do-numero">º</h2>
            </span>
            <input type="text" id="input-modo-de-preparo" placeholder="Descrição da etapa"
            name="etapas_modo_preparo">
            <button class="button-etapas" type="button" onclick="apagarEtapa(this)">X</button>
        </article>
    `;
    modoDePreparoDiv.appendChild(etapaDiv);
}

function apagarEtapa(button) {
    const etapaDiv = button.parentElement;
    etapaDiv.remove();
}

function adicionarIngrediente() {
    const container = document.getElementById('ingredientes-div');
    const numeroIngrediente = container.querySelectorAll('.ingrediente-article').length + 1;

    // Cria o artigo que conterá os ingredientes
    const novoIngrediente = document.createElement('article');
    novoIngrediente.className = 'ingrediente-article';

    // Cria a estrutura do HTML para os ingredientes
    novoIngrediente.innerHTML = `
        <section id="sem-a-linha-rosa">
            <article class="item-excluir">
                <h2 id="numero-do-ingrediente">${numeroIngrediente}º Item</h2>
                <img id="botao-de-tirar-ingrediente" src="/imagens/tirar-ingrediente.svg"
                alt="excluir ingrediente" onclick="removerIngrediente(this)">
            </article>
            <h4 id="nome-do-ingrediente">Nome do ingrediente</h4>
            <input type="text" id="input-nome-do-ingrediente" placeholder="FARINHA DE TRIGO" name="ingredientes">
            <div id="coiso-pra-deixar-certo">
                <section id="quantidade-elementos">
                    <h4 id="nome-do-ingrediente">Quantidade/Peso</h4>
                    <input type="text" id="input-quantidade-do-ingrediente" placeholder="01" name="quantidade_ingredientes">
                </section>
                <section id="guardar-medidas-elementos">
                    <h4 id="nome-do-ingrediente">Medida</h4>
                    <select name="medida_ingredientes" id="medidas-elementos">
                        <optgroup class="dropDown-medidas">
                            <option value="Nenhuma medida" class="item-medidas">Nenhuma medida</option>
                            <option value="Unidade" class="item-medidas">Unidade</option>
                            <option value="Xícara" class="item-medidas">Xícara</option>
                            <option value="Colher de sopa" class="item-medidas">Colher de sopa</option>
                            <option value="Colher de chá" class="item-medidas">Colher de chá</option>
                            <option value="Copo americano" class="item-medidas">Copo americano</option>
                            <option value="Gramas (gr)" class="item-medidas">Gramas (gr)</option>
                            <option value="Quilogramas (kg)" class="item-medidas">Quilogramas (kg)</option>
                            <option value="Mililitros (ml)" class="item-medidas">Mililitros (ml)</option>
                            <option value="Litros (L)" class="item-medidas">Litros (L)</option>
                        </optgroup>
                    </select>
                </section>
            </div>
        </section>
    `;

    // Adiciona o novo ingrediente ao container
    container.appendChild(novoIngrediente);
}

function removerIngrediente(element) {
    const container = document.getElementById('ingredientes-div');

    // Remove o ingrediente clicado, incluindo "sem-a-linha-rosa" que está dentro do 'ingrediente-article'
    const articleToRemove = element.closest('.ingrediente-article');
    if (articleToRemove) {
        articleToRemove.remove();
    }

    // Reajusta os números dos ingredientes restantes
    const remainingSections = container.querySelectorAll('.ingrediente-article');
    remainingSections.forEach((section, index) => {
        section.querySelector('#numero-do-ingrediente').textContent = (index + 1) + "º Item";
    });

    // Verifica se não há mais ingredientes e, se necessário, adiciona um novo
    if (remainingSections.length === 0) {
        adicionarIngrediente();
    }
}

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
    const hiddenInput = document.getElementById('dica_subcategorias');

    // Obter o valor do input
    const inputValue = inputText.value.trim();

    // Verificar se o valor não está vazio
    if (inputValue !== '') {
        // Criar um novo elemento de div para exibir a mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = 'div-etiqueta-subcategoria';
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
    const messageList = document.getElementById('messageList');
    const hiddenInput = document.getElementById('dica_subcategorias');

    // Obter todas as subcategorias da lista
    const subcategorias = Array.from(messageList.getElementsByClassName('div-etiqueta-subcategoria'))
        .map(div => div.textContent.trim());

    // Atualizar o valor do campo oculto
    hiddenInput.value = subcategorias.join(', ');
}

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

function abrirModalCriarDica(perguntaId) {
    // Defina o valor do campo oculto com o ID da pergunta
    document.getElementById('pergunta_id').value = perguntaId;

    // Exibir o modal de criação de dica
    document.getElementById('modalCriarDica').style.display = 'block';

    // Mostrar mensagem personalizada
    document.getElementById('mensagemPergunta').innerText = 'Você está criando uma dica para a pergunta selecionada!';
}
