const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginBtns = document.getElementById("login-btns-container");
const loggedinBtns = document.getElementById("loggedin-btns-container");
const btnsIsLoggedIn = document.querySelectorAll(".logged-in");
const btnsIsLoggedOut = document.querySelectorAll(".logged-out");

let userIsLoggedIn = false;
if (localStorage.getItem("currentUser")) {
    userIsLoggedIn = true;
}

if (userIsLoggedIn) {
    loginBtn?.classList.add("hidden");
    loginBtns?.classList.add("hidden");
    loggedinBtns?.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    btnsIsLoggedOut.forEach(btn => btn.classList.add("hidden"));
    btnsIsLoggedIn.forEach(btn => btn.classList.remove("hidden"));
} else {
    loginBtns?.classList.remove("hidden");
    loggedinBtns?.classList.add("hidden");
    logoutBtn?.classList.add("hidden");
    btnsIsLoggedOut.forEach(btn => btn.classList.remove("hidden"));
    btnsIsLoggedIn.forEach(btn => btn.classList.add("hidden"));
}


function authenticate(isSignUp) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let confirmPassword = "";

    if (isSignUp) {
        confirmPassword = document.getElementById("confirmPassword").value;
        if (!confirmPassword) {
            alert("Please confirm password.");
            return false;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }

        if (localStorage.getItem(username)) {
            alert("Username already exists.");
            return false;
        }

        // Initialize purchasedMovies to empty array if it does not exist in localStorage
        if (!localStorage.getItem('purchasedMovies')) {
            localStorage.setItem('purchasedMovies', JSON.stringify([]));
        }
        localStorage.removeItem('currentUser'); // remove currentUser if signing up

        localStorage.setItem(username, password);
        alert("Account created successfully!");
        window.location.href = "login.html";
        return true;
    }

    if (!username || !password) {
        alert("Please enter both username and password.");
        return false;
    }

    if (localStorage.getItem(username) === password) {
        alert("Login successful!");
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html";
        return true;
    }

    alert("Invalid username or password.");
    return false;
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
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



