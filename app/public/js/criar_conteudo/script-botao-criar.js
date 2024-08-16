function AbrirMenuLateral() {
    var x = document.getElementById("user-menu");
    var y = document.getElementById("corpo");
    if (x.style.display === "none") {
      x.style.display = "block";  
      y.style.display = "none";  
    } else {
      x.style.display = "none"; 
      y.style.display = "block"; 
    }
  }
  function FecharMenuLateral() {
    var x = document.getElementById("user-menu");    
    var y = document.getElementById("corpo");
    if (x.style.display === "none") {
      x.style.display = "block"; 
      y.style.display = "none";  
    } else {
      x.style.display = "none";
      y.style.display = "block"; 
    }
  }

  function showDiv2() {
    document.getElementById("hide-hover-search").style.display = "block";
}

function hideDiv2() {
    document.getElementById("hide-hover-search").style.display = "none";
}

function showDiv3() {
  document.getElementById("hide-menu-lateral").style.display = "block";
}

function hideDiv3() {
  document.getElementById("hide-menu-lateral").style.display = "none";
}

function showMenu() {
  var menu = document.getElementById("menu");
  menu.style.display = "block";
}

function hideMenu() {
  var menu = document.getElementById("menu");
  menu.style.display = "none";
}

function navigateToPage(page) {
  window.location.href = page;
}

// TABS 

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// TABS LOGIN - FIM

// ICON BUTTON

$(document).ready(function () {
  $(".floating-main").click(function () {
    $('.floating-smoke').toggleClass('float-open');
});
});
