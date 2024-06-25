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

function FuncaoCelulas() {
  var table = document.getElementById("myTable"); // Obtém a tabela pelo seu ID
  var tr = table.getElementsByTagName("tr"); // Obtém todas as linhas da tabela

  for (var i = 0; i < tr.length; i++) {
    var cells = tr[i].getElementsByTagName("td"); // Obtém todas as células da linha
    
    // Coluna "Autor" é a quinta coluna (índice 4)
    var autorCell = cells[4];
    if (autorCell) {
      var txtValue = autorCell.textContent || autorCell.innerText; // Obtém o texto da célula
      
      // Adicionar classe e imagem à célula "Autor" apenas uma vez
      if (!autorCell.classList.contains("img-added")) {
        autorCell.classList.add("Coluna-autor", "img-added");

        // Criar um elemento de imagem e adicioná-lo à célula
        var img = document.createElement("img");
        img.src = "/imagens-svg/foto-perfil-autor.svg"; // Substitua pelo caminho da sua imagem
        img.alt = "Autor";
        img.classList.add("img-autor");
        img.style.marginBottom = "-0.3vw";
        img.style.marginRight = "0.6vw";
        
        // Adicionar a imagem antes do texto do autor, para ficar ao lado esquerdo
        autorCell.insertBefore(img, autorCell.firstChild);
      }
    }

    for (var j = 0; j < cells.length; j++) { // Percorre todas as células da linha
      var cell = cells[j];
      txtValue = cell.textContent || cell.innerText;
}}};


document.addEventListener("DOMContentLoaded", function() {
  FuncaoCelulas();
});

//função da imagem "detalhes da denúncia" ---------------------------------------------------------------------------------------//

// Seleciona a imagem e o aside pelo ID
const imagem = document.getElementsByClassName('ver-detalhes-denuncia');
const aside = document.getElementById('asideDetalhes');

// Adiciona um event listener para o clique na imagem
imagem.addEventListener('click', function() {
  // Verifica se o aside está visível
  if (aside.style.display === 'block') {
    // Se estiver visível, oculta
    aside.style.display = 'none';
  } else {
    // Se estiver oculto, exibe
    aside.style.display = 'block';
  }
});
