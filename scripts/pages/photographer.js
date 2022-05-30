/* eslint-disable require-jsdoc */
import {getMediaDom} from '../factories/page.js';
import {initCarouselEvent} from '../factories/page.js';
const modal = document.getElementById('myModal');
const modalbg = document.querySelector('.bground');
const span = document.getElementsByClassName('close')[0];
let currentSlide = 0;
let nbMedias = 0;
let photographerDetails = [];
let photographer = [];

// Display Photographer Data into the Header of his own page
async function displayPhotographerData(photographer) {
  const photographerSection = document.querySelector('.photograph-header');
  if (photographerSection) {
    photographerSection.innerHTML = '';
  }
  const photographerModel = getPhotographerDom(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographerSection.appendChild(userCardDOM);
}

// Display Each medias of the photographer
async function displayMediasData(photographerDetails, photographer) {
  const mediaSection = document.querySelector('.photographer_info');
  const mediaModel = getMediaDom(photographerDetails, photographer);
  const userCardDOM = mediaModel.getUserCardDOM();
  mediaSection.appendChild(userCardDOM);
}


// Get the datas of all the photographer to push them into the DOM

function getPhotographerDom(data) {
  const {name, portrait, tagline, city, country} = data;
  const picture = `Sample Photos/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
    const theDiv = document.createElement('div');
    theDiv.setAttribute('id', 'theDiv');
    const myDiv1 = document.createElement('div');
    myDiv1.setAttribute('class', 'myDiv1');
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const h3 = document.createElement('h3');
    h3.textContent = city + ',' + ' ' + country;
    const my1p = document.createElement('p');
    my1p.textContent = tagline;
    const myDiv2 = document.createElement('button');
    myDiv2.setAttribute('class', 'contact_button');
    myDiv2.tabIndex = 1;
    myDiv2.textContent = 'Contactez-moi';
    myDiv2.addEventListener('click', function launchModal() {
      modalbg.style.display = 'block';
    });
    // add event listener for contact form
    const myDiv3 = document.createElement('div');
    myDiv3.setAttribute('class', 'myDiv2');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    theDiv.appendChild(myDiv1);
    myDiv1.appendChild(h2);
    myDiv1.appendChild(h3);
    myDiv1.appendChild(my1p);
    theDiv.appendChild(myDiv2);
    theDiv.appendChild(myDiv3);
    myDiv3.appendChild(img);
    return theDiv;
  }

  return {getUserCardDOM};
}


function sortPhotographerDetails(type) {
  return photographerDetails.sort((d1, d2) => {
    if (type === 'date') {
      return d1.date > d2.date ? 1 : -1;
    }

    if (type === 'title') {
      return d1.title > d2.title ? 1 : -1;
    }
    if (type === 'popularity') {
      return d1.likes < d2.likes ? 1 : -1;
    }
  });
}

function initEvent() {
  const filterSelectForm = document.querySelector('#filterSelect');
  filterSelectForm.addEventListener('change', (e) => {
    photographerDetails = sortPhotographerDetails(e.target.value);
    const cardsDom = getMediaDom(
        photographerDetails,
        photographer,
    ).getUserCardDOM();
    const photographerInfoDom = document.querySelector('.photographer_info');
    photographerInfoDom.innerHTML = '';
    photographerInfoDom.appendChild(cardsDom);
  });
}

function nextSlide() {
  const carousel = document.querySelector('.carousel-container');
  currentSlide += 1;
  if (currentSlide === nbMedias) {
    currentSlide = 0;
  }
  carousel.style.transform = `translateX(-${currentSlide * 300}px)`;
}

function previousSlide() {
  const carousel = document.querySelector('.carousel-container');
  currentSlide -= 1;
  if (currentSlide === -1) {
    currentSlide = nbMedias - 1;
  }
  carousel.style.transform = `translateX(-${currentSlide * 300}px)`;
}


function init(phDetails) {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  fetch(
      'https://theodotcom.github.io/FishEye/data/photographers.json',
  )
      .then((res) => res.json())
      .then((data) => {
        const pageId = searchParams.get('id');
        if (phDetails.length === 0) {
          photographerDetails = data.media.filter(
              (media) => media.photographerId == pageId,
          );
        } else {
          photographerDetails = phDetails;
        }
        photographer = data.photographers.find(
            (photographer) => photographer.id == pageId,
        );
        nbMedias = photographerDetails.length;
        displayPhotographerData(photographer);
        displayMediasData(photographerDetails, photographer);
        initEvent();
        initCarouselEvent();
      });
}

init([]);


// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Accessibility from keyboard into caroussel
window.onkeyup = function(e) {
  if (e.keyCode == 27) {
    modal.style.display = 'none';
  } else if (e.keyCode == 39) {
    nextSlide();
  } else if (e.keyCode == 37) {
    previousSlide();
  }
};


