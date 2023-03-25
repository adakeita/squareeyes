const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
const exitCartBtn = document.querySelector(".exit-container")
const cartContainer = document.querySelector(".cart-container");
const itemsContainer = cartContainer.querySelector(".items-container");
const cartItem = document.querySelector(".cart-item")
const viewCartBtn = document.querySelector('.view-cart-btn');
const checkoutBtns = document.querySelectorAll(".checkout-btn");
const cartKey = `cartItems-${currentUser}`;
const buyNowBtn = document.getElementById("buy-now-btn");

// Load cart items from localStorage on page load
let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

function addToCart(movieDetails) {
    const movieId = movieDetails.id;

    // Check if movie is already in cart
    const existingMovie = cartItems.find(item => item.id === movieId);
    if (existingMovie) {
        console.log(`Movie ${movieId} is already in cart.`);
        return;
    }

    const movie = {
        id: movieId,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path,
        price: moviePrices[movieDetails.id]
    };

    cartItems.push(movie);
    localStorage.setItem(cartKey, JSON.stringify(cartItems));

    // Render cart items
    renderCart();
}

function removeFromCart(movieId) {
    cartItems = cartItems.filter(item => item.id !== movieId);
    localStorage.setItem(cartKey, JSON.stringify(cartItems));

    // Render cart items
    renderCart();

    // If cart is empty, hide the cart container and exit button
    if (cartItems.length === 0) {
        cartItem.innerHTML.textContent("No Movies in cart");
    }
}

function calculateTotal() {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    return total.toFixed(2);
}

function renderCart() {
    const itemsContainer = document.querySelector(".items-container");
    const totalContainer = document.querySelector(".total-container");

    cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Clear previous items
    itemsContainer.innerHTML = "";

    // Render cart items
    cartItems.forEach(item => {
        const movie = document.createElement("div");
        movie.classList.add("cart-movie");
        movie.setAttribute("data-id", item.id);

        // Add movie image wrapper
        const movieImageWrapper = document.createElement("div");
        movieImageWrapper.classList.add("cart-movie-image-wrapper");
        movieImageWrapper.classList.add("cart-movie-item");
        movie.appendChild(movieImageWrapper);

        // Add movie image
        const movieImage = document.createElement("img");
        movieImage.classList.add("cart-movie-image");
        movieImage.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        movieImage.alt = `${item.title} poster`;
        movieImageWrapper.appendChild(movieImage);

        // Add movie price
        const moviePrice = document.createElement("p");
        moviePrice.classList.add("cart-movie-item");
        moviePrice.textContent = "$ " + item.price.toFixed(2);
        movie.appendChild(moviePrice);

        // Add remove button
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("cart-movie-remove");
        removeBtn.classList.add("cart-movie-item");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            removeFromCart(item.id);
        });
        movie.appendChild(removeBtn);

        itemsContainer.appendChild(movie);
    });

    totalContainer.textContent = `Total: $${calculateTotal()}`;
}

// Render cart items on page load
renderCart();

if (viewCartBtn) {
    // Add event listener to "View Cart" button
    viewCartBtn.addEventListener('click', () => {
        // Show cart container and exit button
        cartContainer.classList.remove('hidden');
        exitCartBtn.classList.remove('hidden');

        // Render cart items
        renderCart();
    });
}


