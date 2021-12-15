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

    var totalLikes = 0;

    selectedPhotos.forEach((photos) => {
        const { title, video, image, likes } = photos;
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


// SELECT BOX
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);