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

const addImageButtons = document.querySelectorAll('.add-image-button');  
const imageInputs = document.querySelectorAll('.image-input');  
const imagePreviews = document.querySelectorAll('.image-preview');  
  
addImageButtons.forEach((button) => {  
  button.addEventListener('click', () => {  
   const imageInput = button.parentNode.querySelector('.image-input');  
   imageInput.click();  
  });  
});  
  
imageInputs.forEach((input) => {  
  input.addEventListener('change', (e) => {  
   const file = e.target.files[0];  
   const reader = new FileReader();  
  
   // Verifica se o arquivo é uma imagem  
   if (file.type.startsWith('image/')) {  
    reader.onload = () => {  
      const imagePreview = input.parentNode.querySelector('.image-preview');  
      imagePreview.src = reader.result;  
      imagePreview.classList.add('show');  
    };  
  
    reader.readAsDataURL(file);  
   } else {  
    console.error('O arquivo selecionado não é uma imagem.');  
   }  
  });  
});
