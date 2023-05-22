const BASE_URL = 'https://api.themoviedb.org/3';
const ENDPOINT = '/trending/movie/week'
const TOKEN = '345007f9ab440e5b86cef51be6397df1'; 

const options = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${TOKEN}`
    }
}

fetch(`${BASE_URL}${ENDPOINT}`, options)
.then(resp => console.log(resp))