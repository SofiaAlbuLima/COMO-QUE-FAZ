const veja_mais = document.getElementsByClassName("Veja-Mais");
const urlDaPagina = window.location.href;

const RodapeVejaMais = () => {
    if(urlDaPagina.includes('/bigodes-de-ouro') || urlDaPagina.includes('/login') || urlDaPagina.includes('/cadastro')){
        for (let i = 0; i < veja_mais.length; i++) {
            const elemento = veja_mais[i];

            elemento.style.display = "none";
        }
    } else{
    }
};



RodapeVejaMais();