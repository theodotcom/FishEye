function getPhotographers() {
    return fetch('https://theodotcom.github.io/FishEye/data/photographers.json')
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
        });
}

export {
    getPhotographers
}