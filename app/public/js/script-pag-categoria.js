document.addEventListener('DOMContentLoaded', function() {
    const urlAtual = window.location.href;
    const linkEspecifico = [
        '/culinaria',
        '/limpeza',
        '/bem-estar'
    ];
    if (urlAtual === linkEspecifico) {
        filtrosCategoria();
        configureLongPress('post-dispensa-fileira2', 'longpress-post-dispensa-fileira2', 'descri-post-dispensa-fileira2');
    }
});

function filtrosCategoria() {
const fcutodasElList = document.querySelectorAll('.filtrocu button');
const filtro = urlParams.get('filtro') || 'em-alta'; // Define 'em-alta' como padrão


fcutodasElList.forEach(Option => {
    Option.addEventListener('click', () => {
        limpar();
        Option.classList.add('clicado');df
    });
});

limpar = () => {
    fcutodasElList.forEach(Option => {
        Option.classList.remove('clicado');
    })
}
}


//filtro subcategorias--------------------------------------------------------------//
function category(c) {
    var item = document.getElementById('item-'+c).innerHTML;
    document.getElementsByTagName('input')[0].value = item;
}

function focado(){
    document.getElementsByClassName('dropDown')[0].style.display="block";
    document.getElementById('seta').style.transform="rotateX(0deg)";
}
function desfoque(){
    document.getElementsByClassName('dropDown')[0].style.display="none"
    document.getElementById('seta').style.transform="rotateX(180deg)";
}
