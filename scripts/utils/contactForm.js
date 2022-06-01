/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.contact_button');
const buttonX = document.querySelectorAll('.close1');
const formData = document.querySelectorAll('.formData');
const validMsg = document.querySelectorAll('.valid-msg');

// launch modal form
const launchModal = () => {
  modalbg.style.display = 'block';
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// close modal form : click on (X)
const closeModal = () => {
  modalbg.style.display = 'none';
};

// bouton(X) event : listen when buttonX is clicked
// and start function 'closeModal'
buttonX.forEach((close) => close.addEventListener('click', closeModal));

// submit event : écoute de l'évenement 'submit' du formulaire
// qui lance la fonction 'validate'
document.getElementById('formulaire').addEventListener('submit', validate);

// Checking input before validating and sending form results
function validate(e) {
  e.preventDefault() // to prevent page from recharging
  console.log ('form results', first.value, last.value, email.value, story.value); 
  if (first.value == '' || first.value.length < 2) {
    formData[0].dataset.errorVisible = true;
    return false;
  }
  if (last.value == '' || last.value.length < 2) {
    formData[1].dataset.errorVisible = true;
    return false;
  }
  if (email.value == '' ) {
    formData[2].dataset.errorVisible = true;
    return false;
  }
  if (story.value == '' ) {
    formData[3].dataset.errorVisible = true;
    return false;
  } else {
    modalbg.innerHTML = 'Votre message a bien été transmis. Merci';
    modalbg.classList.add('valid-msg');
    return true; // form is send
  }
}

// The input event fires when the value of
// an <input>, <select>, or <textarea> element has been changed
// start the Error function
formData.forEach((formData) => formData.addEventListener('input', error));

// modal input error visible or not :
// starts the errorvisible from css when input is not valid or empty
// es5 because of the this property not the same in =>
function error(e) {
  const validity = e.target.validity;
  if (!validity.valid || e.target.value === '') {
    this.dataset.errorVisible = 'true';
  } else {
    this.dataset.errorVisible = 'false';
  }
}

// modal change event : listen to 'change' and starts function 'DataError'
formData.forEach((formData) => formData.addEventListener('change', DataError));

// modal error messages
function DataError(e) {
  const validity = e.target.validity;
  if (validity.valid) {
    this.dataset.error = '';
  } else {
    formData[0].dataset.error = 'Veuillez saisir au moins deux caractères';
    formData[1].dataset.error = 'Veuillez saisir au moins deux caractères';
    formData[3].dataset.errorVisible = 'Veuillez saisisir un commentaire';
  }
}

// close the validation message

window.onclick = function(event) {
  if (event.target == modalbg) {
    modalbg.style.display = 'none';
  }
};
// Accessibility
window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    modalbg.style.display = 'none';
  }
});
