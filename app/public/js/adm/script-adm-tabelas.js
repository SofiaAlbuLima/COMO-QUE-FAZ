function myFunction() {
  var input, //o campo de entrada onde o usuário digita o filtro
      filter, //o valor do filtro
      table, //a tabela que será filtrada
      tr, // representa as linhas da tabela
      td, //representa as células da tabela
      i, //contador usado no loop
      txtValue; //valor do texto dentro de cada célula da tabela
      
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    FuncaoCelulas();
});





//imagem na coluna autor
function FuncaoCelulas() {
  var table = document.getElementById("myTable");
  var tr = table.getElementsByTagName("tr");

  for (var i = 0; i < tr.length; i++) {
    var cells = tr[i].getElementsByTagName("td");

    // Verificar se a célula contém o atributo data-autor
    var autorCell = Array.from(cells).find(cell => cell.hasAttribute('data-autor'));
    if (autorCell) {
      var txtValue = autorCell.textContent || autorCell.innerText;

      // Adicionar classe e imagem à célula "Autor" apenas uma vez
      if (!autorCell.classList.contains("img-added")) {
        autorCell.classList.add("Coluna-autor", "img-added");

        // Criar um elemento de imagem e adicioná-lo à célula
        var img = document.createElement("img");
        img.src = "/imagens-svg/foto-perfil-autor.svg";
        img.alt = "Autor";
        img.classList.add("img-autor");
        img.style.marginBottom = "-0.3vw";
        img.style.marginRight = "0.6vw";

        // Adicionar a imagem antes do texto do autor
        autorCell.insertBefore(img, autorCell.firstChild);
      }
    }
  }
}






//função da imagem "detalhes da denúncia"
function clickMenu() {
  if (asideDetalhes.style.display == '') {
    asideDetalhes.style.display = 'none'
  } else {
    asideDetalhes.style.display = ''
  }
}