const viewCartBtn = document.querySelector(".cart-image-wrapper");
const addToCartBtn = document.querySelector(".cart-btn");
const checkoutBtn = document.querySelector(".checkout-btn");
const cartContainer = document.querySelector(".cart-container");
const exitContainer = document.querySelector(".exit-container");
const itemsContainer = document.querySelector(".items-container");
const buyNowBtn = document.querySelectorAll('.cart_image_wrapper');

if (viewCartBtn) {
    viewCartBtn.addEventListener("click", () => {
        cartContainer.classList.remove("hidden");
        exitContainer.classList.remove("hidden");
        showCartItems();
    });

    exitContainer.addEventListener("click", () => {
        cartContainer.classList.add("hidden");
    });
}

function showCartItems() {
    if (!cartContainer) {
        return;
    }

    const cartItemsContainer = cartContainer.querySelector('.items-container');
    cartItemsContainer.innerHTML = '';

    const movieKeys = Object.keys(sessionStorage).filter(key => key.startsWith('movie-'));

    if (movieKeys.length === 0) {
        const noItemsMsg = document.createElement('p');
        noItemsMsg.classList.add('no-items-msg');
        noItemsMsg.textContent = 'No movies in cart';
        cartItemsContainer.appendChild(noItemsMsg);
        return;
    }

    movieKeys.forEach(key => {
        const movieDetails = JSON.parse(sessionStorage.getItem(key));
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
        <img src="${movieDetails.imageUrl}" alt="${movieDetails.title} image">
        <h4>${movieDetails.title}</h4>
        <p>${movieDetails.price}</p>
        <button class="remove-btn">Remove</button>
      `;
        cartItem.setAttribute('data-movie-id', key.split('-')[1]);
        cartItemsContainer.appendChild(cartItem);

        const removeBtn = cartItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            cartItem.remove();
            sessionStorage.removeItem(key);
            showCartItems();
        });
    });
}

if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
        addToCart();
        cartContainer.classList.remove("hidden");
        exitContainer.classList.remove("hidden");
    });

    exitContainer.addEventListener("click", () => {
        cartContainer.classList.add("hidden");
    });
}

function addToCart() {
    if (!cartContainer) {
        return;
    }

    if (addToCartBtn) {
        const movieItem = document.getElementById('4');

        // store the selected movie details in sessionStorage
        sessionStorage.setItem(`movie-${movieItem.getAttribute('id')}`, JSON.stringify({
            title: movieItem.querySelector('h3').textContent,
            price: movieItem.querySelector('.price').textContent,
            imageUrl: movieItem.querySelector('img').getAttribute('src'),
        }));

        // create a new cart item element
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${movieItem.querySelector('img').getAttribute('src')}" alt="${movieItem.querySelector('h3').textContent} image">
          <h4>${movieItem.querySelector('h3').textContent}</h4>
          <p>${movieItem.querySelector('.price').textContent}</p>
          <button class="remove-btn">Remove</button>
        `;

        // add the cart item to the cart container's items container
        const movieId = movieItem.getAttribute('id');
        cartItem.setAttribute('data-movie-id', movieId);
        const cartItemsContainer = cartContainer.querySelector('.items-container');
        const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
        const alreadyInCart = Array.from(cartItems).some(item => item.textContent === cartItem.textContent);

        if (!alreadyInCart) {
            cartItemsContainer.appendChild(cartItem);
        }

        // add event listener to the remove button
        const removeBtn = cartItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            const cartItem = removeBtn.parentElement;
            cartItem.remove(); // remove the cart item from the cart container
        });

        showCartItems();
    }
}


checkoutBtn.addEventListener('click', () => {
    const cartItems = cartContainer.querySelectorAll('.cart-item');
    const purchasedMovies = JSON.parse(localStorage.getItem('purchasedMovies')) || [];
    let movieAdded = false; // flag to check if any movies were added to cart

    if (cartItems.length > 0) {
        cartItems.forEach(item => {
            const movieId = item.getAttribute('data-movie-id');
            const movieDetails = JSON.parse(sessionStorage.getItem(`movie-${movieId}`));

            // Check if the movie is already purchased
            if (purchasedMovies.some(movie => movie.id === movieDetails.id)) {
                alert('You already have this movie!');
            } else {
                purchasedMovies.push(movieDetails);
                movieAdded = true; // set flag to true if movie was added to cart
            }

            item.remove();
        });

        cartContainer.classList.add('hidden');
        localStorage.setItem('purchasedMovies', JSON.stringify(purchasedMovies));

        // Delay the alert by 100 milliseconds to ensure localStorage is updated
        if (movieAdded) { // check flag before displaying alert
            setTimeout(() => {
                alert('Thank you for your purchase! Your movies have been added to your account.');
            }, 100);
        }
    } else {
        alert('Your cart is empty!');
    }
});

function showPurchasedMovies() {
    const myMoviesContainer = document.querySelector('#myMovies');
    if (myMoviesContainer) {
      const purchasedMovies = JSON.parse(localStorage.getItem('purchasedMovies'));
      if (purchasedMovies && purchasedMovies.length > 0) {
        purchasedMovies.forEach(movie => {
          const purchasedMovie = document.createElement('div');
          purchasedMovie.classList.add('purchased-movie');
          purchasedMovie.innerHTML = `
            <h3 class="purchased-movie-title purchased-element">${movie.title}</h3>
            <div class="purchased-movie-image-wrapper purchased-element">
              <img class="purchased-movie-image" src="${movie.imageUrl}" alt="${movie.title} image">
            </div>
            <p class="purchased-movie-price purchased-element">Price: ${movie.price}$</p>
          `;
          myMoviesContainer.appendChild(purchasedMovie);
        });
      } else {
        const noMoviesMessage = document.createElement('p');
        noMoviesMessage.innerHTML = 'You haven\'t purchased any films yet.';
        myMoviesContainer.appendChild(noMoviesMessage);
      }
    }
  }
showPurchasedMovies();