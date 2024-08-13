function EditarPerfil(){
    var popup = document.getElementById("editar-perfil-popup");
    var fundo = document.getElementById("fundo-editar-perfil");

    if (popup.style.display === "none"){
        popup.style.display = "block";
        fundo.style.display = "block";
    }
}

function SairEditarPerfil(){
    var popup = document.getElementById("editar-perfil-popup");
    var fundo = document.getElementById("fundo-editar-perfil");

    if (popup.style.display === "block"){
        popup.style.display = "none";
        fundo.style.display = "none";
    }
}

function EditarPerfilMob(){
    var popup = document.getElementById("editar-perfil-popup-mob");
    var fundo = document.getElementById("fundo-editar-perfil-mob");
    var categorias = document.getElementById("topcs");

    if (popup.style.display === "none"){
        popup.style.display = "block";
        fundo.style.display = "block";
        categorias.style.display = "none";
    }
}

function SairEditarPerfilMob(){
    var popup = document.getElementById("editar-perfil-popup-mob");
    var fundo = document.getElementById("fundo-editar-perfil-mob");
    var categorias = document.getElementById("topcs");

    if (popup.style.display === "block"){
        popup.style.display = "none";
        fundo.style.display = "none";
        categorias.style.display = "flex";
    }
}
