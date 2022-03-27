// Display Photographer Data into the Header of his own page
async function displayPhotographerData(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    if (photographerSection) {
        photographerSection.innerHTML = ''
    }

    const photographerModel = getPhotographerDom(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographerSection.appendChild(userCardDOM);
};

// Display Each medias of the photographer
async function displayMediasData(photographerDetails, photographer) {
    const mediaSection = document.querySelector(".photographer_info");
    const mediaModel = getMediaDom(photographerDetails, photographer);
    const userCardDOM = mediaModel.getUserCardDOM();
    mediaSection.appendChild(userCardDOM);
};

//Get the Nickname to be able to reach their datas into json
function getNickname(str) {
    const strArray = str.split(" ");
    strArray.forEach(function (entry) {
        entry += " "
    });
    return strArray[0]
};

let currentMedia

// Get the medias of the photographer to push them into the DOM
function getMediaDom(photographerMedia, photographer) {
    function getUserCardDOM() {
        const mediaCardContainer = document.createElement('div');
        mediaCardContainer.setAttribute("class", "container");

        for (var i = 0; i <= photographerMedia.length - 1; i++) {
            const elmt = photographerMedia[i]
            const {name, likes, title, photographerId} = elmt

            const picture = `Sample Photos/${getNickname(photographer.name)}/${elmt.image ? elmt.image : elmt.video}`;

            const mediaCard = document.createElement('a');
            let media;
            if (elmt.image) {
                const img = document.createElement('img');
                img.setAttribute("src", picture)
                media = img
            } else if (elmt.video) {
                const video = document.createElement('video');
                const source = document.createElement('source');
                source.setAttribute("src", picture)
                source.setAttribute("type", "video/mp4")
                media = video

                video.appendChild(source);
                video.addEventListener('click', function () {
                    source.setAttribute("play", true)
                })
            }
            // Generate other DOM elements
            const divDetails = document.createElement('div');
            divDetails.setAttribute("class", "divDetails");
            const h2 = document.createElement('h2');
            h2.textContent = title;
            const h3 = document.createElement('h3');
            h3.textContent = likes;
            const button = document.createElement('button');
            button.setAttribute("class", "fas fa-heart");
            // Incrementing by one the likes' number when clicked on heart
            button.addEventListener('click', function count() {
                var like = likes
                like = +1
                h3.textContent = likes + like
            })

            mediaCardContainer.appendChild(mediaCard);
            mediaCard.appendChild(media);
            mediaCard.appendChild(divDetails);
            divDetails.appendChild(h2);
            divDetails.appendChild(h3);
            divDetails.appendChild(button);

        }

        return (mediaCardContainer)
    }

    return {getUserCardDOM}

};

// Get the datas of all the photographer to push them into the DOM

function getPhotographerDom(data) {
    const {name, portrait, tagline, city, country, price, medias} = data;
    const picture = `Sample Photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const theDiv = document.createElement('div');
        theDiv.setAttribute("id", "theDiv");
        const myDiv1 = document.createElement('div');
        myDiv1.setAttribute("class", "myDiv1");
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = city + ',' + ' ' + country;
        const my1p = document.createElement('p');
        my1p.textContent = tagline;
        const myDiv2 = document.createElement('div');
        myDiv2.setAttribute("class", "myDiv2");
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        theDiv.appendChild(myDiv1);
        myDiv1.appendChild(h2);
        myDiv1.appendChild(h3);
        myDiv1.appendChild(my1p);
        theDiv.appendChild(myDiv2);
        myDiv2.appendChild(img);
        return (theDiv)
    }

    return {getUserCardDOM}


}

// Init all datas and display them

let photographerDetails = []
let photographer = []

function sortPhotographerDetails(type) {
    return photographerDetails.sort((d1, d2) => {
        if(type === 'title'){
            return d1.title > d2.title ? 1 : -1
        }
        if(type === 'popularity'){
            return d1.likes < d2.likes ? 1 : -1
        }
    })
}

function initEvent(){
    const filterSelectForm = document.querySelector('#filterSelect')
    filterSelectForm.addEventListener('change', (e) => {
        photographerDetails = sortPhotographerDetails(e.target.value)
        const cardsDom = getMediaDom(photographerDetails, photographer).getUserCardDOM()
        const photographerInfoDom = document.querySelector('.photographer_info')
        photographerInfoDom.innerHTML = ''
        photographerInfoDom.appendChild(cardsDom)
    })
}

function init(phDetails) {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const photographers = fetch('../../data/photographers.json')
        .then(res => res.json())
        .then(data => {
            const pageId = searchParams.get('id');
            if (phDetails.length === 0) {
                photographerDetails = data.media.filter(media => media.photographerId == pageId);
            } else {
                photographerDetails = phDetails
            }
            photographer = data.photographers.find(photographer => photographer.id == pageId);
            displayPhotographerData(photographer)
            displayMediasData(photographerDetails, photographer)
            initEvent();

        });
}

init([]);


function onSelectFilterType() {
    const type = document.getElementById("filterSelect").value;
    let test = []
    if (!type) {
        return;
    } else if (type === 'title') {
        test = photographerDetails.sort(function (a, b) {
            var textA = a.title;
            var textB = b.title;
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

    } else if (type === 'popularity') {

        test = photographerDetails.sort(function (a, b) {
            var textA = a.likes;
            var textB = b.likes;
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

    }
    const photographerSection = document.querySelector(".photograph-header");
    if (photographerSection) {
        photographerSection.innerHTML = ''
    }
    init(test)
}
