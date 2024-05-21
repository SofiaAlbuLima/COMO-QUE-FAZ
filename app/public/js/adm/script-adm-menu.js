document.addEventListener('DOMContentLoaded', function() {
    const MinimizarMenuAdministrativo = () => {
        let botao = document.querySelector('.minimizar-menu-adm');
    
        // elementos que serão adicionados o id
        let elementosSeletores = ['.menu-fundo-roxo', '.Imagem-PaginaIncial', '.ImagemMinimizada-PaginaIncial', '.divisor-menuAdm', 
                                  '.a-pagina-inicial', '.a-denuncias', '.a-postagens-perguntas', '.a-usuarios', '.a-acesso-premium', '.a-marketing-banners',
                                  '.text1', '.text2','.text3','.text4','.text5','.text6',
                                  '.um', '.dois', '.tres', '.quatro', '.cinco', '.seis',
                                  '.ImagemBrancoUM', '.ImagemBrancoDOIS', '.ImagemBrancoTRES', '.ImagemBrancoQUATRO', '.ImagemBrancoCINCO', '.ImagemBrancoSEIS',
                                  '.perfil-sair', '.bemvindo', '.Admin', '.link-sair', '.sair-da-conta',
                                  '.minimizar-menu-adm', '.flecha-minimizar'
                                ];
    
        botao.addEventListener('click', () => {
    
            elementosSeletores.forEach(seletor => {
                let elemento = document.querySelector(seletor);
    
            // Adiciona a classe ao menu quando o botão for clicado
            if (elemento && elemento.id === 'minimizado') {
                    elemento.id = '';
                }
            else if(elemento){
                elemento.id = 'minimizado';
            }
            });
        });
    };
    
    MinimizarMenuAdministrativo();


    const PaginaSelecionadaNoMenu = () => {
        let pag1 = document.querySelector('.a-pagina-inicial');
        let pag2 = document.querySelector('.a-denuncias');
        let pag3 = document.querySelector('.a-postagens-perguntas');
        let pag4 = document.querySelector('.a-usuarios');
        let pag5 = document.querySelector('.a-acesso-premium');
        let pag6 = document.querySelector('.a-marketing-banners');
    
        let imgRoxo1 = document.querySelector('.um');
        let imgRoxo2 = document.querySelector('.dois');
        let imgRoxo3 = document.querySelector('.tres');
        let imgRoxo4 = document.querySelector('.quatro');
        let imgRoxo5 = document.querySelector('.cinco');
        let imgRoxo6 = document.querySelector('.seis');
    
        let imgBranco1 = document.querySelector('.ImagemBrancoUM');
        let imgBranco2 = document.querySelector('.ImagemBrancoDOIS');
        let imgBranco3 = document.querySelector('.ImagemBrancoTRES');
        let imgBranco4 = document.querySelector('.ImagemBrancoQUATRO');
        let imgBranco5 = document.querySelector('.ImagemBrancoCINCO');
        let imgBranco6 = document.querySelector('.ImagemBrancoSEIS');
        
        let titulo1 = document.querySelector('.text1');
        let titulo2 = document.querySelector('.text2');
        let titulo3 = document.querySelector('.text3');
        let titulo4 = document.querySelector('.text4');
        let titulo5 = document.querySelector('.text5');
        let titulo6 = document.querySelector('.text6');
    
        let pagina = '';
        let outros = '';
    
        let urlDaPagina = window.location.href;
        if(urlDaPagina.includes('/adm')){
            pagina = pag1;
            outros = [pag2, pag3, pag4, pag5, pag6];
    
            imgRoxo1.style.cssText = 'display:inline;';
            imgBranco1.style.cssText = 'display: none;';
            titulo1.style.cssText = 'color: #5225AA;';
        }
        else if(urlDaPagina.includes('/adm/denuncias')){
            pagina = pag2;
            outros = [pag1, pag3, pag4, pag5, pag6];
    
            imgRoxo2.style.cssText = 'display:inline;';
            imgBranco2.style.cssText = 'display: none;';
            titulo2.style.cssText = 'color: #5225AA;';
        }
        else if(urlDaPagina.includes('/adm/postagens-perguntas')){
            pagina = pag3;
            outros = [pag1, pag2, pag4, pag5, pag6];
    
            imgRoxo3.style.cssText = 'display:inline;';
            imgBranco3.style.cssText = 'display: none;';
            titulo3.style.cssText = 'color: #5225AA;';
        }
        else if(urlDaPagina.includes('/adm/usuarios')){
            pagina = pag4;
            outros = [pag1, pag2, pag3, pag5, pag6];
    
            imgRoxo4.style.cssText = 'display:inline;';
            imgBranco4.style.cssText = 'display: none;';
            titulo4.style.cssText = 'color: #5225AA;';
        }
        else if(urlDaPagina.includes('/adm/acesso-premium')){
            pagina = pag5;
            outros = [pag1, pag2, pag3, pag4, pag6];
    
            imgRoxo5.style.cssText = 'display:inline;';
            imgBranco5.style.cssText = 'display: none;';
            titulo5.style.cssText = 'color: #5225AA;';
        }
        else if(urlDaPagina.includes('/adm/marketing-banners')){
            pagina = pag6;
            outros = [pag1, pag2, pag3, pag4, pag5];
    
            imgRoxo6.style.cssText = 'display:inline;';
            imgBranco6.style.cssText = 'display: none;';
            titulo6.style.cssText = 'color: #5225AA;';
        }
        
        pagina.style.cssText = 'background-color: #FFD662;';
    
        outros.forEach(outros => {
            outros.addEventListener('mouseenter', function() {
                this.style.cssText = 'background-color: rgba(0, 0, 0, 0.1);';
            });
            outros.addEventListener('mouseleave', function() {
                this.style.cssText = '';
            });
        });
    
        pagina.addEventListener('mouseenter', function() {
            this.style.cssText = 'background-color: #ffd562d3;';
        });
        pagina.addEventListener('mouseleave', function() {
            this.style.cssText = 'background-color: #FFD662;';
        });
    };
    
    document.addEventListener('DOMContentLoaded', PaginaSelecionadaNoMenu);
  });



