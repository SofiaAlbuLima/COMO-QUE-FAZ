function notify(titulo, texto, tipo, posicao,duracao=3000) {
    new Notify({
        status: tipo,
        title: titulo,
        text:texto.replace(/&lt;/g,"<").replace(/&gt;/g,">"),
        effect: 'fade',
        speed: 500,
        showIcon: true,
        showCloseButton: true,
        autoclose: false,
        autotimeout: duracao,
        gap: 20,
        distance: 20,
        type: 1,
        position:posicao 
    })
};

document.addEventListener('DOMContentLoaded', function() {
    const urlAtual = window.location.href;
    const linkEspecifico = '/login';

    if (urlAtual === linkEspecifico) {
        verificaConfirmaSenha();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let campoSenha = document.getElementById('senha1');
    let campoConfirmaSenha = document.getElementById('senha2');
    
    // Impede colar na senha
    campoSenha.addEventListener("paste", function(e) {
        e.preventDefault();
    });

    // Impede colar na confirmação de senha
    campoConfirmaSenha.addEventListener("paste", function(e) {
        e.preventDefault();
    });
});

function verificaConfirmaSenha() {
 
    let campoSenha = document.getElementById('senha1');
    let valorSenha = campoSenha.value;

    let campoConfirmaSenha = document. getElementById('senha2');
    let valorConfirmaSenha = campoConfirmaSenha.value;
   
     if(valorSenha == valorConfirmaSenha) {
    return true;
    } 

     else {
    document.getElementById("mensagem").innerHTML = "As senhas não são iguais";
    return false;
     
    }};

    
    document.addEventListener('DOMContentLoaded', () => {
        const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    
        togglePasswordIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const targetId = icon.getAttribute('data-target');
                const passwordInput = document.getElementsByClassName(targetId);
    
                for(let i = 0; i < passwordInput.length; i++){
                // Alterna o tipo do input entre 'password' e 'text'
                const isPassword = passwordInput[i].type === 'password';
                passwordInput[i].type = isPassword ? 'text' : 'password';
    
                // Alterna o ícone entre olho aberto e fechado
                icon.classList.toggle('fa-eye', isPassword);
                icon.classList.toggle('fa-eye-slash', !isPassword);
    
                // Alterna a classe de visibilidade
                icon.classList.toggle('show', isPassword);
                icon.classList.toggle('hide', !isPassword);

                console.log("oinho");
                }

            });
        });
    });