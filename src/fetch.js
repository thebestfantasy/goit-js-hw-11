import axios from 'axios';

export async function fetchPictures(searchQuery, page){
    const BASE_URL = 'https://pixabay.com/api/?';
    const KEY = '36982386-348bf5f111e16de042d4f4c47';
    const FILTER = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

    try {
        return await axios.get(`${BASE_URL}key=${KEY}&page=${page}&q=${searchQuery}&${FILTER}`)
    } catch (err){
        console.error(err.message);
    }
}