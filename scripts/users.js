import {
    loginBtn,
    loginBtns,
    loggedinBtns,
    logoutBtn,
    btnsIsLoggedOut,
    btnsIsLoggedIn,
    users,
    currentUser,
    user,
    username,
  } from './globals.js';

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

        alert("Account created successfully!");
        window.location.href = "login.html";
        return true;
    }

    if (!username.value || !password) {
        alert("Please enter both username and password.");
        return false;
    }

    user = users[username.value];
    if (user && user.password === password) {
        alert("Login successful!");
        currentUser = username.value;
        localStorage.setItem("currentUser", currentUser);
        window.location.href = "index.html";
        return true;
    }

    alert("Invalid username or password.");
    return false;
}


function handleFormSubmit(event, isSignUp) {
    event.preventDefault();
    authenticate(isSignUp);
}

function logout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    user = null;
    window.location.href = "login.html";
}

const nameElement = document.getElementById("name");
const ageElement = document.getElementById("age");
const favoriteGenreElement = document.getElementById("favorite-genre");

if (nameElement) {
    if (user) {
        nameElement.textContent = user.name;
        ageElement.textContent = user.age;
        favoriteGenreElement.textContent = user.favoriteGenre;
    }
}