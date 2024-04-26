new Chart("myChart", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true
      }
    }
  });

//   https://www.w3schools.com/js/js_graphics_chartjs.asp