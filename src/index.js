const axios = require('axios').default;

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
    
    const pictures = await servicePicture(searchQuery);
};

async function servicePicture(str) {
    const urlQuery = `${BASE_URL}key=${KEY}&q=${str}&${FILTER}`;
    const response = await axios.get(urlQuery);
    
    // if (!response.ok) {
    //     throw new Error(response.statusText);
    // }

    console.log(response);
    // return response.json();
}
    
function createMarkup(arr) {
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<li>
        <a href="${largeImageURL}"></a>
        <img src="${webformatURL}" alt="${tags}" />
        <div>
          <p><b>Likes: ${likes}</b></p>
          <p><b>Views: ${views}</b></p>
          <p><b>Comments: ${comments}</b></p>
          <p><b>Downloads: ${downloads}</b></p>
        </div>
      </li>`)
};

function deleteMarkup() {
    imgList.innerHTML = '';
    return
};
