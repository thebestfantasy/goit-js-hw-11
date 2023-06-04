const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('.search-form');
const imgList = document.querySelector('.js-list');
const BASE_URL = 'https://pixabay.com/api/?';
const KEY = '36982386-348bf5f111e16de042d4f4c47';
const FILTER = 'image_type=photo&orientation=horizontal&safesearch=true';

searchForm.addEventListener('submit', handlerSearchForm)

async function handlerSearchForm(evt) {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    const searchQuery = data.get('searchQuery').trim();
    if (!searchQuery) {
        deleteMarkup();
        return
    }
    
    const pictures = await servicePicture(searchQuery)
        .then(data => 
            imgList.insertAdjacentHTML = ('beforeend', createMarkup(data.hits)))
        
    console.log(pictures);
};

async function servicePicture(str) {
    try {
    const urlQuery = `${BASE_URL}key=${KEY}&q=${str}&${FILTER}`;
    const response = await axios.get(urlQuery);
    
    // if (!response.ok) {
    //     throw new Error(response.statusText);
    // }

        return response.data;
    } catch (err) {
        console.log(err);
    }
}
    
function createMarkup(arr) {
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<a href="${largeImageURL}"></a>
        <img src="${webformatURL}" alt="${tags}" />
        <div>
          <p><b>Likes: ${likes}</b></p>
          <p><b>Views: ${views}</b></p>
          <p><b>Comments: ${comments}</b></p>
          <p><b>Downloads: ${downloads}</b></p>
        </div>`).join('')
};

function deleteMarkup() {
    imgList.innerHTML = '';
    return
};
