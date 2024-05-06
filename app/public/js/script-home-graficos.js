
//   Gráfico - Denúncias | Análises e avaliação - Inicio
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
//   Gráfico - Denúncias | Análises e avaliação - Fim



//   Gráfico - Postagens & Perguntas | Publicações de Categorias - Inicio
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
                        beginAtZero: true,
                        stepSize: 100
                    }
                }]
            },
            // Ajuste a largura das barras aqui
            barPercentage: 0.5,
            categoryPercentage: 0.5
        }
    });
//   Gráfico - Postagens & Perguntas | Publicações de Categorias - Fim



//   Gráfico - Acesso Premium - Inicio
    const yPremium = [500, 2500];
    const xPremium = [yPremium[0] + " Usuários Premium", yPremium[1] +" Usuários sem Premium"]
    const barColorsPremium = ["#FFD662", "#5800AA"];

    new Chart("Grafico_AcessoPremium", {
        type: "doughnut",
        data: {
            labels: xPremium,
            datasets: [{
            backgroundColor: barColorsPremium,
            data: yPremium,
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: false,
            legend: {
            position: 'bottom',
            labels: {
                fontSize: 16,
                fontFamily: 'Fira Sans',
                padding: 30,
                boxWidth: 20,
                boxHeight: 20,
            }
        }
        }
    });
//   Gráfico - Acesso Premium - Fim



//   Gráfico - Acesso Premium | Cadastros e Acessos - Inicio
    const yCadastros = [0, 100, 100, 50, 150, 0];
    const yPermanêcia = [125, 50, 150, 150, 100, 100];

    const LabelDatas = ['01 Jan 2024', '01 Fev 2024', '01 Mar 2024', '01 Abr 2024', '01 Mai 2024', '01 Jun 2024',];

    const xCadastros = ["Novos cadastros"];
    const xPermanêcia = ["Duração média de permanência"];

    new Chart("Grafico_CadastrosAcessos", {
        type: 'line',
            data: {
                labels: LabelDatas,
                datasets: [{
                    label: xCadastros,
                    data: yCadastros,
                    backgroundColor: 'transparent',
                    borderColor: barColors[1],
                    tension: 0
                }, {
                    label: xPermanêcia,
                    data: yPermanêcia,
                    backgroundColor: 'transparent',
                    borderColor: barColors[2],
                    tension: 0
                }]
            },
            options: {
            maintainAspectRatio: false,
            responsive: false,
                legend: {
                    position: 'right',
                labels: {
                    fontSize: 16,
                    fontFamily: 'Fira Sans',
                    boxWidth: 20,
                    boxHeight: 20,
                    padding: 30
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
                            beginAtZero: true,
                            stepSize: 50
                        }
                    }]
                },
                // Ajuste a largura das barras aqui
                barPercentage: 0.5,
                categoryPercentage: 0.5
            }
        });

//   Gráfico - Acesso Premium | Cadastros e Acessos - Fim