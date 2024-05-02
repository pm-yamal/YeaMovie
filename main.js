// настройки
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

// DOM эл-ты, поиск э-тов по классам
const filmsWrapper = document.querySelector('.films');
const loader = document.querySelector('.loader-wrapper');
const btnLoadMore = document.querySelector('.show-more');
btnLoadMore.onclick = fetchAndRenderFilms;

// счетчик страниц
let page = 1;

// получение данных через асинхронную ф-ию и вывод фильмов
async function fetchAndRenderFilms() {
    try {
        // show preloader
        loader.classList.remove('none');
        console.log(page);

        // fetch films data
        const data = await fetchData(url + `collections?page=${page}`, options);

        // увеличение счетчика страниц отображения списка фильмов
        if (data.totalPages > 1) {
            page += 1;
        }
        console.log(data);
        console.log(page);        

        // проверка на доп. страницы и отображение кнопки, если страниц больше чем 1
        if (data.totalPages > 1) {
            // отображение кнопки 'Следующие 20 фильмов'
            btnLoadMore.classList.remove('none');            
        }

        // hide preloader
        loader.classList.add('none');

        // render films on page
        renderFilms(data.items);

        // скрытие кнопки 'Следующие 20 фильмов' в конце списка фильмов
        if (page > data.totalPages) {
            btnLoadMore.classList.add('none'); 
        }        
    } 
    catch (err) {
        console.log(err);
    }
}
fetchAndRenderFilms();

// fetch films data
async function fetchData(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

// render films on page
function renderFilms(items) {
    for (item of items) {     
        const html = `<div class="card">
        <img src=${item.posterUrlPreview} alt="Обливион" class="card__img">
        <h3 class="card__title">${item.nameRu}</h3>
        <p class="card__year">${item.year}</p>
        <p class="card__rate">Рейтинг: ${item.ratingKinopoisk}</p>
        </div>`;
        filmsWrapper.insertAdjacentHTML('beforeend', html);
    }
}