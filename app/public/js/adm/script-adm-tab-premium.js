// Seleciona todas as abas
const tabs = document.querySelectorAll('.adm-tab-btn-premium');

// Define a função tabClicked
const tabClicked = (tab) => {
    // Seleciona todos os conteúdos
    const contents = document.querySelectorAll('.adm-content-premium');

    // Remove a classe 'show' de todos os conteúdos
    contents.forEach(content => content.classList.remove('show'));

    // Pega o id do conteúdo associado à aba clicada
    const contentid = tab.getAttribute('content-id');
    
    // Seleciona o conteúdo correspondente
    const content = document.getElementById(contentid);

    // Adiciona a classe 'show' ao conteúdo correspondente
    if (content) {
        content.classList.add('show');
    }

    // Remove a classe 'active-btn-premium' de todas as abas
    tabs.forEach(t => t.classList.remove('active-btn-premium'));

    // Adiciona a classe 'active-btn-premium' à aba clicada
    tab.classList.add('active-btn-premium');
}

// Adiciona o evento de clique a cada aba
tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));
