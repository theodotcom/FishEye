import {getMediaDom} from '../factories/page.js';
import { getPhotographerDom } from '../factories/photographer.js';
const modal = document.getElementById('myModal');
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

function initCarouselEvent() {
  const next = document.querySelector('.next');
  const previous = document.querySelector('.prev');

  next.addEventListener('click', nextSlide);
  previous.addEventListener('click', previousSlide);
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




init([]);
