const veja_mais = document.getElementsByClassName("Veja-Mais");
const urlDaPagina = window.location.href;

const RodapeVejaMais = () => {
    if(urlDaPagina.includes('/bigodes-de-ouro') || urlDaPagina.includes('/login')){
        console.log("oii");
        for (let i = 0; i < veja_mais.length; i++) {
            const elemento = veja_mais[i];

            elemento.style.display = "none";
        }
    } else{
    }
};

function notify(titulo, texto, tipo, posicao,duracao=3000) {
    new Notify({
        status: tipo,
        title: titulo,
        text:texto,
        effect: 'fade',
        speed: 500,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: duracao,
        gap: 20,
        distance: 20,
        type: 1,
        position:posicao 
    })
}

RodapeVejaMais();