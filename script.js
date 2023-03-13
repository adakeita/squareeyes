const API_KEY = '4f8ed672bca5d88dde2fcbb70a60657c';
document.cookie = "cookieName=cookieValue; SameSite=None; Secure";

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
        window.location.href = "login.html";
        return true;
    }

    if (!username || !password) {
        alert("Please enter both username and password.");
        return false;
    }

    if (localStorage.getItem(username) === password) {
        window.location.href = "index.html";
        return true;
    }

    alert("Invalid username or password.");
    return false;
}


window.addEventListener("load", () => {
    const navbar = document.getElementById("navbar");
    const hamburger = navbar.querySelector(".hamburger");
    const menu = navbar.querySelector(".menu");
    const navItem = navbar.querySelectorAll(".item_show");
    const menuIcon = hamburger.querySelector(".menuIcon");
    const closeIcon = hamburger.querySelector(".closeIcon");

    menu.classList.add("closed");
    closeIcon.classList.add("hide");

    function fixNavbar() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const isScrolled = scrollTop > 0;
        navbar.classList.toggle("scrolled", isScrolled);
        menuIcon.classList.toggle("scrolled", isScrolled);
        hamburger.classList.toggle("hide", !isScrolled);
        menu.classList.toggle("hide", isScrolled);
    }

    window.addEventListener("scroll", fixNavbar);
    fixNavbar();

    hamburger.addEventListener("click", () => {
        if (menu.classList.contains("closed")) {
            menu.classList.remove("closed");
            menu.classList.add("open");
            menuIcon.classList.add("hide");
            closeIcon.classList.remove("hide");
        } else {
            menu.classList.remove("open");
            menu.classList.add("closed");
            closeIcon.classList.add("hide");
            menuIcon.classList.remove("hide");
        }
        navItem.forEach(item => {
            item.classList.toggle("show");
        });
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






