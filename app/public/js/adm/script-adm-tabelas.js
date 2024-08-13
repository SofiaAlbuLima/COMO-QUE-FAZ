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






// //função da imagem "detalhes da denúncia"
function clickMenu() {
  if (asideDetalhes.style.display == 'block') {
    asideDetalhes.style.display = 'none'
  } else {
    asideDetalhes.style.display = 'block'
  }
}
// document.addEventListener('DOMContentLoaded', function() {
//             // Função para criar o <tr> com o conteúdo do <aside>
//             function criarLinhaAside() {
//                 const tr = document.createElement('tr');
//                 tr.className = 'linhas';
//                 tr.id = 'asideDetalhes';
//                 tr.classList.add('hidden'); // Adiciona a classe hidden por padrão
//                 tr.innerHTML = `
//                     <td class="linha-aside" style="border: none;">
//                         <aside class="asideDetalhes">
//                             <article class="linha-detalhe-denuncia">
//                                 <section class="conteudo-detalhe-denuncia">
//                                     <section class="grid-info-usuario">
//                                         <h1 class="titulo-detalhamento-denuncia">ID da denúncia</h1>
//                                         <h1 class="titulo-detalhamento-denuncia">Usuário Denunciado</h1>
//                                         <h1 class="titulo-detalhamento-denuncia">Detalhamento</h1>
//                                         <figure class="info-detalhe-denuncia">#10.020</figure>
//                                         <figure class="info-detalhe-denuncia">
//                                             <img src="/imagens-svg/foto-perfil-autor.svg" alt="" class="foto-usu-detalhe-denuncia">
//                                             Perfil
//                                         </figure>
//                                         <figure class="info-detalhe-denuncia">
//                                             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
//                                         </figure>
//                                     </section>
//                                     <section class="grid-btn-detalhes-denuncia">
//                                         <a class="link-btn-detalhes-denuncia" href="http://">
//                                             <section class="btn-detalhes-denuncia">
//                                                 <img src="/imagens-svg/visualizar-icon-rosa.svg" alt="" class="img-btn-detalhes-denuncia">
//                                                 <h1 class="txt-btn-detalhes-denuncia">Visualizar conteúdo denunciado</h1>
//                                             </section>
//                                         </a>
//                                         <a class="link-btn-detalhes-denuncia" href="http://">
//                                             <section class="btn-detalhes-denuncia">
//                                                 <img src="/imagens-svg/bloquear-icon-rosa.svg" alt="" class="img-btn-detalhes-denuncia">
//                                                 <h1 class="txt-btn-detalhes-denuncia">Suspender Usuário Denunciado</h1>
//                                             </section>
//                                         </a>
//                                         <a class="link-btn-detalhes-denuncia" href="http://">
//                                             <section class="btn-detalhes-denuncia">
//                                                 <img src="/imagens-svg/excluir-icon-rosa.svg" alt="" class="img-btn-detalhes-denuncia">
//                                                 <h1 class="txt-btn-detalhes-denuncia">Descartar Denúncia</h1>
//                                             </section>
//                                         </a>
//                                     </section>
//                                 </section>
//                             </article>
//                         </aside>
//                     </td>
//                 `;
//                 return tr;
//             }

//             // Seleciona todas as linhas com a classe "linhas-denuncias"
//             const linhasDenuncias = document.querySelectorAll('.linhas-denuncias');

//             linhasDenuncias.forEach(linha => {
//                 // Verifica se o <tr> com o id "asideDetalhes" já existe após a linha atual
//                 if (!linha.nextElementSibling || !linha.nextElementSibling.classList.contains('linhas')) {
//                     const linhaAside = criarLinhaAside();
//                     linha.insertAdjacentElement('afterend', linhaAside);
//                 }
//             });

//             // Função para alternar a visibilidade dos detalhes
//             function clickMenu() {
//                 const detalhes = document.querySelectorAll('#asideDetalhes');
//                 detalhes.forEach(detail => {
//                     if (detail.classList.contains('hidden')) {
//                         detail.classList.remove('hidden');
//                     } else {
//                         detail.classList.add('hidden');
//                     }
//                 });
//             }

//             // Adiciona o evento de clique ao botão
//             document.getElementById('toggleButton').addEventListener('click', clickMenu);
//         });