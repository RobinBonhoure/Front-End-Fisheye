//Mettre le code JavaScript lié à la page photographer.html
let clickH2 = document.querySelector('#clickH2');
let clickImg = document.querySelector('#clickImg');

let buttons = document.querySelectorAll('.showPhotos')


function openNew(value, photos) {
    const { name, id, city, country, tagline, price, portrait } = photos[0];
    const { idPhoto, photographerId, title, image, likes, date, pricePhoto } = photos[1];

    const picture = `assets/photographers/${portrait}`;

    // function printPhotos() {
    //     const article = document.createElement( 'article' );
    //     const h2 = document.createElement( 'h2' );
    //     h2.textContent = name;
    //     h2.dataset.id = id;
    //     h2.className = "showPhotos";
    //     article.appendChild(h2);
    //     return (article);
    // }
    // return { name, picture, getUserCardDOM }
}

    // window.location.href = "./photographer.html";
// }


async function getPhotos() {
    var request = new XMLHttpRequest();
    request.open("GET", "data/photographers.json", false);
    request.send(null);
    var my_JSON_object = JSON.parse(request.responseText);
    const photos = [my_JSON_object.media];
    const photographers = [my_JSON_object.photographers];

    return ({
        photos: [...photographers,...photos]
    })
}

async function displayData2(photos) {
    // // launch function with open new location
    buttons.forEach((btn) => {
        btn.addEventListener("click", function() {
            let targetClick = this.getAttribute("data-id");
            openNew(targetClick, photos);
        });
    });
};

async function init2() {
    // Récupère les datas des photographes
    const { photos } = await getPhotos();
    displayData2(photos);
};

init2();