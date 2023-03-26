const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginBtns = document.getElementById("login-btns-container");
const loggedinBtns = document.getElementById("loggedin-btns-container");
const btnsIsLoggedIn = document.querySelectorAll(".logged-in");
const btnsIsLoggedOut = document.querySelectorAll(".logged-out");
const loginForm = document.getElementById("login-form");
const signUpForm = document.getElementById("signup-form");
const username = document.getElementById("username");
const users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = localStorage.getItem("currentUser");
let user = currentUser ? users[currentUser] : null;
const nameElement = document.getElementById("name");
const ageElement = document.getElementById("age");
const favoriteGenreElement = document.getElementById("favorite-genre");
const purchasedMovies = JSON.parse(localStorage.getItem(`purchasedItems-${currentUser}`)) || [];
const personalia = document.querySelector(".personalia");
const deleteUserBtn = document.querySelector("#deleteUserBtn");

let userIsLoggedIn = false;
if (currentUser) {
    userIsLoggedIn = true;
}

updateUI();

function updateUI() {
    if (userIsLoggedIn) {
        loginBtn?.classList.add("hidden");
        loginBtns?.classList.add("hidden");
        loggedinBtns?.classList.remove("hidden");
        logoutBtn.classList.remove("hidden");
        btnsIsLoggedOut.forEach((btn) => btn.classList.add("hidden"));
        btnsIsLoggedIn.forEach((btn) => btn.classList.remove("hidden"));
    } else {
        loginBtns?.classList.remove("hidden");
        loggedinBtns?.classList.add("hidden");
        logoutBtn?.classList.add("hidden");
        btnsIsLoggedOut.forEach((btn) => btn.classList.remove("hidden"));
        btnsIsLoggedIn.forEach((btn) => btn.classList.add("hidden"));
    }
}


function authenticate(isSignUp) {
    const password = document.getElementById("password").value;
    let confirmPassword = "";

    if (isSignUp) {
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const favoriteGenre = document.getElementById("favorite-genre").value;

        if (user) {
            nameElement.textContent = user.name;
            ageElement.textContent = user.age;
            favoriteGenreElement.textContent = user.favoriteGenre;
        }

        confirmPassword = document.getElementById("confirmPassword").value;
        if (!confirmPassword) {
            alert("Please confirm password.");
            return false;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }

        if (users[username.value]) {
            alert("Username already exists.");
            return false;
        }

        users[username.value] = { password, name, age, favoriteGenre };

        // Initialize purchasedMovies to empty array if it does not exist in localStorage
        if (!localStorage.getItem("purchasedMovies")) {
            localStorage.setItem("purchasedMovies", JSON.stringify([]));
        }

        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "login.html";
        return true;
    }

    if (!username.value || !password) {
        alert("Please enter both username and password.");
        return false;
    }

    user = users[username.value];
    if (user && user.password === password) {
        currentUser = username.value;
        localStorage.setItem("currentUser", currentUser);
        window.location.href = "index.html";
        return true;
    }

    alert("Invalid username or password.");
    return false;
}

if (personalia) {
    nameElement.textContent =  user.name;
    ageElement.textContent =  user.age;
    favoriteGenreElement.textContent = " " + user.favoriteGenre;
}


function handleFormSubmit(event, isSignUp) {
    event.preventDefault();
    authenticate(isSignUp);
}

function handleFormKeypress(event, isSignUp) {
    if (event.key === "Enter") {
        event.preventDefault();
        authenticate(isSignUp);
    }
}

if (loginForm) {
    loginForm.addEventListener("keypress", (event) => handleFormKeypress(event, false));
}

if (signUpForm) {
    signUpForm.addEventListener("keypress", (event) => handleFormKeypress(event, true));
}

function logout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    user = null;
    window.location.href = "index.html";
}

if (deleteUserBtn) {
    deleteUserBtn.addEventListener("click", () => {
        const confirmed = confirm("Are you sure you want to delete your user account? You will loose all your movies.");

        if (confirmed) {
            // Delete user data from local storage
            localStorage.removeItem(`purchasedItems-${currentUser}`);
            localStorage.removeItem(`cartItems-${currentUser}`);
            delete users[currentUser];
            localStorage.setItem(`users`, JSON.stringify(users));
            localStorage.removeItem(`loggedInUser`);

            // Redirect to home page
            window.location.href = "index.html";
        }
    });
}
