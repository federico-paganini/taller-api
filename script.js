document.addEventListener("DOMContentLoaded", () => {

    const formsearch = document.getElementById("searchform");
    const API_KEY = 'xHMfiX7lNJHQr1Y-x3067C_pudlkxfPnIK-6sGVW56k';
    const searchBar = document.getElementById("searchbar");
    const API_URL = 'https://api.unsplash.com';
    const imgContainer = document.getElementById("imagen-container");

    formsearch.addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchTerm = searchBar.value.toLowerCase();
        const URL_SEARCH = `/search/photos?query=${searchTerm}&client_id=${API_KEY}`;
        const URL_COMPSE = (API_URL + URL_SEARCH);
        let result = await obtenerImágenes(URL_COMPSE);
        let imgList = result.results;
        console.log(imgList);
        console.log(result);

        if (result.total == 0) {
            imgContainer.innerHTML = `<h1 class="text-center">No se encontraron resultados</h1>`;
        } else {
            imgContainer.innerHTML = "";
            for (i = 0; i < imgList.length; i++) {
                let img = imgList[i].urls.thumb;
                let description = imgList[i].alt_description;
                let alternative = imgList[i].description;
                let fullimg = imgList[i].urls.full;
                imgContainer.innerHTML += `
                <div class="card col-3 mt-3 mb-3 mx-3" style="width: 18rem;">
                    <a href="${fullimg}" class="text-decoration-none text-dark" target="_blank">
                        <img src="${img}" class="card-img-top img-fluid mt-2 rounded custon-height" alt="${alternative}">
                    <div class="card-body">
                        <p class="card-text text-center">${description}</p>
                    </div>
                    </a>
                </div>
                `;
            }
        }
    })

    const aleatorio = document.getElementById("aleatory");

    aleatorio.addEventListener("click", async () => {
        const URL_RANDOM = `/photos/random?client_id=${API_KEY}`;
        const URL_COMPSE = (API_URL + URL_RANDOM);
        let result = await obtenerImágenes(URL_COMPSE);
        console.log(result);
        let imgshow = result.urls.small;
        let altshow = result.alt_description;
        let fullshow = result.urls.full;
        imgContainer.innerHTML = "";
        imgContainer.innerHTML = `
        <div class="container">
            <a href="${fullshow}">
                <img src="${imgshow} alt="${altshow}" class="img-fluid mt-5 mb-5">
            </a>
        </div>
        `;
    })



    async function obtenerImágenes(direct) {
        try {
            const response = await fetch(direct);

            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const datos = await response.json();

            return datos;
        } catch (error) {
            console.error('Error', error);
        }
    }
});