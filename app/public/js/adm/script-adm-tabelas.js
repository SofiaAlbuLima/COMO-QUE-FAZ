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
  var table = document.getElementById("myTable");
  var tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    var cells = tr[i].getElementsByTagName("td"); // Obtém todas as células da linha
    
    for (var j = 0; j < cells.length; j++) { // Percorre todas as células da linha
        var cell = cells[j];
        txtValue = cell.textContent || cell.innerText;
        
        // Exemplo de lógica para atribuir classes e IDs com base no conteúdo da célula
        if (txtValue === "Perfil") {
            cell.classList.add("Conteudo");
            var texto = document.createElement("p");
            var figure = document.createElement("figure");

            texto.innerHTML = "Perfil";
            texto.classList.add("p-perfil", "p-conteudo");
            cell.appendChild(texto);

            figure.classList.add("figure-perfil", "figure-conteudo");
            cell.appendChild(figure);

        } else if (txtValue === "Pergunta") {
          cell.classList.add("Conteudo");
          var texto = document.createElement("p");
          var figure = document.createElement("figure");

          texto.innerHTML = "Pergunta";
          texto.classList.add("p-pergunta", "p-conteudo");
          cell.appendChild(texto);

          figure.classList.add("figure-pergunta", "figure-conteudo");
          cell.appendChild(figure);


        } else if (txtValue === "Postagem") {
          cell.classList.add("Conteudo");
          var texto = document.createElement("p");
          var figure = document.createElement("figure");

          texto.innerHTML = "Postagem";
          texto.classList.add("p-postagem", "p-conteudo");
          cell.appendChild(texto);

          figure.classList.add("figure-postagem", "figure-conteudo");
          cell.appendChild(figure);


        } else if (txtValue === "Comentário") {
          cell.classList.add("Conteudo");
          var texto = document.createElement("p");
          var figure = document.createElement("figure");

          texto.innerHTML = "Comentário";
          texto.classList.add("p-conteudo", "p-comentario");
          cell.appendChild(texto);

          figure.classList.add("figure-conteudo", "figure-comentario");
          cell.appendChild(figure);


        } else if (txtValue === "Analisada e Avaliada") {
              cell.classList.add("Status");
              var texto = document.createElement("p");
              var figure = document.createElement("figure");

              texto.innerHTML = "Analisada e Avaliada";
              texto.classList.add("p-analisadaAvaliada", "p-status");
              cell.appendChild(texto);

              figure.classList.add("figure-analisadaAvaliada", "figure-status");
              cell.appendChild(figure);


          } else if (txtValue === "Não Analisada") {
            cell.classList.add("Status");
            var texto = document.createElement("p");
            var figure = document.createElement("figure");

            texto.innerHTML = "Não Analisada";
            texto.classList.add("p-naoAnalisada", "p-status");
            cell.appendChild(texto);

            figure.classList.add("figure-naoAnalisada", "figure-status");
            cell.appendChild(figure);


          } else if (txtValue === "Analisada") {
            cell.classList.add("Status");
            var texto = document.createElement("p");
            var figure = document.createElement("figure");

            texto.innerHTML = "Analisada";
            texto.classList.add("p-analisada", "p-status");
            cell.appendChild(texto);

            figure.classList.add("figure-analisada", "figure-status");
            cell.appendChild(figure);


          } else {
                // Caso padrão, se não corresponder a nenhum critério específico
                cell.classList.add("classe-padrao");
            }
    }
}
}
