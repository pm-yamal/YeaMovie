const apiKey = 'fba555e5-af26-4d51-b4b3-6fa25a1d965a';
const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
};

// запрос через fetch (по умолчанию)
// fetch(url + 'collections', options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))

// запрос через асинхронную ф-ию
async function fetchAndRenderFilms () {
    try {
        const response = await fetch(url + 'collections', options);
        const data = await response.json();
        console.log(data);
        console.log(data.items);
        for (item of data.items) {
            console.log(item);
            const html = `<div class="card">
            <img src=${item.posterUrlPreview} alt="Обливион" class="card__img">
            <h3 class="card__title">${item.nameRu}</h3>
            <p class="card__year">${item.year}</p>
            <p class="card__rate">Рейтинг: ${item.ratingKinopoisk}</p>
            </div>`;
            filmsWrapper.insertAdjacentHTML('beforeend', html);
        }
    } 
    catch (err) {
        console.log(err);
    }
}
fetchAndRenderFilms();

// поиск э-та с классом .films
const filmsWrapper = document.querySelector('.films');