addToCartBtn.forEach(addToCartBtn => {
    addToCartBtn.addEventListener('click', event => {
        cartContainer.classList.remove('hidden');
        exitCartBtn.classList.remove("hidden");

        // Get movie details
        const params = new URLSearchParams(window.location.search);
        const movieId = params.get("id");
        console.log("movieId:", movieId);

        if (movieId) {
            const movieDetailsUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`;

            fetch(movieDetailsUrl)
                .then(response => response.json())
                .then(movieDetails => {
                    addToCart(movieDetails);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });
});

exitCartBtn.addEventListener('click', () => {
    cartContainer.classList.add('hidden');
    exitCartBtn.classList.add('hidden');
});

function checkout() {
    // Calculate total cost of purchased movies
    const total = calculateTotal();

    // Create array of purchased movie titles
    const purchasedTitles = cartItems.map(item => item.title);

    const ownedMovies = purchasedMovies.filter(item => purchasedTitles.includes(item.title));
    if (ownedMovies.length > 0) {
        // Remove movies that user already owns from the cart
        const newCartItems = cartItems.filter(item => !ownedMovies.map(m => m.title).includes(item.title));
        if (newCartItems.length === 0) {
            alert(`You already own all the movies in your cart.`);
            return;
        } else {
            // Display alert with removed movie titles
            const ownedMovieTitles = ownedMovies.map(item => item.title).join('\n');
            const message = `You already own the following movies:\n\n${ownedMovieTitles}\n\nThe following movies have been removed from your cart:\n\n${cartItems.filter(item => !newCartItems.includes(item)).map(item => item.title).join('\n')}`;
            alert(message);
            cartItems = newCartItems;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }

    // Display confirmation message with titles and total
    const confirmMessage = `Are you sure you want to purchase the following movies?\n\n${purchasedTitles.join("\n")}\n\nTotal: $${total}`;
    const confirmed = confirm(confirmMessage);

    // Save purchased movies to local storage and clear cart
    if (confirmed) {
        purchasedMovies.push(...cartItems);
        localStorage.setItem(`purchasedItems-${currentUser}`, JSON.stringify(purchasedMovies));

        cartItems = [];
        localStorage.removeItem("cartItems");

        // Render empty cart
        renderCart();

        // Hide cart and exit button
        cartContainer.classList.add("hidden");
        exitCartBtn.classList.add("hidden");
        alert(`Thank you for your purchase!\n\nYour movies can be found on your profile page.`);
    }

}
console.log("cartItems:", cartItems);
checkoutBtns.forEach(btn => {
    btn.addEventListener("click", checkout);
});



if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
        const params = new URLSearchParams(window.location.search);
        const movieId = params.get("id");

        if (movieId) {
            const movieDetailsUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`;

            fetch(movieDetailsUrl)
                .then((response) => response.json())
                .then((movieDetails) => {
                    addToCart(movieDetails);
                    checkout();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    });
}


const myMoviesContainer = document.querySelector("#myMovies");

// Render purchased movies
purchasedMovies.forEach(movie => {
    if (myMoviesContainer) {
        if (purchasedMovies.length === 0) {
            const messageElement = document.createElement("p");
            messageElement.textContent = "You haven't purchased any movies yet.";
            myMoviesContainer.appendChild(messageElement);
        } else {
            purchasedMovies.forEach(movie => {
                const movieElement = document.createElement("div");
                movieElement.classList.add("my-movie");

                const movieTitle = `<h3 class="my-movie-title">${movie.title}</h3>`;
                const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

                // Construct URL for movie video clip using TMDB API
                const videoUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`;
                fetch(videoUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.results.length > 0) {
                            const videoKey = data.results[0].key;
                            const posterImage = `<a href="https://www.youtube.com/watch?v=${videoKey}" target="_blank"><img src="${posterUrl}" alt="${movie.title} poster" class="my-movie-poster"></a>`;

                            const posterContainer = document.createElement("div");
                            posterContainer.classList.add("my-movie-poster-container");
                            posterContainer.innerHTML = posterImage;

                            movieElement.innerHTML += movieTitle;
                            movieElement.appendChild(posterContainer);
                            myMoviesContainer.appendChild(movieElement);
                        } else {
                            // If there are no video results, display movie poster without link
                            const posterImage = `<img src="${posterUrl}" alt="${movie.title} poster" class="my-movie-poster">`;
                            movieElement.innerHTML += movieTitle;
                            movieElement.innerHTML += posterImage;
                            myMoviesContainer.appendChild(movieElement);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        // If there is an error, display movie poster without link
                        const posterImage = `<img src="${posterUrl}" alt="${movie.title} poster" class="my-movie-poster">`;
                        movieElement.innerHTML += movieTitle;
                        movieElement.innerHTML += posterImage;
                        myMoviesContainer.appendChild(movieElement);
                    });
            });
        }
    }
});
