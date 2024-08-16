function modalpergunta() {
    const openModalButton = document.querySelector("#open-pergunta");
    const closeModalButton = document.querySelector("#close-modal-pergunta");
    const modalElement = document.querySelector("#modal-pergunta");
    const fadeElement = document.querySelector("#fade-pergunta");

    modalElement.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    const openModal = () => {
        modalElement.classList.remove("hide");
        fadeElement.classList.remove("hide");
    };

    const closeModal = () => {
        modalElement.classList.add("hide");
        fadeElement.classList.add("hide");
    };

    openModalButton.addEventListener("click", openModal);
    closeModalButton.addEventListener("click", closeModal);
    fadeElement.addEventListener("click", closeModal);
}

document.addEventListener("DOMContentLoaded", function () {
    modalpergunta();
});

function dropdownpergunta(action) {
    var dropdownElement = document.getElementsByClassName('dropdown-perguntar-categoria')[0];
    var displayValues = ['block', 'none'];
    dropdownElement.style.display = displayValues[action];
}

function perguntar(c){
    var inputElement = document.querySelector('.dialogoselect-perguntar-categoria');
    var itemElement = document.getElementById('item-perguntar-categoria-' + c);

    inputElement.classList.remove('categoria-culinaria', 'categoria-limpeza', 'categoria-bemestar');

    switch (c) {
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

    inputElement.value = itemElement.innerText;
}

function adicionarMensagempgt() {
    const inputText = document.getElementById('input-text-subcategoria-pgt');
    const messageList = document.getElementById('messageListpgt');

    // Obter o valor do input
    const inputValue = inputText.value.trim();

    // Verificar se o valor não está vazio
    if (inputValue !== '') {
        // Criar um novo elemento de article para exibir a mensagem
        const messageDiv = document.createElement('article');
        messageDiv.id = 'etiqueta-subcategoria-pgt';
        messageDiv.textContent = inputValue;
        messageDiv.style.paddingLeft = '3%';
        messageDiv.style.paddingRight = '3%';

        // Adicionar article à lista de mensagens
        messageList.appendChild(messageDiv);

        // Limpar o valor do input
        inputText.value = '';
        
        messageDiv.addEventListener("click", function () {
        messageDiv.remove();
    })
    }
    
}