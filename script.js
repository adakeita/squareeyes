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






