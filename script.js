window.addEventListener("load", () => {
    const navbar = document.getElementById("navbar");
    const hamburger = navbar.querySelector(".hamburger");
    const menu = navbar.querySelector(".menu");
    const navItem = navbar.querySelectorAll(".item_show");
    const menuIcon = hamburger.querySelector(".menuIcon");
    const closeIcon = hamburger.querySelector(".closeIcon");

    menu.classList.add("closed");
    closeIcon.classList.add("hide");

    window.addEventListener("scroll", () => {
        const logo = navbar.querySelector(".logoimage");
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const isScrolled = scrollTop > 60;
        navbar.classList.toggle("scrolled", isScrolled);
        logo.classList.toggle("small", isScrolled);
        hamburger.classList.toggle("hide", !isScrolled);
        menu.classList.toggle("hide", isScrolled);
    });

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






