function notify(titulo, texto, tipo, posicao,duracao=3000) {
    new Notify({
        status: tipo,
        title: titulo,
        text:texto.replace(/&lt;/g,"<").replace(/&gt;/g,">"),
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
};
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
    verificaConfirmaSenha();  

    const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('senha1');

        togglePassword.addEventListener('click', function () {
            // Alterna o tipo do input entre 'password' e 'text'
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;

            // Alterna o ícone entre olho aberto e fechado
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');

            this.classList.toggle('show');
            this.classList.toggle('hide');
        });