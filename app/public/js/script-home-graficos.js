const yValues = [100, 50, 50];

const totalVal = yValues.reduce((acc, current) => acc + current, 0);
const Val = [ (yValues[0] * 100) / totalVal,
              (yValues[1] * 100) / totalVal,
              (yValues[2] * 100) / totalVal,
];

const xValues = [ Val[0] + "% Denúncias analisadas e avaliadas", 
                  Val[1] + "% Denúncias Não analisadas", 
                  Val[2] + "% Denúncias analisadas"];
const barColors = ["#5800AA", "#AA007A","#FFD662"];



new Chart("Grafico_Denuncias", {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues,
        }]
    },
    options: {
        maintainAspectRatio: false, // Esta opção permite ao gráfico ignorar o aspect ratio e se ajustar ao tamanho do contêiner
        responsive: false,
        legend: {
          position: 'right',
          labels: {
              fontColor: 'rgba(51, 51, 51, 100)',
              fontSize: 18,
              fontFamily: 'Fira Sans',
              padding: 30,
              boxWidth: 20,
              boxHeight: 20,
          }
      }
    }
  });

//   https://www.w3schools.com/js/js_graphics_chartjs.asp