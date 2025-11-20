const navContainer = document.querySelector(".nav-container");
const arrowBtn = document.querySelector(".arrow-btn");

arrowBtn.addEventListener("click", (e) => {
    e.preventDefault()
    navContainer.classList.toggle("active");
});
