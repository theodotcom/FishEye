import {getNickname} from '../utils/index.js';

// Get medias for the caroussel

export default function mediaFactory(data, photographerName) {
  let htmlBlock;

  const picture = `Sample Photos/${getNickname(photographerName)}/${
    data.image ? data.image : data.video
  }`;

  if (data.image) {
    htmlBlock = document.createElement('img');
    htmlBlock.setAttribute('src', picture);
  } else if (data.video) {
    htmlBlock = document.createElement('video');
    htmlBlock.controls = true;
    const source = document.createElement('source');
    source.setAttribute('src', picture);
    source.setAttribute('type', 'video/mp4');
    htmlBlock.appendChild(source);
    htmlBlock.addEventListener('click', function() {
      htmlBlock.setAttribute('play', true);
    });
  }

  // Create caption
  const caption = document.createElement('p');
  caption.innerHTML = data.title;

  return {htmlBlock, caption};
}
