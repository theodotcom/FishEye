const modalbg = document.querySelector('.bground');

// Home Page factory 

export function photographerFactory(data) {
  const {name, portrait, tagline, city, country, price, id} = data;

  const picture = `Sample Photos/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('a');
    article.tabIndex = 0;
    article.href = '#';
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', 'Photo de profil du photographe');
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    const my1p = document.createElement('p');
    my1p.textContent = tagline;
    const my2p = document.createElement('p');
    my2p.textContent = price + '€/jour';
    my2p.setAttribute('class', 'myPrice');
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(my1p);
    article.appendChild(my2p);
    article.addEventListener('click', function() {
      window.location.href = 'photographer.html?id=' + id;
    });
    article.addEventListener('keypress', function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === 'Enter') {
        window.location.href = 'photographer.html?id=' + id;
      }
    });
    return article;
  }
  return {getUserCardDOM};
}

// Header Photographer's page Factory
export function getPhotographerDom(data) {
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

