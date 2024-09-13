function openContent(evt, openAjustmentId) {
  var i, ajustcontent, ajusttab;

  ajustcontent = document.getElementsByClassName("ajustcontent");
  for (i = 0; i < ajustcontent.length; i++) {
    ajustcontent[i].style.display = "none";
  }

  ajusttab = document.getElementsByClassName("ajusttab");
  for (i = 0; i < ajusttab.length; i++) {
    ajusttab[i].classList.remove("active");
  }

  var contentToShow = document.getElementById(openAjustmentId);
  if (contentToShow) {
    contentToShow.style.display = "block";
  } else {
    console.error("Elemento com ID " + openAjustmentId + " não encontrado.");
  }

  evt.currentTarget.classList.add("active");
}

document.getElementById("defaultOpen").click();