const addToCartBtn = document.querySelector('.cart-btn');
const checkoutBtn = document.querySelector('.checkout-btn');
const cartContainer = document.querySelector('.cart-container');
const exitContainer = document.querySelector('.exit-container');
const itemsContainer = document.querySelector('.items-container');

if (document.querySelector('.cart-container')) {
    const cartContainer = document.querySelector('.cart-container');
    addToCartBtn.addEventListener('click', () => {
        cartContainer.classList.remove('hidden');
        exitContainer.classList.remove('hidden');
        addToCart();
    });
  
    exitContainer.addEventListener('click', () => {
        cartContainer.classList.add('hidden');
    });
  }

function addToCart() {
    if (!cartContainer) {
        return;
    }
    const movieItem = document.getElementById('4');

    // store the selected movie details in sessionStorage
    sessionStorage.setItem('selectedMovie', JSON.stringify({
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
        cartItem.remove(); // remove the cart item from the cart container
    });
}

checkoutBtn.addEventListener('click', () => {
    const cartItems = cartContainer.querySelectorAll('.cart-item');
    if (cartItems.length > 0) {
        alert('Thank you for your purchase!');
        cartItems.forEach(item => item.remove());
        cartContainer.classList.add('hidden');
    } else {
        alert('Your cart is empty!');
    }
});

