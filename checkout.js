const checkoutContainer = document.querySelector('#checkout-container');
const movieIds = JSON.parse(localStorage.getItem('checkoutMovies'));

if (movieIds) {
    for (const movieId of movieIds) {
        const movie = JSON.parse(sessionStorage.getItem(movieId));
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
          <img src="${movie.imageUrl}" alt="${movie.title} image">
          <h3>${movie.title}</h3>
          <p class="price">${movie.price}</p>
        `;
        checkoutContainer.appendChild(movieItem);
    }
} else {
    checkoutContainer.textContent = 'No movies selected for checkout.';
}