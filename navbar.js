const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        // se scrolliamo verso il basso
        navbar.classList.add("show");
    } else {
        // se torniamo in alto
         navbar.classList.remove("show");
    }
});