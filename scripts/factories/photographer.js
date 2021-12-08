function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.dataset.id = id;
        img.className = "showPhotos";
        const h2 = document.createElement( 'h2' );
        const p1 = document.createElement( 'p' );
        const p2 = document.createElement( 'p' );
        const p3 = document.createElement( 'p' );
        h2.textContent = name;
        h2.dataset.id = id;
        h2.className = "showPhotos";
        p1.textContent = city + ", " + country;
        p1.className = "city";
        p2.textContent = tagline;
        p2.className = "tagline";
        p3.textContent = price + "€/jour";
        p3.className = "price";
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3);
        return (article);
    }
    return {getUserCardDOM}
}