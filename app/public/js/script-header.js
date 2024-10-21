        
        function TextosRoxos(){
            document.getElementById("text-user-hover").style.color = "#9820CA";
            document.getElementById("text-user-hover2").style.color = "#9820CA";
        }

        function TiraTextosRoxos(){
            document.getElementById("text-user-hover").style.color = "#333333";
            document.getElementById("text-user-hover2").style.color = "#333333";
        }

        function AparecerImagemRoxa(){
            document.getElementById("img-login_hover").style.display = "block";
            document.getElementById("img-login").style.visibility = "hidden";
        }
        
        function DesaparecerImagemRoxa(){
            document.getElementById("img-login_hover").style.display = "none";
            document.getElementById("img-login").style.visibility = "visible";
        }

        function AparecerSetaRoxa(){
            document.getElementById("seta_hover").style.display = "block";
            document.getElementById("seta").style.display = "none";
        }

        function DesaparecerSetaRoxa(){
            document.getElementById("seta_hover").style.display = "none";
            document.getElementById("seta").style.display = "block";
        }

        function AbrirMenu(){
            document.getElementById("menu_hamburguer").style.display = "block";
            document.getElementById("seta_hover").classList.add("rotated");
            document.getElementById("container").style.backgroundColor = "#f5f0ff";

            TextosRoxos();
            AparecerSetaRoxa();
        }
        function FecharMenu() {
            document.getElementById("menu_hamburguer").style.display = "none";
            document.getElementById("seta_hover").classList.remove("rotated");
            document.getElementById("container").style.backgroundColor = "";

            TiraTextosRoxos();
            DesaparecerSetaRoxa();
        }
        
        function showDiv1() {
            if(document.getElementById("img-login")){
                AparecerImagemRoxa();
            }else{
                AparecerSetaRoxa();
            }
                TextosRoxos();
        };

        function hideDiv1() {
            if(document.getElementById("img-login")){
                DesaparecerImagemRoxa();
            }else{
                DesaparecerSetaRoxa();
            }
                TiraTextosRoxos();
        };

        function ToggleMenu() {

            if(document.getElementById("menu_hamburguer").style.display === "block"){
                FecharMenu();
            }else{
                AbrirMenu();
            }
        }
        

        document.addEventListener("DOMContentLoaded", function() {
            var categorias = document.getElementById("categorias");
            var lastScrollTop = 0;
        
            window.addEventListener("scroll", function() {
                var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                
                if (currentScroll > lastScrollTop) {
                    // Rolando para baixo
                    categorias.classList.add("hide");
                } else {
                    // Rolando para cima
                    categorias.classList.remove("hide");
                }
                lastScrollTop = currentScroll;
            });
        });

        