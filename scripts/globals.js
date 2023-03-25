// DOM elements
export const username = document.getElementById("username");
export const cartContainer = document.querySelector(".cart-container");
export const loginBtn = document.getElementById("login-btn");
export const logoutBtn = document.getElementById("logout-btn");
export const loginBtns = document.getElementById("login-btns-container");
export const loggedinBtns = document.getElementById("loggedin-btns-container");
export const btnsIsLoggedIn = document.querySelectorAll(".logged-in");
export const btnsIsLoggedOut = document.querySelectorAll(".logged-out");

// API data
export const apiKey = "4f8ed672bca5d88dde2fcbb70a60657c";
export const baseUrl = "https://api.themoviedb.org/3";
export const movieIds = [
  481084,
  646385,
  384018,
  463843,
  301528,
  414906,
  466272,
  373571,
];
export const moviePrices = {
  481084: 12.47,
  646385: 9.99,
  384018: 17.76,
  463843: 11.31,
  301528: 14.88,
  414906: 16.99,
  466272: 10.99,
  373571: 15.5,
};

// User data
export const users = JSON.parse(localStorage.getItem("users")) || {};
export const currentUser = localStorage.getItem("currentUser");
export let user = currentUser ? users[currentUser] : null;

// Cart data
export const cartKey = "cartItems";
export let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
export const purchasedItems =
  JSON.parse(localStorage.getItem(`purchasedItems-${currentUser}`)) || [];
export const purchasedMovies = purchasedItems;

// Movie elements



// My Movies container
