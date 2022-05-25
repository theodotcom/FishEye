import { getNickname } from "../utils/index.js";
import mediaFactory from "../factories/media.js";

let likeIds = [];

// Display Photographer Data into the Header of his own page
async function displayPhotographerData(photographer) {
  const photographerSection = document.querySelector(".photograph-header");
  if (photographerSection) {
    photographerSection.innerHTML = "";
  }

  const photographerModel = getPhotographerDom(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographerSection.appendChild(userCardDOM);
}

// Display Each medias of the photographer
async function displayMediasData(photographerDetails, photographer) {
  const mediaSection = document.querySelector(".photographer_info");
  const mediaModel = getMediaDom(photographerDetails, photographer);
  const userCardDOM = mediaModel.getUserCardDOM();
  mediaSection.appendChild(userCardDOM);
}

let currentSlide = 0;
let nbMedias = 0;
// creation d'une fonction pour la lightbox

// Get the modal
var modal = document.getElementById("myModal");

// Get the medias of the photographer to push them into the DOM
function getMediaDom(photographerMedia, photographer) {
  function getUserCardDOM() {
    const mediaCardContainer = document.createElement("div");
    mediaCardContainer.setAttribute("class", "container");

    for (var i = 0; i <= photographerMedia.length - 1; i++) {
      const elmt = photographerMedia[i];
      const { name, likes, title, photographerId } = elmt;

      // Likes counter

      const likesNumber = getLikesNumber(photographerMedia);
      const likeys = document.getElementById("myLikes");
      likeys.textContent = likesNumber;
      const lover = document.getElementById("likeHeart");
      lover.setAttribute("class", "fas fa-heart");
      const phPrice = document.getElementById("price");
      phPrice.textContent = photographer.price + "Euros" + "/" + "jour";

      const picture = `Sample Photos/${getNickname(photographer.name)}/${
        elmt.image ? elmt.image : elmt.video
      }`;
      const mediaCard = document.createElement("a");
      mediaCard.setAttribute("id", "myImg");
      mediaCard.tabIndex = 1;
      mediaCard.setAttribute("data-card", "media");

      let media1;
      if (elmt.image) {
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        media1 = img;
      } else if (elmt.video) {
        const video = document.createElement("video");
        const source = document.createElement("source");
        source.setAttribute("src", picture);
        source.setAttribute("type", "video/mp4");

        media1 = video;
        video.appendChild(source);
      }

      const modalContent = document.querySelector(
        ".modal-content .carousel-container"
      );
      // Fonction immediate IIFE - Closure sur i qui permet de capturer l'index
      ((i) =>
        media1.addEventListener("click", function () {
          modalContent.innerHTML = "";
          const medias = photographerMedia.map((media) =>
            mediaFactory(media, photographer.name)
          );
          medias.forEach((media) => {
            let newDiv = modalContent.appendChild(document.createElement('div'));
            newDiv.appendChild(media.htmlBlock);
            newDiv.appendChild(media.caption);
          });
          modal.style.display = "block";
          currentSlide = i - 1; // ON initialise current slide avec l'index de la photo cliquée
          nextSlide(); // On provoque la translation du slider pour aller sur la bonne slide
        }))(i);

      //Same with enter
      ((i) =>
      document.addEventListener("keypress", function (event) {
        if (event.keyCode == 13 && event.target.dataset.card == "media") {
        modalContent.innerHTML = "";
        const medias = photographerMedia.map((media) =>
          mediaFactory(media, photographer.name)
        );
        medias.forEach((media) => {
          modalContent.appendChild(media);
        });
        modal.style.display = "block";
        currentSlide = i - 1; // ON initialise current slide avec l'index de la photo cliquée
        nextSlide(); // On provoque la translation du slider pour aller sur la bonne slide
      }}))(i);

      // Generate other DOM elements
      const divDetails = document.createElement("div");
      divDetails.setAttribute("class", "divDetails");
      const h2 = document.createElement("h2");
      h2.textContent = title;
      const h3 = document.createElement("h3");
      h3.textContent = likes;
      const button = document.createElement("button");
      button.setAttribute("class", "fas fa-heart");
      button.tabIndex = 1;
      // Incrementing by one the likes' number when clicked on heart
      button.addEventListener("click", function count() {
        if (likeIds.includes(elmt.id)) {
          return;
        }
        likeIds.push(elmt.id);
        elmt.likes += 1;
        h3.textContent = elmt.likes;
        document.querySelector("#myLikes").textContent = `${getLikesNumber(
          photographerMedia
        )}`;
      });

      mediaCardContainer.appendChild(mediaCard);
      mediaCard.appendChild(media1);
      mediaCard.appendChild(divDetails);
      divDetails.appendChild(h2);
      divDetails.appendChild(h3);
      divDetails.appendChild(button);
    }

    return mediaCardContainer;
  }

  return { getUserCardDOM };
}

// Get the datas of all the photographer to push them into the DOM

function getPhotographerDom(data) {
  const { name, portrait, tagline, city, country, price, medias } = data;
  const picture = `Sample Photos/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
    const theDiv = document.createElement("div");
    theDiv.setAttribute("id", "theDiv");
    const myDiv1 = document.createElement("div");
    myDiv1.setAttribute("class", "myDiv1");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3 = document.createElement("h3");
    h3.textContent = city + "," + " " + country;
    const my1p = document.createElement("p");
    my1p.textContent = tagline;
    const myDiv2 = document.createElement("button");
    myDiv2.setAttribute("class", "contact_button");
    myDiv2.tabIndex = 1;
    myDiv2.textContent = "Contactez-moi";
    myDiv2.addEventListener("click", function launchModal() {
      modalbg.style.display = "block";
    });
    // add event listener for contact form
    const myDiv3 = document.createElement("div");
    myDiv3.setAttribute("class", "myDiv2");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    theDiv.appendChild(myDiv1);
    myDiv1.appendChild(h2);
    myDiv1.appendChild(h3);
    myDiv1.appendChild(my1p);
    theDiv.appendChild(myDiv2);
    theDiv.appendChild(myDiv3);
    myDiv3.appendChild(img);
    return theDiv;
  }

  return { getUserCardDOM };
}

// Init all datas and display them

let photographerDetails = [];
let photographer = [];

function sortPhotographerDetails(type) {
  return photographerDetails.sort((d1, d2) => {
    if (type === "date") {
      return d1.date > d2.date ? 1 : -1;
    }

    if (type === "title") {
      return d1.title > d2.title ? 1 : -1;
    }
    if (type === "popularity") {
      return d1.likes < d2.likes ? 1 : -1;
    }
  });
}

function initEvent() {
  const filterSelectForm = document.querySelector("#filterSelect");
  filterSelectForm.addEventListener("change", (e) => {
    photographerDetails = sortPhotographerDetails(e.target.value);
    const cardsDom = getMediaDom(
      photographerDetails,
      photographer
    ).getUserCardDOM();
    const photographerInfoDom = document.querySelector(".photographer_info");
    photographerInfoDom.innerHTML = "";
    photographerInfoDom.appendChild(cardsDom);
  });
}

function nextSlide() {
  const carousel = document.querySelector(".carousel-container");
  currentSlide += 1;
  if (currentSlide === nbMedias) {
    currentSlide = 0;
  }
  carousel.style.transform = `translateX(-${currentSlide * 300}px)`;
}

function previousSlide() {
  const carousel = document.querySelector(".carousel-container");
  currentSlide -= 1;
  if (currentSlide === -1) {
    currentSlide = nbMedias - 1;
  }
  carousel.style.transform = `translateX(-${currentSlide * 300}px)`;
}

function initCarouselEvent() {
  const next = document.querySelector(".next");
  const previous = document.querySelector(".prev");

  next.addEventListener("click", nextSlide);
  previous.addEventListener("click", previousSlide);
}

function init(phDetails) {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const photographers = fetch(
    "https://theodotcom.github.io/FishEye/data/photographers.json"
  )
    .then((res) => res.json())
    .then((data) => {
      const pageId = searchParams.get("id");
      if (phDetails.length === 0) {
        photographerDetails = data.media.filter(
          (media) => media.photographerId == pageId
        );
      } else {
        photographerDetails = phDetails;
      }
      photographer = data.photographers.find(
        (photographer) => photographer.id == pageId
      );
      nbMedias = photographerDetails.length;
      displayPhotographerData(photographer);
      displayMediasData(photographerDetails, photographer);
      initEvent();
      initCarouselEvent();
    });
}

init([]);

// function to iterates likes from each photographer

function getLikesNumber(photographerMedia) {
  return photographerMedia.reduce(function (_this, val) {
    return _this + val.likes;
  }, 0);
}

// Accessibility from keyboard into caroussel
window.onkeyup = function (e) {
  if (e.keyCode == 27) {
    modal.style.display = "none";
  } else if (e.keyCode == 39) {
    nextSlide();
  } else if (e.keyCode == 37) {
    previousSlide();
  }
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", function () {
  modal.style.display = "none";
});

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".contact_button");
const buttonX = document.querySelectorAll(".close1");
const formData = document.querySelectorAll(".formData");
const validMsg = document.querySelectorAll(".valid-msg");

// launch modal form
const launchModal = () => {
  modalbg.style.display = "block";
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal form : click on (X)
const closeModal = () => {
  modalbg.style.display = "none";
};

// bouton(X) event : listen when buttonX is clicked and start function "closeModal"
buttonX.forEach((close) => close.addEventListener("click", closeModal));

// submit event : écoute de l'évenement "submit" du formulaire qui lance la fonction "validate"
document.getElementById("formulaire").addEventListener("submit", validate);

// Checking input before validating and sending form results
function validate(e) {
  e.preventDefault(); //to prevent page from recharging
  if (first.value == "" || first.value.length < 2) {
    formData[0].dataset.errorVisible = true;
    return false;
  }
  if (last.value == "" || last.value.length < 2) {
    formData[1].dataset.errorVisible = true;
    return false;
  }
  if (email.value == "" ) {
    formData[2].dataset.errorVisible = true;
    return false;
  } 
  if (story.value == "" ) {
    formData[3].dataset.errorVisible = true;
    return false;
  } 
  else {
    modalbg.innerHTML = " Votre message a bien été transmis. Merci";
    modalbg.classList.add("valid-msg");
    return true; // form is send
  }
}

// close the modal after submitting it
const closeBground = () => {
  modalbg.style.display = "none";
};

//The input event fires when the value of an <input>, <select>, or <textarea> element has been changed
//start the Error function
formData.forEach((formData) => formData.addEventListener("input", error));

//modal input error visible or not : starts the errorvisible from css when input is not valid or empty
//es5 because of the this property not the same in =>
function error(e) {
  const validity = e.target.validity;
  if (!validity.valid || e.target.value === "") {
    this.dataset.errorVisible = "true";
  } else {
    this.dataset.errorVisible = "false";
  }
}

//modal change event : listen to "change" and starts function "DataError"
formData.forEach((formData) => formData.addEventListener("change", DataError));

//modal error messages
function DataError(e) {
  const validity = e.target.validity;
  if (validity.valid) {
    this.dataset.error = "";
  } else {
    formData[0].dataset.error = "Un prénom c'est au moins deux caractères";
    formData[1].dataset.error = "Veuillez saisir au moins deux caractères";
  }
}

// close the validation message

window.onclick = function (event) {
  if (event.target == modalbg) {
    modalbg.style.display = "none";
  }
};

const closeBground2 = () => {
  modalbg.style.display = "none";
};
