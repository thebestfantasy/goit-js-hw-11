const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('#search-form');
const imgList = document.querySelector('.js-list');
const moreBtn = document.querySelector('.js-load-more');
const BASE_URL = 'https://pixabay.com/api/?';
const KEY = '36982386-348bf5f111e16de042d4f4c47';
const FILTER = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
let page = 1;
let currenQuery = '';

searchForm.addEventListener('submit', handlerSearch);

async function handlerSearch(evt) {
    evt.preventDefault();

    const data = new FormData(evt.currentTarget);
    const searchQuery = data.get('searchQuery').trim();
    
    if (!searchQuery) {
        Notify.failure('Type your query');
        return
    }

    currenQuery = searchQuery;
    
    const URL = `${BASE_URL}key=${KEY}&page=${page}&q=${searchQuery}&${FILTER}`;
    servicePicture(URL);
   
    moreBtn.addEventListener('click', () => {
        page += 1;
        servicePicture(`${BASE_URL}key=${KEY}&page=${page}&q=${searchQuery}&${FILTER}`)
    });
};

async function servicePicture(url, currenQuery, searchQuery) {
    try {
        return await axios.get(url)
            .then(resp => {
                console.log(resp);
                if (resp.data.hits.length === 0) {
                    moreBtn.style.visibility = 'hidden';
                    deleteMarkup();
                    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                    searchForm.reset();
                    return
                }
                else if (resp.data.totalHits > 40) {
                    moreBtn.style.visibility = 'visible';   
                } 
                imgList.insertAdjacentHTML('beforeend', createMarkup(resp.data.hits));
                Notify.success(`Hooray! We found ${resp.data.totalHits} images.`);  
        })

    } catch (err) {
        Notify.failure(err);
    }
}
    
function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="images"/></a>       
        <div class="info">
          <p class="info-item"><b>Likes: ${likes}</b></p>
          <p class="info-item"><b>Views: ${views}</b></p>
          <p class="info-item"><b>Comments: ${comments}</b></p>
          <p class="info-item"><b>Downloads: ${downloads}</b></p>
        </div></div>`).join('')
};

function deleteMarkup() {
    imgList.innerHTML = '';
    return
};
