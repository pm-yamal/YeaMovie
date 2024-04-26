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
        }
    } catch (err) {
        console.log(err);
    }
}
fetchAndRenderFilms();

// поиск э-та с классом .films
const filmsWrapper = document.querySelector('.films');
console.log(filmsWrapper);