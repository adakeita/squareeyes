const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginBtns = document.getElementById("login-btns-container");
const loggedinBtns = document.getElementById("loggedin-btns-container");

let userIsLoggedIn = false;
if (localStorage.getItem("currentUser")) {
    userIsLoggedIn = true;
}

if (loginBtns && loggedinBtns) {
    if (userIsLoggedIn) {
        loginBtn.classList.add("hidden")
        loginBtns.classList.add("hidden");
        loggedinBtns.classList.remove("hidden");
        logoutBtn.classList.remove("hidden");
        loggedinBtns.classList.add("visible");
        logoutBtn.classList.add("visible");

    } else {
        loginBtns.classList.remove("hidden");
        loginBtns.classList.add("visible");
        loggedinBtns.classList.add("hidden");
        logoutBtn.classList.add("hidden");

    }
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

window.addEventListener("load", () => {
    const navbar = document.getElementById("navbar");
    const burgerContainer = document.querySelector(".button-container")
    const hamburger = navbar.querySelector(".hamburger");
    const menu = navbar.querySelector(".menu");
    const navItem = navbar.querySelectorAll(".nav-item");
    const menuIcon = hamburger.querySelector(".menuIcon");
    const closeIcon = hamburger.querySelector(".closeIcon");

    hamburger.classList.add("closed");
    burgerContainer.classList.add("hide");
    closeIcon.classList.add("hide");
    menuIcon.classList.add("hide");

    function fixNavbar() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const isScrolled = scrollTop > 0;
        navbar.classList.toggle("scrolled", isScrolled);
        menuIcon.classList.toggle("scrolled", isScrolled);

        if (window.innerWidth < 550) {
            burgerContainer.classList.remove("hide");
            navbar.classList.toggle("scrolled", isScrolled);
            menuIcon.classList.toggle("scrolled", isScrolled);
            hamburger.classList.toggle("hide", !isScrolled);
            menu.classList.toggle("hide", isScrolled);
            menuIcon.classList.remove("hide");
            menu.classList.add("closed");
            navItem.forEach(item => {
                item.classList.add("show");
            });
            hamburger.classList.remove("hide");
            hamburger.classList.toggle("fixed", isScrolled);
        } else {
            navItem.forEach(item => {
                item.classList.remove("show");
            });
            hamburger.classList.add("hide");


        }
    }

    window.addEventListener("scroll", fixNavbar);
    window.addEventListener("resize", fixNavbar);
    fixNavbar();

    hamburger.addEventListener("click", () => {
        menu.classList.remove("hide");
        hamburger.classList.add("closed");
        hamburger.classList.toggle("open");

        if (menu.classList.contains("closed")) {
            menu.classList.remove("closed");
            menu.classList.add("open");
            menuIcon.classList.add("hide");
            closeIcon.classList.remove("hide");
            navItem.forEach(item => {
                item.classList.add("show");
            });
            document.body.classList.add("overflow-hidden");
        } else {
            menu.classList.remove("open");
            menu.classList.add("closed");
            closeIcon.classList.add("hide");
            menuIcon.classList.remove("hide");
            navItem.forEach(item => {
                item.classList.remove("show");
            });
            document.body.classList.remove("overflow-hidden");
        }
    });
});


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






