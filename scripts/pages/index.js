let arrayPhotographers = [];
let buttons;

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json

    // FETCH

    await fetch('data/photographers.json')
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            arrayPhotographers = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    return (arrayPhotographers)
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    // arrayPhotographers = [photographers];


    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    await displayData(photographers);


    // launch new location
    buttons = document.querySelectorAll('.showPhotos');

    buttons.forEach((btn) => {
        btn.addEventListener("click", function () {
            let targetClick = this.getAttribute("data-id");

            window.location='./photographer.html?id='+targetClick;
        });
    });
};

init();


// CHANGE PAGE



