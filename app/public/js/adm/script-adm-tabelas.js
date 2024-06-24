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

document.addEventListener("DOMContentLoaded", function() {
  // Seleciona todas as imagens com a classe 'ver-detalhes-denuncia'
  var imagensDetalhes = document.querySelectorAll('.ver-detalhes-denuncia');

  // Itera sobre cada imagem para adicionar o evento de clique
  imagensDetalhes.forEach(function(img) {
    img.addEventListener('click', function() {
      // Cria um novo aside
      var aside = document.createElement('aside');
      aside.classList.add('detalhes-denuncia');
      aside.innerHTML = '<p>Detalhes da denúncia</p><p>Informações adicionais aqui...</p>';

      // Insere o aside após a linha da tabela atual (tr.linhas)
      var linha = this.closest('tr.linhas');
      linha.parentNode.insertBefore(aside, linha.nextSibling);
    });
  });
});