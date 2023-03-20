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
            moviePoster.dataset.id = movie.id;

            if (newMoviesContainer || yourMoviesContainer) {
                if (index < 4) {
                    newMoviesContainer.appendChild(movieCard);
                } else {
                    yourMoviesContainer.appendChild(movieCard);
                }
                movieCard.appendChild(movieTitle);
                movieCard.appendChild(moviePosterWrapper);
                moviePosterWrapper.appendChild(moviePoster);
                movieCard.appendChild(moviePrice);

                moviePoster.addEventListener("click", () => {
                    window.location.href = `aboutmovie.html?id=${movie.id}`;
                });
            }
        })
        .catch((error) => {
            console.error("Error fetching movie data:", error);
        });
});

window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");

    if (movieId) {
        const movieDetailsContainer = document.querySelector(".movie-details");
        const movieDetailsUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`;

        fetch(movieDetailsUrl)
            .then((response) => response.json())
            .then((movieDetails) => {
                const movieTitle = document.createElement("h2");
                movieTitle.classList.add("movie-info-title");
                movieTitle.textContent = movieDetails.title;

                const moviePrice = document.createElement("p");
                moviePrice.classList.add("movie-info-price");
                moviePrice.textContent =
                    "$" + Math.floor(Math.random() * 10 + 1) + ".99";

                const overviewWrapper = document.querySelector(".info-overview-wrapper");
                const movieOverview = document.createElement("p");
                movieOverview.classList.add("movie-overview");
                movieOverview.textContent = movieDetails.overview;
                overviewWrapper.appendChild(movieOverview);

                // Check if there is a video available
                const movieVideosUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`;
                fetch(movieVideosUrl)
                    .then((response) => response.json())
                    .then((videoData) => {
                        const videoResults = videoData.results;
                        const clip = videoResults.find(
                            (result) => result.type === "Trailer" && result.site === "YouTube"
                        );

                        let videoWrapper;
                        let video;

                        if (clip) {
                            videoWrapper = document.createElement("div");
                            videoWrapper.classList.add("video-wrapper");

                            video = document.createElement("iframe");
                            video.classList.add("movie-info-video");
                            video.src = `https://www.youtube.com/embed/${clip.key}?loop=1&controls=1&start=5&mute=1&cc_lang_pref=en&cc_load_policy=1`;
                            video.width = "100%";
                            video.height = "100%";
                            video.allowFullscreen = true;
                            video.allow = "accelerometer; encrypted-media; gyroscope";

                            videoWrapper.appendChild(video);
                        } else {
                            const moviePosterWrapper = document.createElement("div");
                            moviePosterWrapper.classList.add("image-wrapper");

                            const moviePoster = document.createElement("img");
                            moviePoster.classList.add("movie-info-poster");
                            moviePoster.src = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
                            moviePoster.alt = `${movieDetails.title} poster`;
                            moviePosterWrapper.appendChild(moviePoster);
                        }

                        movieDetailsContainer.appendChild(movieTitle);
                        movieDetailsContainer.appendChild(moviePrice);
                        if (videoWrapper && video) {
                            movieDetailsContainer.appendChild(videoWrapper);
                             videoWrapper.appendChild(video);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching movie videos data:", error);
                    });
            });
    }






});
