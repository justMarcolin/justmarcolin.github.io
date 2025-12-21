// Prendiamo tutte le immagini cliccabili
const images = document.querySelectorAll(".open-image");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

images.forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src; // copia l'immagine cliccata
        lightbox.style.display = "flex"; // mostra il lightbox
    });
});

// Chiude il lightbox cliccando sullo sfondo
lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});
