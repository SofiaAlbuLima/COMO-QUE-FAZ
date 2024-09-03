var texto = "Personalizado";  
  
var selects = document.querySelectorAll(".banner-promocional-adm select");  
var customSections = document.querySelectorAll(".custom-section-banner");  
  
function updateCustomSection() {  

selects.forEach((select, index) => {  
    var selectedOption = select.options[select.selectedIndex].text;  
    customSections[index].style.display = selectedOption === texto ? "block" : "none";  
});  
}  
  
selects.forEach(select => {  
    select.addEventListener("change", updateCustomSection);  
});  
  
updateCustomSection();

//--------------------------------------------------------------------------------------------------------------

const addImageButton = document.querySelector('.add-image-button');  
const imageInput = document.querySelector('#image-input');  
const imagePreview = document.querySelector('#image-preview');  

addImageButton.addEventListener('click', () => {  
  imageInput.click();  
});  
  
imageInput.addEventListener('change', (e) => {  
  const file = e.target.files[0];  
  const reader = new FileReader();  
  
  // Verifica se o arquivo é uma imagem  
  if (file.type.startsWith('image/')) {  

   reader.onload = () => {  
    imagePreview.src = reader.result;  
   };  

   reader.readAsDataURL(file);  
  } else {  
   console.error('O arquivo selecionado não é uma imagem.');  
  }  
});

