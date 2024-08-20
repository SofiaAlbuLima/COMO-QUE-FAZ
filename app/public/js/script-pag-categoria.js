const fcutodasElList = document.querySelectorAll('.filtrocu button');

fcutodasElList.forEach(Option => {
    Option.addEventListener('click', () => {
        limpar();
        Option.classList.add('clicado');
    });
});

limpar = () => {
    fcutodasElList.forEach(Option => {
        Option.classList.remove('clicado');
    })
}

//longpress-------------------------------------------------------------------------------------//
//1 POST DISPENSA - FILEIRA 1
function configureLongPress(divId, longPressDivId, descriptionId) {
    var div = document.getElementById(divId);
    var longPressDiv = document.getElementById(longPressDivId);
    var nomedopost = document.getElementById(descriptionId);
    var longpress;

    div.addEventListener('mousedown', startLongPress);
    div.addEventListener('mouseup', clearLongPress);
    div.addEventListener('touchstart', startLongPress);
    div.addEventListener('touchend', clearLongPress);

    div.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    document.addEventListener('contextmenu', function (e) {
        if (e.target !== div) {
            e.preventDefault();
        }
    });

    function startLongPress() {
        longpress = setTimeout(function () {
            longPressDiv.style.display = "flex";
            nomedopost.style.display = "none";
        }, 700);
    }

    function clearLongPress() {
        clearTimeout(longpress);
        longpress = setTimeout(function () {
            longPressDiv.style.display = "none";
            nomedopost.style.display = "block";
        }, 1500);
    }

    longPressDiv.style.display = "none";
}
configureLongPress('post-dispensa-fileira1', 'longpress-post-dispensa-fileira1', 'descri-post');
// FINAL 1 POST DISPENSA - FILEIRA 1

//2 POST BOLIN - FILEIRA 1
function configureLongPress(divId, longPressDivId, descriptionId) {
    var div = document.getElementById(divId);
    var longPressDiv = document.getElementById(longPressDivId);
    var nomedopost = document.getElementById(descriptionId);
    var longpress;

    div.addEventListener('mousedown', startLongPress);
    div.addEventListener('mouseup', clearLongPress);
    div.addEventListener('touchstart', startLongPress);
    div.addEventListener('touchend', clearLongPress);

    div.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    document.addEventListener('contextmenu', function (e) {
        if (e.target !== div) {
            e.preventDefault();
        }
    });

    function startLongPress() {
        longpress = setTimeout(function () {
            longPressDiv.style.display = "flex";
            nomedopost.style.display = "none";
        }, 700);
    }

    function clearLongPress() {
        clearTimeout(longpress);
        longpress = setTimeout(function () {
            longPressDiv.style.display = "none";
            nomedopost.style.display = "block";
        }, 1500);
    }

    longPressDiv.style.display = "none";
}
configureLongPress('post-bolin-fileira1', 'longpress-post-bolin-fileira1', 'descri-post-a');
// FINAL 2 POST BOLIN - FILEIRA 1

//3 POST CACHOS - FILEIRA 1
function configureLongPress(divId, longPressDivId, descriptionId) {
    var div = document.getElementById(divId);
    var longPressDiv = document.getElementById(longPressDivId);
    var nomedopost = document.getElementById(descriptionId);
    var longpress;

    div.addEventListener('mousedown', startLongPress);
    div.addEventListener('mouseup', clearLongPress);
    div.addEventListener('touchstart', startLongPress);
    div.addEventListener('touchend', clearLongPress);

    div.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    document.addEventListener('contextmenu', function (e) {
        if (e.target !== div) {
            e.preventDefault();
        }
    });

    function startLongPress() {
        longpress = setTimeout(function () {
            longPressDiv.style.display = "flex";
            nomedopost.style.display = "none";
        }, 700);
    }

    function clearLongPress() {
        clearTimeout(longpress);
        longpress = setTimeout(function () {
            longPressDiv.style.display = "none";
            nomedopost.style.display = "block";
        }, 1500);
    }

    longPressDiv.style.display = "none";
}
configureLongPress('post-cachos-fileira1', 'longpress-post-cachos-fileira1', 'descri-post-cachos-fileira1');
//FINAL 3 POST CACHOS - FILEIRA 1

//1 POST CACHOS - FILEIRA 2
function configureLongPress(divId, longPressDivId, descriptionId) {
    var div = document.getElementById(divId);
    var longPressDiv = document.getElementById(longPressDivId);
    var nomedopost = document.getElementById(descriptionId);
    var longpress;

    div.addEventListener('mousedown', startLongPress);
    div.addEventListener('mouseup', clearLongPress);
    div.addEventListener('touchstart', startLongPress);
    div.addEventListener('touchend', clearLongPress);

    div.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    document.addEventListener('contextmenu', function (e) {
        if (e.target !== div) {
            e.preventDefault();
        }
    });

    function startLongPress() {
        longpress = setTimeout(function () {
            longPressDiv.style.display = "flex";
            nomedopost.style.display = "none";
        }, 700);
    }

    function clearLongPress() {
        clearTimeout(longpress);
        longpress = setTimeout(function () {
            longPressDiv.style.display = "none";
            nomedopost.style.display = "block";
        }, 1500);
    }

    longPressDiv.style.display = "none";
}
configureLongPress('post-cachos-fileira2', 'longpress-post-cachos-fileira2', 'descri-post-cachos-fileira2');
//1 POST CACHOS - FILEIRA 2

