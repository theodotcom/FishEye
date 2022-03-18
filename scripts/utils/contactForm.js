function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Checking input before validating and sending form results
function validate(e) {
    e.preventDefault(); //to prevent page from recharging 
    if(first.value == "" || first.value.length < 2 ) {
      formData [0].dataset.errorVisible = true;
      return false;
    } 
    if(last.value == "" || last.value.length < 2) {
      formData [1].dataset.errorVisible = true;
      return false;
    } 
    if (email.value == "") {
      formData [2].dataset.errorVisible = true;
      return false;
    }  
    if (birthdate.value == "") {
      formData [3].dataset.errorVisible = true;
      formData [3].dataset.error = "Veuillez saisir une date de naissance valide";
      return false;
    }   
    if (quantity.value == "") {
      formData [4].dataset.errorVisible = true;
      return false;
    } 
    if (!location1.checked && !location2.checked && !location3.checked && !location4.checked && !location5.checked && !location6.checked) {
      formData [5].dataset.errorVisible = true;
      formData [5].dataset.error = "Veuillez sélectionner une ville";
      return false;
    } 
    if ( !checkbox1.checked) {
      formData [6].dataset.errorVisible = true;
      formData [6].dataset.error = "Vous devez vérifier que vous acceptez les termes et conditions.";
      return false; 
    }else {
      modalbg.innerHTML = " Merci de votre inscription";
      modalbg.classList.add("valid-msg");
      return true; // form is send
    }
  } 
  
  // close the modal after submitting it
  const closeBground = () =>  { modalbg.style.display = "none";} ;
  
  //The input event fires when the value of an <input>, <select>, or <textarea> element has been changed
  //start the Error function
  formData.forEach((formData) => formData.addEventListener("input", error));
  
  //modal input error visible or not : starts the errorvisible from css when input is not valid or empty
  //es5 because of the this property not the same in => 
  function error(e) {
    const validity = e.target.validity;
    if (!validity.valid || e.target.value === "" ) {
      this.dataset.errorVisible = "true";
    }else{
      this.dataset.errorVisible = "false";
    }
  };
  
  //modal change event : listen to "change" and starts function "DataError"
  formData.forEach((formData) => formData.addEventListener("change", DataError));
  
  //modal error messages 
  function DataError(e) {
    const validity = e.target.validity;
    if (validity.valid ) {
      this.dataset.error = "";
    }else {
      formData [0].dataset.error = "Un prénom c'est au moins deux caractères";
      formData [1].dataset.error = "Veuillez saisir au moins deux caractères";
      formData [2].dataset.error = "Veuillez saisir une adresse email valide";
      formData [4].dataset.error = "Veuillez saisir un nombre compris entre 1 et 99";
      formData [6].dataset.error = "Vous devez vérifier que vous acceptez les termes et conditions.";
    } 
  };
  
  // close the validation message
  
  
  window.onclick = function(event) {
    
    if (event.target == modalbg) {  
      modalbg.style.display = "none";
    }
  };
  
  const closeBground2 = () => { modalbg.style.display = "none"} ;
