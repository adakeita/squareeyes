const viewCartBtn = document.querySelector(".cart-image-wrapper");
const checkoutBtn = document.querySelector("#checkout-btn");
const cartContainer = document.querySelector(".cart-container");
const exitContainer = document.querySelector(".exit-container");
const itemsContainer = document.querySelector(".items-container");
const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");

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

    const cartItemsContainer = cartContainer.querySelector(".items-container");
    cartItemsContainer.innerHTML = "";

    const movieKeys = Object.keys(localStorage).filter(key => key.startsWith("movie-"));

    if (movieKeys.length === 0) {
        const noItemsMsg = document.createElement("p");
        noItemsMsg.classList.add("no-items-msg");
        noItemsMsg.textContent = "No movies in cart";
        cartItemsContainer.appendChild(noItemsMsg);
        return;
    }

    movieKeys.forEach(key => {
        const movieDetails = JSON.parse(localStorage.getItem(key));
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
        <img src="${movieDetails.imageUrl}" alt="${movieDetails.title} image">
        <h4>${movieDetails.title}</h4>
        <p>${movieDetails.price}</p>
        <button class="remove-btn">Remove</button>
      `;
        cartItem.setAttribute("data-movie-id", key.split("-")[1]);
        cartItemsContainer.appendChild(cartItem);

        const removeBtn = cartItem.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            cartItem.remove();
            localStorage.removeItem(key);
            showCartItems();
        });
    });
}

addToCartBtn.forEach(addToCartBtn => {
    addToCartBtn.addEventListener("click", () => {
        addToCart(addToCartBtn);
        cartContainer.classList.remove("hidden");
        exitContainer.classList.remove("hidden");
    });
});

function addToCart(movieId, movieTitle, moviePrice, movieImage) {
    if (!cartContainer) {
        return;
    }

    // create a new cart item element
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${movieImage}" alt="${movieTitle} image">
      <h4>${movieTitle}</h4>
      <p>${moviePrice}</p>
      <button class="remove-btn">Remove</button>
    `;

    // add the cart item to the cart container's items container
    cartItem.setAttribute("data-movie-id", movieId);
    const cartItemsContainer = cartContainer.querySelector(".items-container");
    const cartItems = cartItemsContainer.querySelectorAll(".cart-item");
    const alreadyInCart = Array.from(cartItems).some(item => item.getAttribute("data-movie-id") === movieId);

    if (!alreadyInCart) {
        cartItemsContainer.appendChild(cartItem);
    }

    // add event listener to the remove button
    const removeBtn = cartItem.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
        const cartItem = removeBtn.parentElement;
        cartItem.remove();
    });
}