//2 POST BOLO DE CENOURA - FILEIRA 2
function configureLongPress(divId, longPressDivId, descriptionId) {
    var div = document.getElementById(divId);
    var longPressDiv = document.getElementById(longPressDivId);
    var nomedopost = document.getElementById(descriptionId);
    var longpress;

    div.addEventListener('mousedown', startLongPress);
    div.addEventListener('mouseup', clearLongPress);
    div.addEventListener('touchstart', startLongPress);
    div.addEventListener('touchend', clearLongPress);

    div.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    document.addEventListener('contextmenu', function (e) {
        if (e.target !== div) {
            e.preventDefault();
        }
    });

    function startLongPress() {
        longpress = setTimeout(function () {
            longPressDiv.style.display = "flex";
            nomedopost.style.display = "none";
        }, 700);
    }

    function clearLongPress() {
        clearTimeout(longpress);
        longpress = setTimeout(function () {
            longPressDiv.style.display = "none";
            nomedopost.style.display = "block";
        }, 1500);
    }

    longPressDiv.style.display = "none";
}
configureLongPress('post-bolo-de-cenoura-fileira2', 'longpress-post-bolo-de-cenoura-fileira2', 'descri-post-bolo-de-cenoura');
// FINAL 2 POST BOLO DE CENOURA - FILEIRA 2

// 3 POST BOLIN - FILEIRA 2
function configureLongPress(divId, longPressDivId, descriptionId) {
    var div = document.getElementById(divId);
    var longPressDiv = document.getElementById(longPressDivId);
    var nomedopost = document.getElementById(descriptionId);
    var longpress;

    div.addEventListener('mousedown', startLongPress);
    div.addEventListener('mouseup', clearLongPress);
    div.addEventListener('touchstart', startLongPress);
    div.addEventListener('touchend', clearLongPress);

    div.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    document.addEventListener('contextmenu', function (e) {
        if (e.target !== div) {
            e.preventDefault();
        }
    });

    function startLongPress() {
        longpress = setTimeout(function () {
            longPressDiv.style.display = "flex";
            nomedopost.style.display = "none";
        }, 700);
    }

    function clearLongPress() {
        clearTimeout(longpress);
        longpress = setTimeout(function () {
            longPressDiv.style.display = "none";
            nomedopost.style.display = "block";
        }, 1500);
    }

    longPressDiv.style.display = "none";
}
configureLongPress('post-bolin-fileira2', 'longpress-post-bolin-fileira2', 'descri-post-bolin-fileira2');
// FINAL 3 POST BOLIN - FILEIRA 2

// 4 POST BOLIN - FILEIRA 2
function configureLongPress(divId, longPressDivId, descriptionId) {
    var div = document.getElementById(divId);
    var longPressDiv = document.getElementById(longPressDivId);
    var nomedopost = document.getElementById(descriptionId);
    var longpress;

    div.addEventListener('mousedown', startLongPress);
    div.addEventListener('mouseup', clearLongPress);
    div.addEventListener('touchstart', startLongPress);
    div.addEventListener('touchend', clearLongPress);

    div.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    document.addEventListener('contextmenu', function (e) {
        if (e.target !== div) {
            e.preventDefault();
        }
    });

    function startLongPress() {
        longpress = setTimeout(function () {
            longPressDiv.style.display = "flex";
            nomedopost.style.display = "none";
        }, 700);
    }

    function clearLongPress() {
        clearTimeout(longpress);
        longpress = setTimeout(function () {
            longPressDiv.style.display = "none";
            nomedopost.style.display = "block";
        }, 1500);
    }

    longPressDiv.style.display = "none";
}
configureLongPress('post-dispensa-fileira2', 'longpress-post-dispensa-fileira2', 'descri-post-dispensa-fileira2');
// FINAL 4 POST BOLIN - FILEIRA 2
// FINAL longpress-------------------------------------------------------------------------------------//

//filtro subcategorias--------------------------------------------------------------//
function category(c) {
    var item = document.getElementById('item-'+c).innerHTML;
    document.getElementsByTagName('input')[0].value = item;
}

function focado(){
    document.getElementsByClassName('dropDown')[0].style.display="block";
    document.getElementById('seta').style.transform="rotateX(0deg)";
}
function desfoque(){
    document.getElementsByClassName('dropDown')[0].style.display="none"
    document.getElementById('seta').style.transform="rotateX(180deg)";
}
