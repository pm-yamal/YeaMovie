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

        // fetch films data
        const data = await fetchData(url + `collections?page=${page}`, options);

        // увеличение счетчика страниц отображения списка фильмов
        if (data.totalPages > 1) {
            page += 1;
        }               

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
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = item.kinopoiskId;
        // клик по карточке с фильмом
        card.onclick = openFilmDetails;        

        const html = `
        <img src=${item.posterUrlPreview} alt="Обливион" class="card__img">
        <h3 class="card__title">${item.nameRu}</h3>
        <p class="card__year">${item.year}</p>
        <p class="card__rate">Рейтинг: ${item.ratingKinopoisk}</p>
        `;
        card.insertAdjacentHTML('afterbegin', html);
        filmsWrapper.insertAdjacentElement('beforeend', card);        
    }
}

async function openFilmDetails(event) {    
    // получаем id фильма
    const id = event.currentTarget.id;

    // получаем данные по фильму
    const data = await fetchData(url + id, options)
    console.log(data);

    // отображение деталей фильма на странице
    renderFilmData(data);
}

// рендеринг данных о фильме
function renderFilmData(film) {
    console.log('Render!');

    // очистка предыдущего container-right, если открывается второй и последующий фильмы
    const prevContainer = document.querySelector('.container-right');
    prevContainer ? prevContainer.remove() : '';


    // render container-right
    const containerRight = document.createElement('div');
    containerRight.classList.add('container-right');
    document.body.insertAdjacentElement('beforeend', containerRight);

    // кнопка закрытия
    const btnClose = document.createElement('button');
    btnClose.classList.add('btn-close');
    btnClose.innerHTML = '<img src="./img/cross.svg" alt="Close" width="24">';
    containerRight.insertAdjacentElement('afterbegin', btnClose);

    // кнопка закрытия по клику - удаление контейнера со страницы
    btnClose.onclick = () => {
        containerRight.remove();
    }

    // детали фильма
    const html = 
    `<div class="film">
        <div class="film__title">${film.nameRu}</div>
        <div class="film__img">
                <img src=${film.posterUrl} alt=${film.nameRu}>
        </div>
        <div class="film__desc">
            <p class="film__details">Год: ${film.year}</p>
            <p class="film__details">Рейтинг: ${film.ratingKinopoisk}</p>
            <p class="film__details">Продолжительность: ${film.filmLength} мин.</p>
            <p class="film__details">Страна: ${film.countries[0]['country']}</p>    
            <p class="film__text">${film.description}</p>            
        </div>
    </div>`;
    containerRight.insertAdjacentHTML('beforeend', html);
}