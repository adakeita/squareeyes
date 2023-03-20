const apiKey = "4f8ed672bca5d88dde2fcbb70a60657c";

const baseUrl = 'https://api.themoviedb.org/3';

const movieIds = [
    481084,
    646385,
    384018,
    463843,
    301528,
    414906,
    466272,
    373571
];

// Select the container elements in your HTML
const newMoviesContainer = document.querySelector(".new_movies_container .movie-container");
const yourMoviesContainer = document.querySelector(".your_movies_container .movie-container");

movieIds.forEach((movieId, index) => {
    const movieUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`;

    fetch(movieUrl)
        .then((response) => response.json())
        .then((movie) => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            const movieTitle = document.createElement("h2");
            movieTitle.classList.add("movie-title");
            movieTitle.textContent = movie.title;

            const moviePrice = document.createElement("p");
            moviePrice.classList.add("movie-price");
            moviePrice.textContent = "$" + Math.floor(Math.random() * 10 + 1) + ".99";

            const moviePosterWrapper = document.createElement("div");
            moviePosterWrapper.classList.add("movie-poster-wrapper");

            const moviePoster = document.createElement("img");
            moviePoster.classList.add("movie-poster");
            moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            moviePoster.alt = `${movie.title} poster`;

            if (index < 4) {
                newMoviesContainer.appendChild(movieCard);
            } else {
                yourMoviesContainer.appendChild(movieCard);
            }

            movieCard.appendChild(movieTitle);
            movieCard.appendChild(moviePosterWrapper);
            moviePosterWrapper.appendChild(moviePoster);
            movieCard.appendChild(moviePrice);
        })
        .catch((error) => {
            console.error("Error fetching movie data:", error);
        });
});
