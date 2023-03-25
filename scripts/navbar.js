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

    if (window.innerWidth < 600) {
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