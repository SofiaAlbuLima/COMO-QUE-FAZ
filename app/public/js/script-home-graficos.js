const xValues = ["Denúncias analisadas e avaliadas", "Denúncias Não analisadas", "Denúncias analisadas"];
const yValues = [100, 50, 50];
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
        cutoutPercentage: 60,
        legend: {
          position: 'right',
          labels: {
              fontColor: '#333333',
              fontSize: 14,
              fontFamily: 'Fira Sans',
              boxWidth: 20,
              marginBottom: 80
          },
          margin: {
            bottom: 60 // Definindo a margem de 20 pixels abaixo da legenda
        }
      }
    }
  });

//   https://www.w3schools.com/js/js_graphics_chartjs.asp