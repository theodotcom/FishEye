import {getNickname} from '../utils/index.js';
import mediaFactory from '../factories/media.js';
const modal = document.getElementById('myModal');
const likeIds = [];
let currentSlide = 0;
const nbMedias = 0;

// Factory for Each photographers infos 

export function getMediaDom(photographerMedia, photographer) {
  function getUserCardDOM() {
    const mediaCardContainer = document.createElement('div');
    mediaCardContainer.setAttribute('class', 'container');

    for (var i = 0; i <= photographerMedia.length - 1; i++) {
      const elmt = photographerMedia[i];
      const {likes, title} = elmt;

      // Likes counter
      const likesNumber = getLikesNumber(photographerMedia);
      const likeys = document.getElementById('myLikes');
      likeys.textContent = likesNumber;
      const lover = document.getElementById('likeHeart');
      lover.setAttribute('class', 'fas fa-heart');
      const phPrice = document.getElementById('price');
      phPrice.textContent = photographer.price + 'Euros' + '/' + 'jour';

      const picture = `Sample Photos/${getNickname(photographer.name)}/${
          elmt.image ? elmt.image : elmt.video
      }`;
      const mediaCard = document.createElement('a');
      mediaCard.setAttribute('id', 'myImg');
      mediaCard.tabIndex = 1;
      mediaCard.setAttribute('data-card', 'media');

      let media1;
      if (elmt.image) {
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        media1 = img;
      } else if (elmt.video) {
        const video = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute('src', picture);
        source.setAttribute('type', 'video/mp4');

        media1 = video;
        video.appendChild(source);
      }

      const modalContent = document.querySelector(
          '.modal-content .carousel-container',
      );
        // IIFE - Closure sur i qui permet de capturer l'index
      ((i) =>
        media1.addEventListener('click', function() {
          modalContent.innerHTML = '';
          const medias = photographerMedia.map((media) =>
            mediaFactory(media, photographer.name),
          );
          medias.forEach((media) => {
            const newDiv =
              modalContent.appendChild(document.createElement('div'));
            newDiv.setAttribute('class', 'newDiv');
            newDiv.appendChild(media.htmlBlock);
            newDiv.appendChild(media.caption);
          });
          modal.style.display = 'block';
          currentSlide = i - 1;
          // ON initialise current slide avec l'index de la photo cliquée
          nextSlide();
          // On provoque la translation du slider pour aller sur la bonne slide
        }))(i);

      // Same with enter
      ((i) =>
        document.addEventListener('keypress', function(event) {
          if (event.keyCode == 13 && event.target.dataset.card == 'media') {
            modalContent.innerHTML = '';
            const medias = photographerMedia.map((media) =>
              mediaFactory(media, photographer.name),
            );
            medias.forEach((media) => {
              const newDiv =
                modalContent.appendChild(document.createElement('div'));
              newDiv.setAttribute('class', 'newDiv');
              newDiv.appendChild(media.htmlBlock);
              newDiv.appendChild(media.caption);
            });
            modal.style.display = 'block';
            currentSlide = i - 1;
            nextSlide();
          }
        }))(i);

      // Generate other DOM elements
      const divDetails = document.createElement('div');
      divDetails.setAttribute('class', 'divDetails');
      const h2 = document.createElement('h2');
      h2.textContent = title;
      const h3 = document.createElement('h3');
      h3.textContent = likes;
      h3.ariaLabel = `${likes} like`;
      const button = document.createElement('button');
      button.setAttribute('class', 'fas fa-heart');
      button.tabIndex = 1;
      button.ariaLabel = 'jaime';
      // Incrementing by one the likes' number when clicked on heart
      button.addEventListener('click', function count() {
        if (likeIds.includes(elmt.id)) {
          return;
        }
        likeIds.push(elmt.id);
        elmt.likes += 1;
        h3.textContent = elmt.likes;
        document.querySelector('#myLikes').textContent = `${getLikesNumber(
            photographerMedia,
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

  return {getUserCardDOM};
}

// function to iterates likes from each photographer

function getLikesNumber(photographerMedia) {
  return photographerMedia.reduce(function(_this, val) {
    return _this + val.likes;
  }, 0);
}

function nextSlide() {
  const carousel = document.querySelector('.carousel-container');
  currentSlide += 1;
  if (currentSlide === nbMedias) {
    currentSlide = 0;
  }
  carousel.style.transform = `translateX(-${currentSlide * 500}px)`;
}


