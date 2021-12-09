//Mettre le code JavaScript lié à la page photographer.html

let url = new URL(window.location.href);
let photographerIdUrl = url.searchParams.get("id");

async function openNew(photographers, photos) {

    // photographers
    const selectedPhotographer = await filterById(photographers, photographerIdUrl);
    const { name, id, city, country, tagline, price, portrait } = selectedPhotographer;

    // photos du photographe
    const selectedPhotos = photos.filter(obj => obj.photographerId == photographerIdUrl);

    const picturePhotographe = `assets/photographers/${portrait}`;

    // function printPhotos() {
    document.getElementById("h2").innerHTML = name;
    document.getElementById("p1").innerHTML = city + ', ' + country;
    document.getElementById("p2").innerHTML = tagline;
    document.getElementById("img1").src = picturePhotographe;

    
    const photosSection = document.querySelector("#photo-grid");

    
    console.log(selectedPhotos)


    selectedPhotos.forEach((photos) => {
        const { photographerId, title, image, likes, date, pricePhoto } = photos;
        if (image) {
            // const pictures = `assets/images/${name}/${image}`;
            const pictures = `assets/images/${image}`;
            const img = document.createElement('img');
            img.setAttribute("src", pictures);
            img.dataset.id = id;
            img.className = "photo";
            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            p1.textContent = city + ", " + country;
            p1.className = "city";
            p2.textContent = tagline;
            p2.className = "tagline";;
            photosSection.appendChild(img);
            // photosSection.appendChild(p1);
            // article.appendChild(p2);
        }
    })
}

    function filterById(jsonObject, id) {
        return jsonObject.filter(function (jsonObject) {
            return (jsonObject['id'] == id);
        })[0];
    }

    async function getPhotos() {
        // FETCH

        await fetch('data/photographers.json')
            .then(response => response.json())
            .then(data => {
                arrayPhotographers = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        return (arrayPhotographers)
    }

    async function displayData2(photos) {
        const photographeHeader = document.querySelector(".photographe-header");
        openNew(arrayPhotographers.photographers, arrayPhotographers.media);
    };

    async function init2() {
        // Récupère les datas des photographes
        const { photos } = await getPhotos();
        displayData2(photos);
    };

    init2();