async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    var request = new XMLHttpRequest();
    request.open("GET", "data/photographers.json", false);
    request.send(null);
    var my_JSON_object = JSON.parse(request.responseText);
    // request.onreadystatechange = function () {
    //     if (request.readyState === 4 && request.status === 200) {
    //         var my_JSON_object = JSON.parse(request.responseText);
    //         console.log(my_JSON_object);
    //     }
    // }
    const photographers = [my_JSON_object.photographers];
    
    console.log(photographers)
    return ({
        photographers: [...photographers[0]]
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
