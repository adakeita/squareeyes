import { purchasedMovies, myMoviesContainer } from './globals.js';

// Render purchased movies
if (myMoviesContainer) {
    purchasedMovies.forEach(movie => {
        if (movie) {
            const movieElement = document.createElement("div");
            movieElement.classList.add("my-movie");

            const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            const posterImage = `<img src="${posterUrl}" alt="${movie.title} poster" class="my-movie-poster">`;
            const movieTitle = `<h3 class="my-movie-title">${movie.title}</h3>`;

            const posterContainer = document.createElement("div");
            posterContainer.classList.add("my-movie-poster-container");
            posterContainer.innerHTML = posterImage;

            movieElement.innerHTML += movieTitle;
            movieElement.appendChild(posterContainer);
            myMoviesContainer.appendChild(movieElement);
        }
    });
}

//FAQ
const faq = document.querySelectorAll(".faq-question");

faq.forEach((item) => {
    const toggle = item.querySelector(".faq-toggle");

    item.addEventListener("click", () => {
        // Toggle between adding and removing the "active" class,
        // to highlight the button that controls the panel
        item.classList.toggle("active");

        // Toggle between hiding and showing the active panel
        const answer = item.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";

        // Toggle the plus/minus sign
        toggle.textContent = toggle.textContent === "+" ? "-" : "+";
    });
});
