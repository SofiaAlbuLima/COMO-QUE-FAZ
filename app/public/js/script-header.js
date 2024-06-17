        
        function showDiv1() {
            document.getElementById("img-login_hover").style.display = "block";
            document.getElementById("text-user-hover").style.color = "#9820CA";
            document.getElementById("text-user-hover2").style.color = "#9820CA";
        };

        function hideDiv1() {
            document.getElementById("img-login_hover").style.display = "none";
            document.getElementById("text-user-hover").style.color = "#333333";
            document.getElementById("text-user-hover2").style.color = "#333333";
        };

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