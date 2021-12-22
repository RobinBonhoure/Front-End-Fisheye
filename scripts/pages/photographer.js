//Mettre le code JavaScript lié à la page photographer.html

let url = new URL(window.location.href);
let photographerIdUrl = url.searchParams.get("id");

async function openNew(photographers, photos) {

  // photographers
  const selectedPhotographer = await filterById(photographers, photographerIdUrl);
  const { name, city, country, tagline, price, portrait } = selectedPhotographer;

  // photos du photographe
  const selectedPhotos = photos.filter(obj => obj.photographerId == photographerIdUrl);

  const picturePhotographe = `assets/photographers/${portrait}`;

  // function printPhotos() {
  document.getElementById("h2").innerHTML = name;
  document.getElementById("p1").innerHTML = city + ', ' + country;
  document.getElementById("p2").innerHTML = tagline;
  document.getElementById("img1").src = picturePhotographe;

  const photosSection = document.querySelector("#photo-grid");

  var totalLikes = 0;

  selectedPhotos.forEach((photos) => {
    const { title, video, image, likes, id } = photos;
    totalLikes += likes;
    if (image || video) {
      const div = document.createElement('div');
      div.className = "imgContainer";
      const pictures = `assets/images/${image || video}`;
      const img = document.createElement('img');
      const vid = document.createElement('video');
      if (image) {
        img.setAttribute("src", pictures);
        img.dataset.id = id;
        img.className = "photo";
      }
      if (video) {
        vid.setAttribute("src", pictures);
        vid.dataset.id = id;
        vid.className = "photo";
      }
      const p1 = document.createElement('div');
      const heart = document.createElement('div');
      heart.className = "heartIcon";
      const p2 = document.createElement('div');
      p1.textContent = title;
      p1.className = "imgTitle";
      p2.textContent = likes;
      p2.className = "imgLikes";;
      p2.appendChild(heart);
      if (image) {
        div.appendChild(img);
      }
      if (video) {
        div.appendChild(vid);
      }
      div.appendChild(p1);
      div.appendChild(p2);
      photosSection.appendChild(div);
    }
  })

  document.getElementById("tarif-fixed").innerHTML = price + "€ / jour";
  document.getElementById("likes-fixed").innerHTML = totalLikes;

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

async function displayData2() {
  const photographeHeader = document.querySelector(".photographe-header");
  openNew(arrayPhotographers.photographers, arrayPhotographers.media);
};

async function init2() {
  // Récupère les datas des photographes
  const { photos } = await getPhotos();
  displayData2();
  // check if photos are in the DOM
  let checkExist = setInterval(function () {
    if (document.querySelectorAll('.photo').length) {
      lightBox(photos);
      clearInterval(checkExist);
    }
  }, 100);
};

init2();


// LIGHTBOX
const lightbox = document.querySelector("#lightbox");
const lightboxPhoto = document.querySelector("#lightbox-photo");
const lightboxLeft = document.querySelector("#lightbox-left");
const lightboxRight = document.querySelector("#lightbox-right");
const lightboxClose = document.querySelector("#lightbox-close");
let photoIndice = 0;

// close lightbox
lightboxClose.addEventListener("click", function () {
  lightbox.style.display = "none";
});

// change photo
lightboxLeft.addEventListener("click", function () {
  const selectedPhotos = arrayPhotographers.media.filter(obj => obj.photographerId == photographerIdUrl);
  console.log(selectedPhotos)
  if ((selectedPhotos[(photoIndice + selectedPhotos.length - 1) % selectedPhotos.length].image)) {
    urlPhoto = selectedPhotos[(photoIndice + selectedPhotos.length - 1) % selectedPhotos.length].image;
  }
  if ((selectedPhotos[(photoIndice + selectedPhotos.length - 1) % selectedPhotos.length].video)) {
    urlPhoto = selectedPhotos[(photoIndice + selectedPhotos.length - 1) % selectedPhotos.length].video;
  }
  photoIndice--;
  lightboxPhoto.src = `assets/images/${urlPhoto}`;
});

// open the lightbox
async function lightBox() {
  const classPhotos = document.querySelectorAll(".photo");
  classPhotos.forEach((classPhoto) => {
    classPhoto.addEventListener("click", function () {
      // src de la photo target
      const photoId = this.dataset.id;
      const selectedPhotos = arrayPhotographers.media.filter(obj => obj.photographerId == photographerIdUrl);
      let urlPhoto;

      // find the good photo
      for (var i = 0; i < selectedPhotos.length; i++) {
        if (selectedPhotos[i].id === eval(photoId)) {
          urlPhoto = selectedPhotos[i].image;
          photoIndice = i;
        }
      }

      // show lightbox
      lightboxPhoto.src = `assets/images/${urlPhoto}`;
      lightbox.style.display = "flex";
    });
  });


}


// SELECT BOX
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}