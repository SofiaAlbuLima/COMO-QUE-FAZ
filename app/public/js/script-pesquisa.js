// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.querySelector('form');

//     form.addEventListener('submit', function (event) {
//         event.preventDefault();

//         const filtroTipo = document.querySelector('input[name="filtro_tipo"]:checked').value;
//         const filtroCategoria = document.querySelector('input[name="filtro_categoria"]:checked').value;
//         const filtroClassificacao = document.querySelector('input[name="filtro_classificacao"]:checked').value;

//         const url = new URL('/pesquisa', window.location.origin);
//         url.searchParams.append('filtro_tipo', filtroTipo);
//         url.searchParams.append('filtro_categoria', filtroCategoria);
//         url.searchParams.append('filtro_classificacao', filtroClassificacao);

//         fetch(url, {
//             method: 'GET',
//         })
//         .then(response => response.json())
//         .then(data => {
//             // Aqui você pode processar os dados e atualizar a página.
//             // Por exemplo, vamos mostrar os resultados dentro de um container HTML.
//             const resultadoContainer = document.getElementById('resultado-pesquisa');
//             resultadoContainer.innerHTML = ''; // Limpa o conteúdo anterior.

//             // Adicione os novos resultados no container.
//             data.forEach(item => {
//                 const itemElement = document.createElement('div');
//                 itemElement.textContent = item.nome; // Ajuste conforme os dados retornados.
//                 resultadoContainer.appendChild(itemElement);
//             });
//         })
//         .catch(error => {
//             console.error('Erro:', error);
//         });
//     });
// });