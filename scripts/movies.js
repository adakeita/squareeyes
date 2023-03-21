const apiKey = "4f8ed672bca5d88dde2fcbb70a60657c";
const baseUrl = "https://api.themoviedb.org/3";
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
const [newMoviesContainer, yourMoviesContainer] = document.querySelectorAll(".browse_index_row");

function createMovieCard(movie) {
    const movieCardHtml = `
        <div class="movie-card">
            <h2 class="movie-title">${movie.title}</h2>
            <div class="movie-poster-wrapper">
                <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster" data-id="${movie.id}">
            </div>
            <div class="bottom-movie-card-container">
                 <div class="pricewrapper">
                     <p class="movie-price">$${Math.floor(Math.random() * 10 + 1)}.99</p>
                  </div>
               <button id="cart-browseindex-btn" class="browseindex-cart-btn add-to-cart-btn">
                 <a class="cart-link-tag" href="#">
                    <div class="add-cart-btn buy-image-wrapper info-btn-image-wrapper">
                        <img class="info-btn-image cart-btn-image" src="./iconsbuttons/add-to-cart.png"
                                alt="button to cart">
                    </div>
                  </a>
                </button>
            </div>
        </div>
    `;
    const movieCard = document.createElement("div");
    movieCard.innerHTML = movieCardHtml.trim();
    return movieCard;
}

async function fetchMovieData(movieId) {
    const movieUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`;

    try {
        const response = await fetch(movieUrl);
        const movie = await response.json();
        return movie;
    } catch (error) {
        console.error("Error fetching movie data:", error);
        return null;
    }
}

movieIds.forEach(async (movieId, index) => {
    const movie = await fetchMovieData(movieId);

    if (!movie) {
        return;
    }

    const movieCard = createMovieCard(movie);

    if (newMoviesContainer && yourMoviesContainer) {
        if (index < 4) {
            newMoviesContainer.appendChild(movieCard);
        } else {
            yourMoviesContainer.appendChild(movieCard);
        }

        const moviePoster = movieCard.querySelector(".movie-poster");
        moviePoster.addEventListener("click", () => {
            window.location.href = `aboutmovie.html?id=${movie.id}`;
        });
    }
});

window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");
    console.log("movieId:", movieId);

    if (movieId) {
        const movieDetailsContainer = document.querySelector(".movie-details");
        console.log("movieDetailsContainer:", movieDetailsContainer);
        const movieDetailsUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`;

        fetch(movieDetailsUrl)
            .then(response => response.json())
            .then(movieDetails => {
                const movieTitle = document.createElement("h2");
                movieTitle.classList.add("movie-info-title");
                movieTitle.textContent = movieDetails.title;

                const overviewWrapper = document.querySelector(".info-overview-wrapper");
                console.log("overviewWrapper:", overviewWrapper);

                const headerPriceWrapper = document.createElement("div");
                headerPriceWrapper.classList.add("header-price-wrapper");
                overviewWrapper.appendChild(headerPriceWrapper);

                const overviewHeader = document.createElement("div");
                overviewHeader.classList.add("overview-header");
                headerPriceWrapper.appendChild(overviewHeader);

                const oH3 = document.createElement("h3");
                oH3.classList.add("o-h3");
                oH3.textContent = "Movie Overview";
                overviewHeader.appendChild(oH3);

                const moviePrice = document.createElement("p");
                moviePrice.classList.add("movie-info-price");
                moviePrice.textContent = "Price $" + Math.floor(Math.random() * 10 + 1) + ".99";
                headerPriceWrapper.appendChild(moviePrice);
                const movieOverview = document.createElement("p");
                movieOverview.classList.add("movie-overview");
                movieOverview.textContent = movieDetails.overview;
                overviewWrapper.appendChild(movieOverview);

                const movieVideosUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`;
                fetch(movieVideosUrl)
                    .then(response => response.json())
                    .then(videoData => {
                        const videoResults = videoData.results;
                        const clip = videoResults.find(result => result.type === "Trailer" && result.site === "YouTube");

                        let videoWrapper, video, moviePosterWrapper, moviePoster;

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
                            moviePosterWrapper = document.createElement("div");
                            moviePosterWrapper.classList.add("image-wrapper");

                            moviePoster = document.createElement("img");
                            moviePoster.classList.add("movie-info-poster");
                            moviePoster.src = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
                            moviePoster.alt = `${movieDetails.title} poster`;
                            moviePosterWrapper.appendChild(moviePoster);
                        }

                        movieDetailsContainer.appendChild(movieTitle);

                        if (clip) {
                            movieDetailsContainer.appendChild(videoWrapper);
                            videoWrapper.appendChild(video);
                        } else {
                            movieDetailsContainer.appendChild(moviePosterWrapper);
                            moviePosterWrapper.appendChild(moviePoster);
                        }

                        const cartBtn = document.querySelector("#cart-aboutmovie-btn");
                        if (cartBtn) {

                            cartBtn.addEventListener("click", () => {
                                const movieTitle = document.querySelector(".movie-info-title").textContent;
                                const moviePrice = document.querySelector(".movie-info-price").textContent;
                                const movieImage = document.querySelector(".movie-info-poster") ? document.querySelector(".movie-info-poster").src : "";
                                addToCart(movieId, movieTitle, moviePrice, movieImage);

                                cartContainer.classList.remove("hidden");
                                exitContainer.classList.remove("hidden");

                            });
                            
                            exitContainer.addEventListener("click", () => {
                                cartContainer.classList.add("hidden");
                            });
                            
                        }
                        (error => console.error("Error fetching movie videos data:", error));
                    })
                    .catch(error => console.error("Error fetching movie data:", error));
            })
    }
})
