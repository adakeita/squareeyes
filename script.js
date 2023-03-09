//NAVBAR
window.addEventListener("load", () => {
    const navbar = document.getElementById("navbar");
    const hamburger = navbar.querySelector(".hamburger");
    const menu = navbar.querySelector(".menu");
  
    hamburger.addEventListener("click", () => {
      navbar.classList.toggle("showMenu");
    });
  
    menu.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        navbar.classList.remove("showMenu");
      }
    });
  
    window.addEventListener("scroll", () => {
      const logo = navbar.querySelector(".logoimage");
      if (document.documentElement.scrollTop > 65 || document.body.scrollTop > 65) {
        navbar.classList.add("scrolled");
        logo.classList.add("small");
        hamburger.classList.remove("hide");
        menu.classList.add("hide");
      } else {
        navbar.classList.remove("scrolled");
        logo.classList.remove("small");
        hamburger.classList.add("hide");
        menu.classList.remove("hide");
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






