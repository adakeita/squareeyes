const apiKey = '4f8ed672bca5d88dde2fcbb70a60657c';
const baseUrl = 'https://api.themoviedb.org/3';
const movieIds = [
    481084,
    646385,
    384018,
    // Add more movie IDs here
];
const wpApiUrl = 'http://localhost/flower-power/wp-json/wp/v2/movies';


async function fetchMovieData(movieId) {
    const movieUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`;
    const response = await fetch(movieUrl);
    const movie = await response.json();
    return movie;
}

async function createMoviePost(movie) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa('adakeita:bEWyAWaRFG4UQOic6l9LaIUO'));

    const body = {
        title: movie.title,
        fields: {
            movie_id: movie.id,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            movie_price: '12.99', // Replace with the actual price or logic to fetch the price
        },
    };

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    };

    const response = await fetch(wpApiUrl, requestOptions);
    const responseData = await response.json();

    console.log(`Created movie post: ${responseData.title.rendered}`);
}

async function importMovies() {
    for (const movieId of movieIds) {
        const movieData = await fetchMovieData(movieId);
        await createMoviePost(movieData);
    }
}
