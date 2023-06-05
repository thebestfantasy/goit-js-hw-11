import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPictures } from './fetch.js';
import { createMarkup } from './createMarkup.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const imgList = document.querySelector('.js-list');
const moreBtn = document.querySelector('.js-load-more');
const BASE_URL = 'https://pixabay.com/api/?';
const KEY = '36982386-348bf5f111e16de042d4f4c47';
const FILTER = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
let page = 1;
let searchQuery = '';

const simpleLBoptions = {
    captionsData: "alt",
    captionDelay: 250
};

searchForm.addEventListener('submit', handlerSearch);
moreBtn.addEventListener('click', servicePicture);

function handlerSearch(evt) {
    evt.preventDefault();
    deleteMarkup();

    const data = new FormData(evt.currentTarget);
    const inputValue = data.get('searchQuery').trim();
    
    searchQuery = inputValue;
    
    if (!searchQuery) {
        Notify.failure('Type your query');
        return
    }
    
    page = 1;
    servicePicture(searchQuery);  
    evt.currentTarget.reset();
};

function servicePicture(inputValue) {
    fetchPictures(searchQuery, page)
        .then(resp => {
            if (resp.data.hits.length === 0) {
                moreBtn.style.visibility = 'hidden';
                deleteMarkup();
                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                searchForm.reset();
                return
            }

            if (resp.data.totalHits > 40) {
                moreBtn.style.visibility = 'visible';   
            } 

            if (page * 40 > resp.data.totalHits) {
                moreBtn.style.visibility = 'hidden';
            }
            page += 1;
            imgList.insertAdjacentHTML('beforeend', createMarkup(resp.data.hits));
            gallerySimple.refresh();
            scroll();
            Notify.success(`Hooray! We found ${resp.data.totalHits} images.`);  
        })
        .catch((err) => { 
            console.log(err);
        })
}
    
const gallerySimple = new SimpleLightbox('.gallery a', simpleLBoptions);

function scroll() {
    const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
    });
}

function deleteMarkup() {
    imgList.innerHTML = '';
    return
};
