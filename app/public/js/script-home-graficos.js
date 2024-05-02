const yDenuncias = [100, 50, 50];

const totalVal = yDenuncias.reduce((acc, current) => acc + current, 0);
const Val = [ (yDenuncias[0] * 100) / totalVal,
              (yDenuncias[1] * 100) / totalVal,
              (yDenuncias[2] * 100) / totalVal,
];

const xDenuncias = [ Val[0] + "% Denúncias analisadas e avaliadas", 
                     Val[1] + "% Denúncias Não analisadas", 
                     Val[2] + "% Denúncias analisadas"];
const barColors = ["#5800AA", "#AA007A","#FFD662", "#333333"];



new Chart("Grafico_Denuncias", {
    type: "doughnut",
    data: {
        labels: xDenuncias,
        datasets: [{
          backgroundColor: barColors,
          data: yDenuncias,
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: false,
        legend: {
          position: 'right',
          labels: {
              fontSize: 15,
              fontFamily: 'Fira Sans',
              padding: 30,
              boxWidth: 20,
              boxHeight: 20,
          }
      }
    }
  });

//   https://www.w3schools.com/js/js_graphics_chartjs.asp


const LabelPostagens = [500, 345, 200];
const LabelPerguntas = [250, 100, 50];

new Chart("Grafico_Postagens", {
  type: 'bar',
    data: {
        labels: ['Culinária', 'Limpeza', 'Bem Estar'],
        datasets: [{
            label: 'Quantidade de Postagens',
            data: LabelPostagens,
            backgroundColor: barColors[0] 
        }, {
            label: 'Quantidade de Perguntas',
            data: LabelPerguntas,
            backgroundColor: barColors[1]
        }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
        legend: {
          labels: {
              fontSize: 15,
              fontFamily: 'Fira Sans',
              boxWidth: 20,
              boxHeight: 20,
              padding: 10
          }
      },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        // Ajuste a largura das barras aqui
        barPercentage: 0.5,
        categoryPercentage: 0.5
    }
});